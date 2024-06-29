import React from 'react';
import './Modal.css';

const Modal = ({ show, handleClose, children }) => {

    if (!show) {
        return null;
    }

    return (
        <div className={`modal ${show ? 'show' : ''}`} onClick={handleClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <span className="close" onClick={handleClose}>&times;</span>
                {children}
            </div>
        </div>
    );
};

export default Modal;
