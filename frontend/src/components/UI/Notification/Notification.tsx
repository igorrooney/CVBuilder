'use client';

import { Dialog, DialogContent, Button, Typography, Box, AlertColor } from '@mui/material';
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
}: NotificationProps) {
	return (
		<AnimatePresence>
			{open && (
				<Dialog
					open={open}
					onClose={(event, reason) => {
						if (reason !== 'backdropClick') {
							onClose();
						}
					}}
					maxWidth="xs"
					PaperProps={{
						component: motion.div,
						initial: { opacity: 0, y: 20 },
						animate: { opacity: 1, y: 0 },
						exit: { opacity: 0, y: 20 },
						transition: { duration: 0.2 },
						sx: {
							borderRadius: 1,
							overflow: 'hidden',
							minWidth: '320px',
							bgcolor: '#ffffff',
						},
					}}
				>
					<Box sx={{ p: 3 }}>
						<Box sx={{ textAlign: 'center', pb: 3 }}>
							<Typography
								variant="h6"
								component="h2"
								sx={{
									fontSize: '1.25rem',
									fontWeight: 600,
									color: '#2E7D32',
									mb: 1,
								}}
							>
								Success!
							</Typography>
							<Typography
								variant="body1"
								sx={{
									color: 'grey.600',
									fontSize: '0.975rem',
								}}
							>
								{message}
							</Typography>
						</Box>

						<Button
							fullWidth
							variant="contained"
							onClick={onClose}
							sx={{
								'py': 1.5,
								'bgcolor': '#2E7D32',
								'&:hover': {
									bgcolor: '#1B5E20',
								},
								'textTransform': 'none',
								'fontSize': '1rem',
								'fontWeight': 500,
								'boxShadow': 'none',
								'borderRadius': 1,
							}}
						>
							Continue
						</Button>
					</Box>
				</Dialog>
			)}
		</AnimatePresence>
	);
}
