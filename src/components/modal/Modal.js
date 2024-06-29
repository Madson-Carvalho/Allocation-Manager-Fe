import './Modal.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRectangleXmark} from "@fortawesome/free-solid-svg-icons";

const Modal = ({children, title, isOpen, onClose, onConfirm}) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="header-modal">
                    {title && <h2>{title}</h2>}
                    <button onClick={onClose}><FontAwesomeIcon icon={faRectangleXmark}/></button>
                </div>
                {children}
            </div>
        </div>
    );
}

export default Modal;