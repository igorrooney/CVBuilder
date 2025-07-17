import { Control } from 'react-hook-form';
import { FormData } from '../schema/schema';
import { memo, useState } from 'react';
import {
	Box,
	Paper,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	alpha,
} from '@mui/material';
import FormInput from '../FormInput';
import { Trash2 } from 'lucide-react';

interface CertificationItemProps {
	control: Control<FormData>;
	index: number;
	errors: any;
	remove: (index: number) => void;
}

const CertificationItem: React.FC<CertificationItemProps> = memo(
	({ control, index, errors, remove }) => {
		const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

		const handleDelete = () => {
			setIsDeleteDialogOpen(true);
		};

		const handleConfirmDelete = () => {
			remove(index);
			setIsDeleteDialogOpen(false);
		};

		const handleCancelDelete = () => {
			setIsDeleteDialogOpen(false);
		};

		return (
			<>
				<Paper
					elevation={0}
					sx={{
						'p': 3,
						'mb': 3,
						'borderRadius': 2,
						'border': '1px solid',
						'borderColor': 'divider',
						'position': 'relative',
						'transition': 'all 0.2s ease-in-out',
						'&:hover': {
							'boxShadow': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
							'& .delete-button': {
								opacity: 1,
								transform: 'translateX(0)',
							},
						},
					}}
				>
					<div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-2">
						<h3 className="text-sm font-medium text-gray-700">
							{index === 0 ? 'Most Recent Certification' : `Previous Certification ${index}`}
						</h3>
						<Button
							startIcon={<Trash2 className="h-4 w-4" />}
							onClick={handleDelete}
							color="error"
							variant="text"
							size="small"
							className="delete-button"
							sx={{
								'opacity': 0.85,
								'transform': 'translateX(10px)',
								'transition': 'all 0.2s ease-in-out',
								'&:hover': {
									backgroundColor: (theme) => alpha(theme.palette.error.main, 0.08),
									transform: 'translateX(0)',
								},
							}}
						>
							Remove
						</Button>
					</div>

					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
							gap: 2,
						}}
					>
						<FormInput
							name={`certifications.${index}.name`}
							control={control}
							label="Certification Name"
							error={!!errors.certifications?.[index]?.name}
							helperText={errors.certifications?.[index]?.name?.message}
						/>
						<FormInput
							name={`certifications.${index}.issuingOrganization`}
							control={control}
							label="Issuing Organization"
							error={!!errors.certifications?.[index]?.issuingOrganization}
							helperText={errors.certifications?.[index]?.issuingOrganization?.message}
						/>
					</Box>

					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
							gap: 2,
							mt: 2,
						}}
					>
						<FormInput
							name={`certifications.${index}.issueDate`}
							control={control}
							label="Issue Date"
							type="date"
							error={!!errors.certifications?.[index]?.issueDate}
							helperText={errors.certifications?.[index]?.issueDate?.message}
							InputLabelProps={{ shrink: true }}
							inputProps={{
								max: new Date().toISOString().split('T')[0],
							}}
							sx={{
								'& input[type="date"]::-webkit-calendar-picker-indicator': {
									cursor: 'pointer',
								},
								'& input[type="date"]': {
									'&::-webkit-datetime-edit-fields-wrapper': {
										padding: '8px 0',
									},
								},
							}}
						/>
						<FormInput
							name={`certifications.${index}.expiryDate`}
							control={control}
							label="Expiry Date"
							type="date"
							error={!!errors.certifications?.[index]?.expiryDate}
							helperText={errors.certifications?.[index]?.expiryDate?.message}
							InputLabelProps={{ shrink: true }}
							inputProps={{
								min: new Date().toISOString().split('T')[0],
							}}
							sx={{
								'& input[type="date"]::-webkit-calendar-picker-indicator': {
									cursor: 'pointer',
								},
								'& input[type="date"]': {
									'&::-webkit-datetime-edit-fields-wrapper': {
										padding: '8px 0',
									},
								},
							}}
						/>
					</Box>

					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
							gap: 2,
							mt: 2,
						}}
					>
						<FormInput
							name={`certifications.${index}.credentialId`}
							control={control}
							label="Credential ID"
							error={!!errors.certifications?.[index]?.credentialId}
							helperText={errors.certifications?.[index]?.credentialId?.message}
						/>
						<FormInput
							name={`certifications.${index}.credentialUrl`}
							control={control}
							label="Credential URL"
							type="url"
							error={!!errors.certifications?.[index]?.credentialUrl}
							helperText={errors.certifications?.[index]?.credentialUrl?.message}
						/>
					</Box>
				</Paper>

				<Dialog
					open={isDeleteDialogOpen}
					onClose={handleCancelDelete}
					aria-labelledby="delete-certification-dialog-title"
				>
					<DialogTitle id="delete-certification-dialog-title">Remove Certification</DialogTitle>
					<DialogContent>
						Are you sure you want to remove this certification? This action cannot be undone.
					</DialogContent>
					<DialogActions>
						<Button onClick={handleCancelDelete} color="inherit">
							Cancel
						</Button>
						<Button onClick={handleConfirmDelete} color="error" variant="contained">
							Remove
						</Button>
					</DialogActions>
				</Dialog>
			</>
		);
	},
);

CertificationItem.displayName = 'CertificationItem';

export default CertificationItem;
