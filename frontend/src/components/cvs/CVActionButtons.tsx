'use client';

import {
	Button,
	ButtonGroup,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from '@mui/material';
import { Visibility, Edit, Delete, Download } from '@mui/icons-material';
import { useState } from 'react';
import { CVActions } from '@/types/cv';

interface CVActionButtonsProps extends CVActions {
	cvId: string;
	cvTitle: string;
}

export function CVActionButtons({
	cvId,
	cvTitle,
	onPreview,
	onEdit,
	onDelete,
	onDownload,
}: CVActionButtonsProps) {
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleAction = async (action: () => Promise<void>) => {
		try {
			setIsLoading(true);
			await action();
		} catch (error) {
			console.error('Action failed:', error);
			// TODO: Show error notification
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<ButtonGroup
				variant="outlined"
				aria-label="CV actions"
				className="flex flex-wrap gap-2 sm:flex-nowrap"
			>
				<Button
					startIcon={<Visibility />}
					onClick={() => handleAction(() => onPreview(cvId))}
					disabled={isLoading}
					className="flex-1"
				>
					Preview
				</Button>
				<Button
					startIcon={<Edit />}
					onClick={() => handleAction(() => onEdit(cvId))}
					disabled={isLoading}
					className="flex-1"
				>
					Edit
				</Button>
				<Button
					startIcon={<Delete />}
					onClick={() => setIsDeleteDialogOpen(true)}
					disabled={isLoading}
					color="error"
					className="flex-1"
				>
					Delete
				</Button>
				<Button
					startIcon={<Download />}
					onClick={() => handleAction(() => onDownload(cvId))}
					disabled={isLoading}
					className="flex-1"
				>
					Download
				</Button>
			</ButtonGroup>

			<Dialog
				open={isDeleteDialogOpen}
				onClose={() => setIsDeleteDialogOpen(false)}
				aria-labelledby="delete-dialog-title"
			>
				<DialogTitle id="delete-dialog-title">Delete CV</DialogTitle>
				<DialogContent>
					Are you sure you want to delete "{cvTitle}"? This action cannot be undone.
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
					<Button
						onClick={() => {
							handleAction(() => onDelete(cvId));
							setIsDeleteDialogOpen(false);
						}}
						color="error"
						variant="contained"
					>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
