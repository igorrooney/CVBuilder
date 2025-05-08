import { useState, useCallback } from 'react';

interface UsePreviewModalReturn {
	isOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
	toggleModal: () => void;
}

export function usePreviewModal(initialState = false): UsePreviewModalReturn {
	const [isOpen, setIsOpen] = useState(initialState);

	const openModal = useCallback(() => {
		setIsOpen(true);
	}, []);

	const closeModal = useCallback(() => {
		setIsOpen(false);
	}, []);

	const toggleModal = useCallback(() => {
		setIsOpen((prev) => !prev);
	}, []);

	return {
		isOpen,
		openModal,
		closeModal,
		toggleModal,
	};
}
