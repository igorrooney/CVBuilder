'use client';

import Notification from '@/components/UI/Notification/Notification';
import { useCreateCV } from '@/hooks/useCreateCV';
import { CVData, transformCVToFormData } from '@/hooks/useCV';
import { useUpdateCV } from '@/hooks/useUpdateCV';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Alert,
	Autocomplete,
	Box,
	Button,
	Chip,
	CircularProgress,
	Container,
	Fade,
	LinearProgress,
	Paper,
	Step,
	StepLabel,
	Stepper,
	TextField,
	Typography,
} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import CertificationItem from './parts/CertificationItem';
import EducationItem from './parts/EducationItem';
import FormInput from './parts/FormInput';
import { FormData, schema } from './parts/schema/schema';
import { stepFieldGroups, steps } from './parts/steps/steps';
import WorkExperienceItem from './parts/WorkExperienceItem/WorkExperienceItem';

interface CVCreationFormProps {
	onStepChange?: (step: number) => void;
	mode?: 'create' | 'edit';
	initialData?: CVData;
	cvId?: string;
}

const CVCreationForm = ({
	onStepChange,
	mode = 'create',
	initialData,
	cvId,
}: CVCreationFormProps) => {
	const [activeStep, setActiveStep] = useState(0);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const {
		createCV,
		isError: isCreateError,
		error: createError,
		showSuccess: showCreateSuccess,
		setShowSuccess: setShowCreateSuccess,
		isPending: isCreatePending,
	} = useCreateCV();
	const {
		updateCV,
		isError: isUpdateError,
		error: updateError,
		showSuccess: showUpdateSuccess,
		setShowSuccess: setShowUpdateSuccess,
		isPending: isUpdatePending,
	} = useUpdateCV(cvId || '');

	const router = useRouter();

	const [isStepChanging, setIsStepChanging] = useState(false);

	// Add effect to track showSuccess changes
	useEffect(() => {
		if ((isCreateError && createError) || (isUpdateError && updateError)) {
			const error = createError || updateError;
			setErrorMessage(
				error instanceof Error ? error.message : 'An error occurred while saving your CV',
			);
		}
	}, [isCreateError, createError, isUpdateError, updateError]);

	const {
		control,
		handleSubmit,
		trigger,
		watch,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: initialData
			? transformCVToFormData(initialData)
			: {
					title: '',
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
					certifications: [
						{
							name: '',
							issuingOrganization: '',
							issueDate: '',
							expiryDate: '',
							credentialId: '',
							credentialUrl: '',
						},
					],
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

	const {
		fields: certFields,
		append: appendCert,
		remove: removeCert,
	} = useFieldArray({
		control,
		name: 'certifications',
	});

	// Validate current step fields before proceeding
	const handleNext = async () => {
		setIsStepChanging(true);
		const isValid = await trigger(stepFieldGroups[activeStep]);
		if (!isValid) {
			setIsStepChanging(false);
			return;
		}
		const newStep = activeStep + 1;
		setActiveStep(newStep);
		onStepChange?.(newStep);
		setTimeout(() => setIsStepChanging(false), 100);
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
		try {
			setIsStepChanging(true);
			setErrorMessage(null);

			if (mode === 'edit' && cvId) {
				await updateCV(data);
			} else {
				await createCV(data);
			}
			router.push('/cvs');
		} catch (error) {
			setErrorMessage(
				error instanceof Error ? error.message : 'An error occurred while saving your CV',
			);
		} finally {
			setIsStepChanging(false);
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
									name="title"
									control={control}
									label="CV Title"
									error={!!errors.title}
									helperText={
										errors.title?.message ||
										"Give your CV a descriptive title (e.g., 'Software Engineer 2024', 'Marketing Specialist')"
									}
									autoFocus
								/>
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
						<Box component="section" aria-labelledby="certifications-heading">
							<Typography variant="h6" id="certifications-heading" gutterBottom>
								Certifications
							</Typography>
							<Paper elevation={0} sx={{ p: 3, bgcolor: 'background.paper' }}>
								{certFields.map((item, index) => (
									<CertificationItem
										key={item.id}
										control={control}
										index={index}
										errors={errors}
										remove={removeCert}
									/>
								))}
								<Button
									variant="contained"
									onClick={() =>
										appendCert({
											name: '',
											issuingOrganization: '',
											issueDate: '',
											expiryDate: '',
											credentialId: '',
											credentialUrl: '',
										})
									}
									sx={{ mt: 2 }}
								>
									Add Certification
								</Button>
							</Paper>
						</Box>
					</motion.div>
				);
			case 5:
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
												value.map((option, index) => {
													const { key, ...tagProps } = getTagProps({ index });
													return <Chip variant="outlined" label={option} key={key} {...tagProps} />;
												})
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
				<title>{mode === 'edit' ? 'Edit Your CV' : 'Create Your CV'} - CV Builder</title>
				<meta
					name="description"
					content={`${mode === 'edit' ? 'Edit' : 'Build'} your professional CV using our easy-to-use multi-step form. Create, edit, and download your CV in PDF format.`}
				/>
				<link
					rel="canonical"
					href={`https://www.example.com/${mode === 'edit' ? 'edit-cv' : 'create-cv'}`}
				/>
				{/* Example JSON-LD Structured Data (for further SEO enhancements) */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'WebPage',
							'name': `${mode === 'edit' ? 'Edit' : 'Create'} Your CV - CV Builder`,
							'description': `${mode === 'edit' ? 'Edit' : 'Build'} your professional CV using our multi-step form.`,
							'url': `https://www.example.com/${mode === 'edit' ? 'edit-cv' : 'create-cv'}`,
						}),
					}}
				/>
			</Head>
			<main role="main" aria-label="CV Creation Form">
				<Container
					maxWidth="md"
					sx={{
						py: 4,
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<Paper
						elevation={2}
						sx={{
							p: 4,
							borderRadius: 2,
							background: 'white',
							boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
							flex: 1,
							display: 'flex',
							flexDirection: 'column',
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
								<form
									onSubmit={(e) => {
										if (isStepChanging) {
											e.preventDefault();
											return;
										}
										handleSubmit(onSubmitForm)(e);
									}}
									onKeyDown={(e) => {
										if (e.key === 'Enter') {
											e.preventDefault();
										}
									}}
								>
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
										{activeStep < steps.length - 1 ? (
											<Button
												type="button"
												variant="contained"
												disabled={isCreatePending || isUpdatePending}
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
										) : (
											<Button
												type="submit"
												variant="contained"
												disabled={isCreatePending || isUpdatePending}
												sx={{
													'minWidth': 100,
													'background': 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
													'&:hover': {
														background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
													},
												}}
											>
												{isCreatePending || isUpdatePending ? (
													<CircularProgress size={24} />
												) : (
													'Submit'
												)}
											</Button>
										)}
									</Box>
								</form>
							</AnimatePresence>
						</Box>

						<Fade in={!!errorMessage}>
							<Alert
								severity="error"
								sx={{
									'mt': 2,
									'& .MuiAlert-icon': {
										color: 'error.main',
									},
								}}
							>
								{errorMessage || 'An error occurred while saving your CV'}
							</Alert>
						</Fade>
					</Paper>
				</Container>
			</main>

			{(showCreateSuccess || showUpdateSuccess) && !errorMessage && (
				<Notification
					open={true}
					onClose={() => {
						if (showCreateSuccess) setShowCreateSuccess(false);
						if (showUpdateSuccess) setShowUpdateSuccess(false);
						router.push('/cvs');
					}}
					message={`CV ${mode === 'edit' ? 'updated' : 'created'} successfully!`}
					severity="success"
					autoHideDuration={undefined}
				/>
			)}
			{!!errorMessage && (
				<Notification
					open={true}
					onClose={() => setErrorMessage(null)}
					message={errorMessage}
					severity="error"
					autoHideDuration={6000}
				/>
			)}
		</>
	);
};

export default CVCreationForm;
