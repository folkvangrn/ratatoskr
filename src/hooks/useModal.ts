import { useState } from 'react';

export const useModal = (initialState: boolean) => {
  const [isModalOpen, setIsModalOpen] = useState(initialState);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return {
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
  };
};
