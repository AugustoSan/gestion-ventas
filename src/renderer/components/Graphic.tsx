import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';


interface IDataProps {
  data: number[];
  labels: string[];
}

export const Graphic = ({data, labels}:IDataProps):JSX.Element => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      // Destruye la instancia anterior si existe
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        chartInstanceRef.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Mi Gráfica',
                data: data,
                backgroundColor: 'transparent',
                borderColor: '#007bff',
                borderWidth: 4,
                pointBackgroundColor: '#007bff'
              },
              {
                type: 'bar',
                label: 'Bar Dataset',
                data: [15339, 25339, 15339, 25339]
              }, {
                type: 'line',
                label: 'Line Dataset',
                data: [28483, 18483, 28483, 18483],
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                boxPadding: 3
              }
            }
          }
        });
      }
    }
  }, [data, labels]);


  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
}
