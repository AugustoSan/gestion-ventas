import React from 'react';
import { useState, useEffect } from 'react';
import {
  Toolbar,
} from '@mui/material';

// import { Route, Routes } from 'react-router-dom';
import { useCustomSelector } from '../hooks/redux';

import {HomeView} from '../views/HomeView';
import { ClientesView } from '../views/Clientes/ClientesView';
import { IngresoView } from '../views/Ingresos/IngresoView';
import { VentasView } from '../views/Ventas/VentasView';
import { ProductosView } from '../views/Productos/ProductosView';
import { menuItems } from '../utils/menuItems';
import { AddClienteCard } from '../views/Clientes/AddClienteCard';
import { InfoClienteCard } from '../views/Clientes/InfoClienteCard';
import { UpdateClienteCard } from '../views/Clientes/UpdateClienteCard';
import { SettingsView } from '../views/SettingsView';

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
    productos,
    settings
  } = menuItems;

  useEffect(() => {
    switch (selectOption) {
      case home.href:
        setShowView(<HomeView />);
        break;
      case clientes.href:
        setShowView(<ClientesView />);
        break;
      case addCliente.href:
        setShowView(<AddClienteCard />);
        break;
      case infoCliente.href:
        setShowView(<InfoClienteCard />);
        break;
      // case infoCliente.href:
      //   setShowView(<UpdateClienteCard />);
      //   break;
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
      case settings.href:
        setShowView(<SettingsView />);
        break;
      default:
        setShowView(<HomeView />);
        break;
    }
  }, [selectOption])


  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 overflow-y-auto mt-2">
      <Toolbar />
      {showView}
    </main>
  );
}
