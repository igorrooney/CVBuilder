import { Control } from 'react-hook-form';
import { FormData } from '../schema/schema';
import { memo } from 'react';
import { Box, IconButton } from '@mui/material';
import FormInput from '../FormInput';
import { DeleteIcon } from 'lucide-react';

interface EducationItemProps {
	control: Control<FormData>;
	index: number;
	errors: any;
	remove: (index: number) => void;
}

const EducationItem: React.FC<EducationItemProps> = memo(({ control, index, errors, remove }) => {
	return (
		<Box
			component="section"
			sx={{
				border: '1px solid #ccc',
				p: 2,
				mb: 2,
				borderRadius: 1,
				position: 'relative',
			}}
			aria-labelledby={`education-heading-${index}`}
		>
			<FormInput
				name={`education.${index}.institution`}
				control={control}
				label="Institution"
				error={!!errors.education?.[index]?.institution}
				helperText={errors.education?.[index]?.institution?.message}
			/>
			<FormInput
				name={`education.${index}.degree`}
				control={control}
				label="Degree"
				error={!!errors.education?.[index]?.degree}
				helperText={errors.education?.[index]?.degree?.message}
			/>
			<FormInput
				name={`education.${index}.graduationYear`}
				control={control}
				label="Graduation Year"
				error={!!errors.education?.[index]?.graduationYear}
				helperText={errors.education?.[index]?.graduationYear?.message}
			/>
			{index > 0 && (
				<IconButton
					onClick={() => remove(index)}
					aria-label="Delete education"
					sx={{ position: 'absolute', top: 8, right: 8 }}
					color="error"
				>
					<DeleteIcon />
				</IconButton>
			)}
		</Box>
	);
});
EducationItem.displayName = 'EducationItem';

export default EducationItem;
