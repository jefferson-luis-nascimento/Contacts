import React from 'react';
import Modal from 'react-modal';
import { MdClose } from 'react-icons/md';

import { Container } from './styles';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 400,
    border: 0,
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
};

Modal.setAppElement('#root');

export default function CustomModal({ children, openModal, setIsOpen }) {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Modal
      isOpen={openModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <Container>
        <button type="button" onClick={closeModal}>
          <MdClose size={20} color="#ff1a40" />
        </button>
        {children}
      </Container>
    </Modal>
  );
}
