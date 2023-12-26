import './css/GraphicComponent.css';
import React from 'react';
import { Bar } from 'react-chartjs-2';



export default function GraphicComponent({ labels = [], datasets = [], onHouver = () => {} }) {
  const  configureContentGraphic = {
    labels: labels, // meses
    datasets: datasets,
  };

  const optionsToPlotGraphic = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        enabled: true, // Habilita a exibição da tooltip
      },
    },
    onHover: (event, chartElement) => {
      if (chartElement.length){
        const index = chartElement[0].index;
        onHouver(index)
      }
    },
  };

  return (
    <div className="graphic-container">
        <Bar data={configureContentGraphic} options={optionsToPlotGraphic} />
    </div>
  );
};
