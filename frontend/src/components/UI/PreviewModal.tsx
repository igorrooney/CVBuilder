'use client';

import { useEffect, useRef } from 'react';
import { Dialog, DialogContent, IconButton, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface PreviewModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	title?: string;
}

export function PreviewModal({ isOpen, onClose, children, title }: PreviewModalProps) {
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') onClose();
		};
		if (isOpen) {
			document.addEventListener('keydown', handleEscape);
			document.body.style.overflow = 'hidden';
		}
		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.body.style.overflow = 'unset';
		};
	}, [isOpen, onClose]);

	useEffect(() => {
		if (isOpen && modalRef.current) modalRef.current.focus();
	}, [isOpen]);

	return (
		<Dialog
			open={isOpen}
			onClose={onClose}
			maxWidth="md"
			fullWidth
			aria-modal="true"
			role="dialog"
			scroll="paper"
			PaperProps={{
				className:
					'relative bg-white rounded-2xl shadow-2xl p-0 max-w-2xl mx-auto my-8 border border-gray-100',
				style: { position: 'relative', zIndex: 1300 },
			}}
			BackdropProps={{
				className: 'bg-black/60 backdrop-blur-sm',
				style: { zIndex: 1200 },
			}}
			transitionDuration={300}
			TransitionComponent={Slide}
			TransitionProps={{ direction: 'up' } as any}
		>
			<div className="flex h-full flex-col overflow-hidden">
				<div className="flex items-center justify-between border-b bg-gray-50 px-6 py-4">
					{title && <h2 className="text-lg font-semibold text-gray-900">{title}</h2>}
					<IconButton
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700"
						aria-label="Close preview"
						sx={{
							width: '24px',
							height: '24px',
						}}
					>
						<CloseIcon fontSize="medium" />
					</IconButton>
				</div>
				<DialogContent className="flex-1 overflow-hidden p-0">
					<div
						ref={modalRef}
						className="h-full overflow-y-auto overflow-x-hidden bg-white focus:outline-none"
						tabIndex={-1}
					>
						{children}
					</div>
				</DialogContent>
			</div>
		</Dialog>
	);
}
