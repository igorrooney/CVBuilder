'use client';

import { Snackbar, Alert } from '@mui/material';
import { useState, useEffect } from 'react';

interface NotificationProps {
	open: boolean;
	message: string;
	severity: 'success' | 'error' | 'warning' | 'info';
	onClose: () => void;
	autoHideDuration?: number;
}

export function Notification({
	open,
	message,
	severity,
	onClose,
	autoHideDuration = 6000,
}: NotificationProps) {
	const [isOpen, setIsOpen] = useState(open);

	useEffect(() => {
		setIsOpen(open);
	}, [open]);

	const handleClose = () => {
		setIsOpen(false);
		onClose();
	};

	return (
		<Snackbar
			open={isOpen}
			autoHideDuration={autoHideDuration}
			onClose={handleClose}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
		>
			<Alert onClose={handleClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
				{message}
			</Alert>
		</Snackbar>
	);
}
