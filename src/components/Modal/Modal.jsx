import {  useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalImg } from './Modal.styled';


const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, children }) => {
  useEffect(() => {
    const onEscPress = ({ code }) => {
      if (code === 'Escape') {
        onClose();
      }
    };
  
    window.addEventListener('keydown', onEscPress);
    return () => window.removeEventListener('keydown', onEscPress);
  }, [onClose]);

  const handleClick = ({ target, currentTarget }) => {
      if (target === currentTarget) {
        onClose();
      }
    };

      return createPortal(
        <Overlay onClick={handleClick}>
          <ModalImg>
            {children}
          </ModalImg>
        </Overlay>, modalRoot);
    }
  

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
}