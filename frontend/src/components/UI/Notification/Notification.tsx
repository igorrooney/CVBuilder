'use client';

import { Alert, AlertColor, Snackbar, Button, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

interface NotificationProps {
	open: boolean;
	onClose: () => void;
	message: string;
	severity?: AlertColor;
	autoHideDuration?: number;
}

export default function Notification({
	open,
	onClose,
	message,
	severity = 'success',
	autoHideDuration = 6000,
}: NotificationProps) {
	return (
		<AnimatePresence>
			{open && (
				<Snackbar
					open={open}
					autoHideDuration={autoHideDuration}
					onClose={onClose}
					anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
					sx={{
						'& .MuiSnackbar-root': {
							top: '24px',
						},
					}}
					role="alert"
					aria-live={severity === 'error' ? 'assertive' : 'polite'}
				>
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.3 }}
					>
						<Alert
							severity={severity}
							variant="filled"
							action={
								<Button
									color="inherit"
									size="small"
									onClick={onClose}
									sx={{
										'minWidth': '64px',
										'textTransform': 'none',
										'fontWeight': 500,
										'&:hover': {
											backgroundColor: 'rgba(255, 255, 255, 0.1)',
										},
									}}
								>
									{severity === 'error' ? 'Dismiss' : 'OK'}
								</Button>
							}
							sx={{
								'width': '100%',
								'boxShadow':
									'0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
								'& .MuiAlert-icon': {
									fontSize: '1.5rem',
									alignSelf: 'center',
								},
								'& .MuiAlert-message': {
									fontSize: '1rem',
									fontWeight: 500,
									display: 'flex',
									alignItems: 'center',
									gap: 1,
								},
								'& .MuiAlert-action': {
									alignItems: 'center',
									paddingTop: 0,
								},
							}}
						>
							<Typography
								variant="body1"
								component="span"
								sx={{
									fontWeight: 500,
									lineHeight: 1.5,
								}}
							>
								{message}
							</Typography>
						</Alert>
					</motion.div>
				</Snackbar>
			)}
		</AnimatePresence>
	);
}
