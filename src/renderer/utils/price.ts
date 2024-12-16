import { ChartConfiguration } from "chart.js";

export const numberToPrice = (price: number):string => {
  // return `$ ${price.toLocaleString("es-ES", {style:"currency", currency:"MXN"})}`;
  return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(price);
};
