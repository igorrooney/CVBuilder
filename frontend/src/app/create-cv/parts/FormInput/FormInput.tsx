import { TextField } from '@mui/material';
import { Control, Controller, FieldPath } from 'react-hook-form';
import type { FormData } from '../schema/schema';

interface FormInputProps {
	name: FieldPath<FormData>;
	control: Control<FormData>;
	label: string;
	type?: string;
	fullWidth?: boolean;
	margin?: 'dense' | 'normal' | 'none';
	error?: boolean;
	helperText?: string;
	disabled?: boolean;
	multiline?: boolean;
	rows?: number;
	[x: string]: any;
}

const FormInput: React.FC<FormInputProps> = ({
	name,
	control,
	label,
	type = 'text',
	fullWidth = true,
	margin = 'normal',
	error,
	helperText,
	disabled,
	multiline,
	rows,
	...rest
}) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<TextField
					{...field}
					label={label}
					type={type}
					fullWidth={fullWidth}
					margin={margin}
					error={error}
					helperText={helperText}
					disabled={disabled}
					multiline={multiline}
					rows={rows}
					variant="outlined"
					sx={{
						'& .MuiOutlinedInput-root': {
							'& fieldset': {
								borderColor: 'rgba(0, 0, 0, 0.12)',
							},
							'&:hover fieldset': {
								borderColor: 'primary.main',
							},
							'&.Mui-focused fieldset': {
								borderColor: 'primary.main',
								borderWidth: '2px',
							},
						},
						'& .MuiInputLabel-root': {
							'color': 'text.secondary',
							'&.Mui-focused': {
								color: 'primary.main',
							},
						},
						'& .MuiInputBase-input': {
							'color': 'text.primary',
							'&::placeholder': {
								color: 'text.secondary',
								opacity: 0.5,
							},
						},
						'& .MuiFormHelperText-root': {
							color: error ? 'error.main' : 'text.secondary',
						},
						'mb': 2,
					}}
					inputProps={{
						'aria-label': label,
						...rest.inputProps,
					}}
					{...rest}
				/>
			)}
		/>
	);
};

export default FormInput;
