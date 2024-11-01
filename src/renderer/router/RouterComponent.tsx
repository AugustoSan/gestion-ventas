import React from 'react';
import { useState, useEffect } from 'react';

// import { Route, Routes } from 'react-router-dom';
import { useCustomSelector } from '../hooks/redux';

import {HomeView} from '../views/HomeView';
import { ClientesView } from '../views/Clientes/ClientesView';
import { IngresoView } from '../views/Ingresos/IngresoView';
import { VentasView } from '../views/Ventas/VentasView';
import { ProductosView } from '../views/Productos/ProductosView';
import { menuItems } from '../utils/menuItems';

export const RouterComponent:React.FC = () => {
  const [showView, setShowView] = useState<JSX.Element | null>(null);
  const {selectOption} = useCustomSelector((state) => state.menuSlice);
  const {
    home,
    clientes,
    addCliente,
    infoCliente,
    updateCliente,
    ingresos,
    ventas,
    pagos,
    productos
  } = menuItems;

  useEffect(() => {
    switch (selectOption) {
      case home.href:
        setShowView(<HomeView />);
        break;
      case clientes.href:
        setShowView(<ClientesView />);
        break;
      case ingresos.href:
        setShowView(<IngresoView />);
        break;
      case ventas.href:
        setShowView(<VentasView />);
        break;
      case pagos.href:
        setShowView(<HomeView />);
        break;
      case productos.href:
        setShowView(<ProductosView />);
        break;
      default:
        setShowView(<HomeView />);
        break;
    }
  }, [selectOption])


  return showView;
}
