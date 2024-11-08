import './DeleteModal.css';

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>X</button>
                <h3>Você tem certeza que deseja excluir este item?</h3>
                <div className="modal-actions">
                    <button className="cancel-btn" onClick={onClose}>Cancelar</button>
                    <button className="confirm-btn" onClick={onConfirm}>Confirmar</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
