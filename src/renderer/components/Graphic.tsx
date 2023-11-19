import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';


interface IDataProps {
  dataIngresos: number[];
  dataPedidos: number[];
  labels: string[];
}

export const Graphic = ({dataIngresos, dataPedidos, labels}:IDataProps):JSX.Element => {
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
                label: 'Pedidos',
                data: dataIngresos,
                backgroundColor: 'transparent',
                borderColor: '#007bff',
                borderWidth: 4,
                pointBackgroundColor: '#007bff'
              },
              // {
              //   type: 'bar',
              //   backgroundColor: '#007bff',
              //   label: 'Bar Dataset',
              //   data: [15339, 25339, 15339, 25339]
              // },

              {
                type: 'line',
                backgroundColor: '#5BFF33',
                borderColor: '#5BFF33',
                label: 'Pagos',
                data: dataPedidos,
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
  }, [dataIngresos, dataPedidos, labels]);


  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
}
