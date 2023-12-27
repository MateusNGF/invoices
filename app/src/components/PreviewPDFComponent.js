import React from 'react';
import './css/PreviewPDFComponent.css';

export default function PreviewPDFComponent({ content = [{}] }) {
  return (
    <div className="container-preview">
      {content.map((file, index) => (
        <div key={index} className="preview-item">
          <p className="index-label">{index + 1}º {file.name}</p>
          <embed className="preview-embed" src={file.src} type="application/pdf" itemScope="true" />
        </div>
      ))}
    </div>
  );
}
