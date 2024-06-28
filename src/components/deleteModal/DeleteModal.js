import './DeleteModal.css'

const DeleteModal = ({isOpen, onClose, onConfirm}) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="confirm-modal-overlay">
            <div className="confirm-modal-content">
                <div className="confirm-modal-message">
                    Você tem certeza que deseja excluir este item?
                </div>
                <div className="confirm-modal-buttons">
                    <button onClick={onConfirm}>Confirmar</button>
                    <button onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;