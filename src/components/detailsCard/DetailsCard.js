import React from 'react';
import moment from 'moment';
import './DetailsCard.css';

const DetailsCard = ({ selectedItem, onClose, position, isEmployee }) => {
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
      <h3 className='details-title'>Detalhes da Alocação</h3>
        <div className='details-body'>
            <p><span>Projeto:</span> {selectedItem.project.name}</p>
            <p><span>Colaborador:</span> {selectedItem.employee.name}</p>
            <p><span>Horas alocadas nesse projeto por dia:</span> {selectedItem.allocatedHours} hr</p>
            <p><span>Horas de trabalho por dia:</span> {selectedItem.employee.workInSeconds} hr</p>
            <p><span>Total de horas
                ociosas:</span> {selectedItem.employee.workInSeconds - selectedItem.employee.allocatedHours} hr</p>
            <p><span>Total de horas
                disponíveis do
                projeto:</span> {selectedItem.project.projectHours - selectedItem.employee.allocatedHours} hr</p>
            <p><span>Data de Início da alocação:</span> {moment(selectedItem.startDate).format("DD/MM/YYYY HH:mm")}</p>
            <p><span>Data de Término da alocação:</span> {moment(selectedItem.endDate).format("DD/MM/YYYY HH:mm")}</p>
            <p><span>Data de Início do projeto:</span> {moment(selectedItem.project.initialDate).format("DD/MM/YYYY HH:mm")}</p>
            <p><span>Data de Término do
                projeto:</span> {moment(selectedItem.project.deliveryDate).format("DD/MM/YYYY HH:mm")}</p>
        </div>
        <button className='details-button' onClick={onClose}>Fechar</button>
    </div>
  );
};

export default DetailsCard;
