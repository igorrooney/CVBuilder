'use client';

import { useCreateCV } from '@/hooks/useCreateCV';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Box,
	Button,
	Container,
	Typography,
	Alert,
	Paper,
	Fade,
	CircularProgress,
	Stepper,
	Step,
	StepLabel,
	LinearProgress,
	Autocomplete,
	TextField,
	Chip,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import EducationItem from './parts/EducationItem';
import FormInput from './parts/FormInput';
import { FormData, schema } from './parts/schema/schema';
import { stepFieldGroups, steps } from './parts/steps/steps';
import WorkExperienceItem from './parts/WorkExperienceItem/WorkExperienceItem';
import Notification from '@/components/UI/Notification/Notification';
import { useRouter } from 'next/navigation';
import { Controller } from 'react-hook-form';

interface ErrorResponse {
	message: string;
}

interface CVCreationFormProps {
	onStepChange?: (step: number) => void;
}

const CVCreationForm = ({ onStepChange }: CVCreationFormProps) => {
	const [activeStep, setActiveStep] = useState(0);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const { createCV, isError, error, showSuccess, setShowSuccess, isPending } = useCreateCV();

	const router = useRouter();

	// Add effect to track showSuccess changes
	useEffect(() => {
		if (isError && error) {
			setErrorMessage(
				error instanceof Error ? error.message : 'An error occurred while creating your CV',
			);
		}
	}, [isError, error]);

	const {
		control,
		handleSubmit,
		trigger,
		watch,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			phoneNumber: '',
			address: '',
			summary: '',
			experience: [
				{
					jobTitle: '',
					company: '',
					startDate: '',
					endDate: '',
					responsibilities: '',
					achievements: '',
					isCurrent: false,
				},
			],
			education: [{ institution: '', degree: '', graduationYear: '' }],
			skills: [],
			hobbies: '',
		},
		mode: 'onTouched',
	});

	const {
		fields: expFields,
		append: appendExp,
		remove: removeExp,
	} = useFieldArray({
		control,
		name: 'experience',
	});

	const {
		fields: eduFields,
		append: appendEdu,
		remove: removeEdu,
	} = useFieldArray({
		control,
		name: 'education',
	});

	// Validate current step fields before proceeding
	const handleNext = async () => {
		const isValid = await trigger(stepFieldGroups[activeStep]);
		if (!isValid) return;
		const newStep = activeStep + 1;
		setActiveStep(newStep);
		onStepChange?.(newStep);
	};

	// Go back a step
	const handleBack = () => {
		const newStep = activeStep - 1;
		setActiveStep(newStep);
		onStepChange?.(newStep);
	};

	// Validate intermediate steps when jumping forward
	const handleStepClick = async (newStep: number) => {
		if (newStep > activeStep) {
			for (let i = activeStep; i < newStep; i++) {
				const valid = await trigger(stepFieldGroups[i]);
				if (!valid) return;
			}
		}
		setActiveStep(newStep);
		onStepChange?.(newStep);
	};

	// Final form submission
	const onSubmitForm = async (data: FormData) => {
		setErrorMessage(null);
		try {
			await createCV(data);
		} catch (error) {
			setErrorMessage(
				error instanceof Error ? error.message : 'An error occurred while creating your CV',
			);
		}
	};

	// Render content for each step
	const renderStepContent = (step: number) => {
		switch (step) {
			case 0:
				return (
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						transition={{ duration: 0.3 }}
					>
						<Box component="section" aria-labelledby="personal-details-heading">
							<Typography variant="h6" id="personal-details-heading" gutterBottom>
								Personal Details
							</Typography>
							<Paper elevation={0} sx={{ p: 3, bgcolor: 'background.paper' }}>
								<FormInput
									name="firstName"
									control={control}
									label="First Name"
									error={!!errors.firstName}
									helperText={errors.firstName?.message}
								/>
								<FormInput
									name="lastName"
									control={control}
									label="Last Name"
									error={!!errors.lastName}
									helperText={errors.lastName?.message}
								/>
								<FormInput
									name="email"
									control={control}
									label="Email"
									type="email"
									error={!!errors.email}
									helperText={errors.email?.message}
								/>
								<FormInput
									name="phoneNumber"
									control={control}
									label="Phone Number"
									error={!!errors.phoneNumber}
									helperText={errors.phoneNumber?.message}
								/>
								<FormInput
									name="address"
									control={control}
									label="Address"
									error={!!errors.address}
									helperText={errors.address?.message}
								/>
							</Paper>
						</Box>
					</motion.div>
				);
			case 1:
				return (
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						transition={{ duration: 0.3 }}
					>
						<Box component="section" aria-labelledby="summary-heading">
							<Typography variant="h6" id="summary-heading" gutterBottom>
								Professional Summary
							</Typography>
							<Paper elevation={0} sx={{ p: 3, bgcolor: 'background.paper' }}>
								<FormInput
									name="summary"
									control={control}
									label="Professional Summary"
									multiline
									rows={4}
									error={!!errors.summary}
									helperText={errors.summary?.message}
								/>
							</Paper>
						</Box>
					</motion.div>
				);
			case 2:
				return (
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						transition={{ duration: 0.3 }}
					>
						<Box component="section" aria-labelledby="work-experience-heading">
							<Typography variant="h6" id="work-experience-heading" gutterBottom>
								Work Experience
							</Typography>
							<Paper elevation={0} sx={{ p: 3, bgcolor: 'background.paper' }}>
								{expFields.map((item, index) => (
									<WorkExperienceItem
										key={item.id}
										control={control}
										index={index}
										errors={errors}
										remove={(i) => removeExp(i)}
										watch={watch}
									/>
								))}
								<Button
									variant="contained"
									onClick={() =>
										appendExp({
											jobTitle: '',
											company: '',
											startDate: '',
											endDate: '',
											responsibilities: '',
											achievements: '',
											isCurrent: false,
										})
									}
									sx={{ mt: 2 }}
								>
									Add Experience
								</Button>
							</Paper>
						</Box>
					</motion.div>
				);
			case 3:
				return (
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						transition={{ duration: 0.3 }}
					>
						<Box component="section" aria-labelledby="education-heading">
							<Typography variant="h6" id="education-heading" gutterBottom>
								Education
							</Typography>
							<Paper elevation={0} sx={{ p: 3, bgcolor: 'background.paper' }}>
								{eduFields.map((item, index) => (
									<EducationItem
										key={item.id}
										control={control}
										index={index}
										errors={errors}
										remove={removeEdu}
									/>
								))}
								<Button
									variant="contained"
									onClick={() => appendEdu({ institution: '', degree: '', graduationYear: '' })}
									sx={{ mt: 2 }}
								>
									Add Education
								</Button>
							</Paper>
						</Box>
					</motion.div>
				);
			case 4:
				return (
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						transition={{ duration: 0.3 }}
					>
						<Box component="section" aria-labelledby="skills-hobbies-heading">
							<Typography variant="h6" id="skills-hobbies-heading" gutterBottom>
								Skills & Hobbies
							</Typography>
							<Paper elevation={0} sx={{ p: 3, bgcolor: 'background.paper' }}>
								<Controller
									name="skills"
									control={control}
									render={({ field: { onChange, value } }) => (
										<Autocomplete
											multiple
											freeSolo
											options={[]}
											value={value || []}
											onChange={(_, newValue) => onChange(newValue)}
											renderTags={(value, getTagProps) =>
												value.map((option, index) => (
													<Chip variant="outlined" label={option} {...getTagProps({ index })} />
												))
											}
											renderInput={(params) => (
												<TextField
													{...params}
													label="Skills"
													placeholder="Type a skill and press Enter"
													error={!!errors.skills}
													helperText={errors.skills?.message || 'Enter skills one at a time'}
													fullWidth
													sx={{ mb: 2 }}
												/>
											)}
										/>
									)}
								/>
								<FormInput
									name="hobbies"
									control={control}
									label="Hobbies"
									error={!!errors.hobbies}
									helperText={errors.hobbies?.message}
								/>
							</Paper>
						</Box>
					</motion.div>
				);
			default:
				return null;
		}
	};

	return (
		<>
			<Head>
				<title>Create Your CV - CV Builder</title>
				<meta
					name="description"
					content="Build your professional CV using our easy-to-use multi-step form. Create, edit, and download your CV in PDF format."
				/>
				<link rel="canonical" href="https://www.example.com/create-cv" />
				{/* Example JSON-LD Structured Data (for further SEO enhancements) */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'WebPage',
							'name': 'Create Your CV - CV Builder',
							'description': 'Build your professional CV using our multi-step form.',
							'url': 'https://www.example.com/create-cv',
						}),
					}}
				/>
			</Head>
			<main role="main" aria-label="CV Creation Form">
				<Container maxWidth="md" sx={{ py: 4 }}>
					<Paper
						elevation={2}
						sx={{
							p: 4,
							borderRadius: 2,
							background: 'white',
							boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
						}}
					>
						<Box sx={{ width: '100%', mb: 4 }}>
							<Stepper activeStep={activeStep} alternativeLabel>
								{steps.map((label, index) => (
									<Step key={label}>
										<StepLabel
											onClick={() => handleStepClick(index)}
											sx={{
												'cursor': 'pointer',
												'& .MuiStepLabel-label': {
													fontSize: { xs: '0.75rem', sm: '0.875rem' },
												},
											}}
										>
											{label}
										</StepLabel>
									</Step>
								))}
							</Stepper>
							<LinearProgress
								variant="determinate"
								value={((activeStep + 1) / steps.length) * 100}
								sx={{
									'mt': 2,
									'height': 6,
									'borderRadius': 3,
									'backgroundColor': 'grey.100',
									'& .MuiLinearProgress-bar': {
										borderRadius: 3,
										background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
									},
								}}
							/>
						</Box>
						<Box sx={{ mt: 4 }}>
							<AnimatePresence mode="wait">
								<form onSubmit={handleSubmit(onSubmitForm)}>
									<motion.div
										key={activeStep}
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -20 }}
										transition={{ duration: 0.3 }}
									>
										{renderStepContent(activeStep)}
									</motion.div>

									<Box
										sx={{
											display: 'flex',
											justifyContent: 'space-between',
											mt: 4,
											pt: 3,
											borderTop: '1px solid',
											borderColor: 'divider',
										}}
									>
										<Button
											disabled={activeStep === 0}
											onClick={handleBack}
											variant="outlined"
											sx={{
												'minWidth': 100,
												'&:hover': {
													backgroundColor: 'rgba(33, 150, 243, 0.04)',
												},
											}}
										>
											Back
										</Button>
										{activeStep === steps.length - 1 ? (
											<Button
												type="button"
												variant="contained"
												disabled={isPending}
												onClick={async () => {
													const isValid = await trigger(stepFieldGroups[activeStep]);
													if (isValid) {
														handleSubmit(onSubmitForm)();
													}
												}}
												sx={{
													'minWidth': 100,
													'background': 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
													'&:hover': {
														background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
													},
												}}
											>
												{isPending ? <CircularProgress size={24} /> : 'Submit'}
											</Button>
										) : (
											<Button
												variant="contained"
												onClick={handleNext}
												sx={{
													'minWidth': 100,
													'background': 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
													'&:hover': {
														background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
													},
												}}
											>
												Next
											</Button>
										)}
									</Box>
								</form>
							</AnimatePresence>
						</Box>

						<Fade in={isError}>
							<Alert
								severity="error"
								sx={{
									'mt': 2,
									'& .MuiAlert-icon': {
										color: 'error.main',
									},
								}}
							>
								{(error as ErrorResponse)?.message || 'An error occurred while creating your CV'}
							</Alert>
						</Fade>
					</Paper>
				</Container>
			</main>

			<Notification
				open={showSuccess}
				onClose={() => {
					setShowSuccess(false);
					router.push('/my-cvs');
				}}
				message="CV created successfully! Click OK to view your CVs."
				severity="success"
				autoHideDuration={undefined}
			/>

			<Notification
				open={!!errorMessage}
				onClose={() => setErrorMessage(null)}
				message={errorMessage || ''}
				severity="error"
				autoHideDuration={6000}
			/>
		</>
	);
};

export default CVCreationForm;
