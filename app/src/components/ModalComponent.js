import React, { useState } from 'react';
import './css/ModalComponent.css'; // Arquivo de estilos para o modal

export default function ModalComponent({ isOpen, onClose, children }) {
  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-button" onClick={onClose}>
              Fechar
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};