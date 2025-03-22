'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
	Box,
	Button,
	Container,
	Step,
	StepButton,
	Stepper,
	TextField,
	Typography,
} from '@mui/material';
import Head from 'next/head';
import { useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import EducationItem from './parts/EducationItem';
import FormInput from './parts/FormInput';
import { FormData, schema } from './parts/schema/schema';
import { stepFieldGroups, steps } from './parts/steps/steps';
import WorkExperienceItem from './parts/WorkExperienceItem/WorkExperienceItem';

export default function CVCreationForm() {
	const [activeStep, setActiveStep] = useState(0);

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
			phone: '',
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
			skills: [''],
			hobbies: '',
		},
		mode: 'onChange',
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
		setActiveStep((prev) => prev + 1);
	};

	// Go back a step
	const handleBack = () => {
		setActiveStep((prev) => prev - 1);
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
	};

	// Final form submission
	const onSubmit = (data: FormData) => {
		console.log('Submitted Data:', data);
		// Further processing such as sending data to backend can be done here.
	};

	// Render content for each step
	const renderStepContent = (step: number) => {
		switch (step) {
			case 0:
				return (
					<Box component="section" aria-labelledby="personal-details-heading">
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
							name="phone"
							control={control}
							label="Phone"
							error={!!errors.phone}
							helperText={errors.phone?.message}
						/>
						<FormInput
							name="address"
							control={control}
							label="Address"
							error={!!errors.address}
							helperText={errors.address?.message}
						/>
					</Box>
				);
			case 1:
				return (
					<Box component="section" aria-labelledby="summary-heading">
						<FormInput
							name="summary"
							control={control}
							label="Professional Summary"
							multiline
							rows={4}
							error={!!errors.summary}
							helperText={errors.summary?.message}
						/>
					</Box>
				);
			case 2:
				return (
					<Box component="section" aria-labelledby="work-experience-heading">
						<Typography variant="h6" id="work-experience-heading" gutterBottom>
							Work Experience
						</Typography>
						{expFields.map((item, index) => (
							<WorkExperienceItem
								key={item.id}
								control={control}
								index={index}
								errors={errors}
								remove={removeExp}
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
						>
							Add Experience
						</Button>
					</Box>
				);
			case 3:
				return (
					<Box component="section" aria-labelledby="education-heading">
						<Typography variant="h6" id="education-heading" gutterBottom>
							Education
						</Typography>
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
						>
							Add Education
						</Button>
					</Box>
				);
			case 4:
				return (
					<Box component="section" aria-labelledby="skills-hobbies-heading">
						<Typography variant="h6" id="skills-hobbies-heading" gutterBottom>
							Skills & Hobbies
						</Typography>
						<Controller
							name="skills"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									label="Skills (comma separated)"
									fullWidth
									margin="normal"
									error={!!errors.skills}
									helperText={errors.skills?.message || 'Enter skills separated by commas'}
									onBlur={(e) => {
										const value = e.target.value
											.split(',')
											.map((item) => item.trim())
											.filter((item) => item);
										field.onChange(value);
									}}
									inputProps={{ 'aria-label': 'Skills' }}
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
					</Box>
				);
			default:
				return <div>Unknown step</div>;
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
				<Container maxWidth="md">
					<Box sx={{ mt: 4 }}>
						<header>
							<Typography variant="h1" component="h1" sx={{ fontSize: '2rem', mb: 2 }}>
								Create Your CV
							</Typography>
						</header>
						<Stepper activeStep={activeStep} alternativeLabel>
							{steps.map((label, index) => (
								<Step key={label}>
									<StepButton onClick={() => handleStepClick(index)}>{label}</StepButton>
								</Step>
							))}
						</Stepper>
						<Box sx={{ mt: 4 }}>
							<form onSubmit={handleSubmit(onSubmit)}>
								{renderStepContent(activeStep)}
								<Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
									{activeStep > 0 && (
										<Button variant="outlined" onClick={handleBack}>
											Back
										</Button>
									)}
									{activeStep < steps.length - 1 ? (
										<Button variant="contained" onClick={handleNext}>
											Next
										</Button>
									) : (
										<Button variant="contained" type="submit">
											Submit
										</Button>
									)}
								</Box>
							</form>
						</Box>
					</Box>
				</Container>
			</main>
		</>
	);
}
