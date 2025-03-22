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
					inputProps={{ 'aria-label': label, ...rest.inputProps }}
					{...rest}
				/>
			)}
		/>
	);
};

export default FormInput;
