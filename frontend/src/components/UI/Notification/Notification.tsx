'use client';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import { AlertColor, Box, Button, Dialog, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';

interface NotificationProps {
	open: boolean;
	onClose: () => void;
	message: string;
	severity?: AlertColor;
	autoHideDuration?: number;
	title?: string;
	buttonText?: string;
}

const iconMap = {
	success: <CheckCircleIcon className="text-green-600" fontSize="large" />,
	error: <ErrorIcon className="text-red-600" fontSize="large" />,
	info: <InfoIcon className="text-blue-600" fontSize="large" />,
	warning: <WarningIcon className="text-yellow-600" fontSize="large" />,
};

const titleMap = {
	success: 'Success!',
	error: 'Error',
	info: 'Info',
	warning: 'Warning',
};

export default function Notification({
	open,
	onClose,
	message,
	severity = 'success',
	title,
	buttonText = 'Continue',
}: NotificationProps) {
	return (
		<AnimatePresence>
			{open && (
				<Dialog
					open={open}
					onClose={(_, reason) => {
						if (reason !== 'backdropClick') onClose();
					}}
					maxWidth="xs"
					aria-labelledby="notification-modal-title"
					aria-describedby="notification-modal-description"
					PaperProps={{
						component: motion.div,
						initial: { opacity: 0, y: 24 },
						animate: { opacity: 1, y: 0 },
						exit: { opacity: 0, y: 24 },
						transition: { duration: 0.22 },
						className: 'rounded-2xl shadow-2xl p-0 bg-white',
						sx: { minWidth: 320, maxWidth: 400 },
					}}
				>
					<Box className="flex flex-col items-center px-6 pb-4 pt-8">
						<span aria-hidden="true">{iconMap[severity]}</span>
						<Typography
							id="notification-modal-title"
							variant="h6"
							className={`mt-2 text-center font-bold ${
								severity === 'success'
									? 'text-green-700'
									: severity === 'error'
										? 'text-red-700'
										: severity === 'info'
											? 'text-blue-700'
											: 'text-yellow-700'
							}`}
						>
							{title || titleMap[severity]}
						</Typography>
						<Typography
							id="notification-modal-description"
							className="mt-1 text-center text-base text-gray-600"
						>
							{message}
						</Typography>
						<Button
							onClick={onClose}
							variant="contained"
							color={
								severity === 'success' ? 'success' : severity === 'error' ? 'error' : 'primary'
							}
							className="!mt-6 !rounded-lg !px-8 !py-2 !text-base !font-medium"
							disableElevation
							fullWidth
							autoFocus
						>
							{buttonText}
						</Button>
					</Box>
				</Dialog>
			)}
		</AnimatePresence>
	);
}
