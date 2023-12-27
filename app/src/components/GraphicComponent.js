import './css/GraphicComponent.css';
import React from 'react';
import { Bar } from 'react-chartjs-2';



export default function GraphicComponent({ title = "Gráfico", labels = [], datasets = [], onHouver = () => {} }) {
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
      title: {
        display: true,
        text: title,
        font: {
          size: 20, // Tamanho da fonte do título
        }
      },
      legend: {
        display: true,
        labels: {
          font: {
            size: 15, // Tamanho da fonte da legenda
          }
        }
      },
    }
  };

  return (
    <div className="graphic-container">
        <Bar data={configureContentGraphic} options={optionsToPlotGraphic} />
    </div>
  );
};
