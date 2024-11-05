import React from 'react';
import moment from 'moment';
import './DetailsCard.css';

const DetailsCard = ({ selectedItem, onClose, position }) => {
  if (!selectedItem) return null;

  return (
    <div
      className="details-card"
      style={{
        position: 'absolute',
        top: position.top,
        left: position.left,
        transform: 'translate(-50%, -50%)',
        zIndex: 1000
      }}
    >
      <h3>Detalhes da Alocação</h3>
      <p><strong>Projeto:</strong> {selectedItem.project.name}</p>
      <p><strong>Funcionário:</strong> {selectedItem.employee.name}</p>
      <p><strong>Data de Início:</strong> {moment(selectedItem.startDate).format("YYYY-MM-DD HH:mm")}</p>
      <p><strong>Data de Término:</strong> {moment(selectedItem.endDate).format("YYYY-MM-DD HH:mm")}</p>
      <button onClick={onClose}>Fechar</button>
    </div>
  );
};

export default DetailsCard;
