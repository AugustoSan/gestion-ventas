import React from 'react';

import { Route, Routes } from 'react-router-dom';

import {HomeView} from '../views/HomeView';
import { ClientesView } from '../views/Clientes/ClientesView';
import { IngresoView } from '../views/IngresoView';
import { VentasView } from '../views/Ventas/VentasView';
import { ProductosView } from '../views/Productos/ProductosView';
import { menuItems } from '../utils/menuItems';

export const RouterComponent:React.FC = () => {
  const {home, clientes, ingresos, ventas, productos} = menuItems;
  return (
    <Routes>
      <Route path={clientes.href} element={<ClientesView />} />
      <Route path={home.href} element={<HomeView />} />
      <Route path={ingresos.href} element={<IngresoView />} />
      <Route path={ventas.href} element={<VentasView />} />
      <Route path={productos.href} element={<ProductosView />} />
      <Route path="/*" element={<HomeView />} />
    </Routes>
  );
}
