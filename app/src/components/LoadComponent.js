import React from 'react';
import './css/LoadComponent.css';

export default function LoadingIndicator({ title = 'Carregando...' }) {
  return (
    <div className="loading-indicator">
      <div className="loading-title">{title}</div>
      <div className="spinner"></div>
    </div>
  );
}
