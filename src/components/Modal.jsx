import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

const Modal = ({
  title,
  content,
  show,
  onClose,
  onConfirm,
  confirmText = 'Conferma',
}) => {
  if (!show) return null;

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>{title}</h2>
        <p>{content}</p>
        <div className={styles.modalActions}>
          <button onClick={onClose} className={styles.cancelButton}>
            Annulla
          </button>
          <button onClick={onConfirm} className={styles.confirmButton}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;
