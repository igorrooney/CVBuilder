'use client';

import { Box, Paper, LinearProgress } from '@mui/material';
import { useState } from 'react';
import { PersonalInfoStep } from './PersonalInfoStep';
import { ExperienceStep } from './ExperienceStep';
import { EducationStep } from './EducationStep';
import { SkillsStep } from './SkillsStep';
import { SummaryStep } from './SummaryStep';

const steps = [
	{ number: 1, label: 'Personal Details' },
	{ number: 2, label: 'Professional Summary' },
	{ number: 3, label: 'Work Experience' },
	{ number: 4, label: 'Education' },
	{ number: 5, label: 'Skills & Hobbies' },
];

interface CreateCVFormProps {
	onSubmit: (data: any) => void;
	isSubmitting: boolean;
}

export function CreateCVForm({ onSubmit, isSubmitting }: CreateCVFormProps) {
	const [activeStep, setActiveStep] = useState(0);
	const [formData, setFormData] = useState({
		personalInfo: {},
		experience: [],
		education: [],
		skills: [],
		summary: '',
	});

	const handleNext = (stepData: any) => {
		setFormData((prev) => ({
			...prev,
			...stepData,
		}));
		setActiveStep((prev) => prev + 1);
	};

	const handleBack = () => {
		setActiveStep((prev) => prev - 1);
	};

	const handleSubmit = (data: any) => {
		const finalData = {
			...formData,
			...data,
		};
		onSubmit(finalData);
	};

	const renderStepContent = (step: number) => {
		switch (step) {
			case 0:
				return <PersonalInfoStep onNext={handleNext} />;
			case 1:
				return <ExperienceStep onNext={handleNext} onBack={handleBack} />;
			case 2:
				return <EducationStep onNext={handleNext} onBack={handleBack} />;
			case 3:
				return <SkillsStep onNext={handleNext} onBack={handleBack} />;
			case 4:
				return <SummaryStep onNext={handleSubmit} onBack={handleBack} />;
			default:
				return null;
		}
	};

	return (
		<Box sx={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
			<h1 className="mb-4 text-center text-4xl font-bold text-[#3B82F6]">
				Create Your Professional CV
			</h1>
			<p className="mx-auto mb-12 max-w-2xl text-center text-gray-600">
				Build a standout CV that highlights your skills and experience. Our step-by-step process
				makes it easy to create a professional document that gets noticed.
			</p>

			<Box sx={{ mb: 8, px: 2 }}>
				<Box
					sx={{
						'display': 'flex',
						'alignItems': 'flex-start',
						'justifyContent': 'space-between',
						'position': 'relative',
						'mb': 4,
						'&::after': {
							content: '""',
							position: 'absolute',
							top: '20px',
							left: '60px',
							right: '60px',
							height: '2px',
							backgroundColor: '#E5E7EB',
							zIndex: 0,
						},
					}}
				>
					{steps.map((step, index) => (
						<Box
							key={step.number}
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								position: 'relative',
								zIndex: 1,
								minWidth: '120px',
							}}
						>
							<Box
								sx={{
									width: '40px',
									height: '40px',
									borderRadius: '50%',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									fontWeight: 600,
									fontSize: '1rem',
									marginBottom: '12px',
									backgroundColor: index <= activeStep ? '#3B82F6' : '#FFFFFF',
									color: index <= activeStep ? '#FFFFFF' : '#6B7280',
									border: '2px solid',
									borderColor: index <= activeStep ? '#3B82F6' : '#E5E7EB',
									transition: 'all 0.2s ease-in-out',
								}}
							>
								{step.number}
							</Box>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									gap: '2px',
								}}
							>
								<Box
									sx={{
										fontSize: '0.875rem',
										color: index === activeStep ? '#3B82F6' : '#6B7280',
										textAlign: 'center',
										fontWeight: index === activeStep ? 500 : 400,
										transition: 'all 0.2s ease-in-out',
										whiteSpace: 'nowrap',
									}}
								>
									{step.label.split(' ')[0]}
								</Box>
								{step.label.split(' ').length > 1 && (
									<Box
										sx={{
											fontSize: '0.875rem',
											color: index === activeStep ? '#3B82F6' : '#6B7280',
											textAlign: 'center',
											fontWeight: index === activeStep ? 500 : 400,
											transition: 'all 0.2s ease-in-out',
											whiteSpace: 'nowrap',
										}}
									>
										{step.label.split(' ').slice(1).join(' ')}
									</Box>
								)}
							</Box>
						</Box>
					))}
				</Box>
				<Box sx={{ px: 4 }}>
					<LinearProgress
						variant="determinate"
						value={(activeStep / (steps.length - 1)) * 100}
						sx={{
							'height': 4,
							'borderRadius': 2,
							'backgroundColor': '#F3F4F6',
							'& .MuiLinearProgress-bar': {
								borderRadius: 2,
								backgroundColor: '#3B82F6',
							},
						}}
					/>
				</Box>
			</Box>

			<Paper sx={{ p: 3 }}>{renderStepContent(activeStep)}</Paper>
		</Box>
	);
}
