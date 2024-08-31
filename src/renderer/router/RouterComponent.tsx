import React from 'react';

import { Route, Routes } from 'react-router-dom';

import {HomeView} from '../views/HomeView';
import { ClientesView } from '../views/Clientes/ClientesView';
import { IngresoView } from '../views/Ingresos/IngresoView';
import { VentasView } from '../views/Ventas/VentasView';
import { ProductosView } from '../views/Productos/ProductosView';
import { menuItems } from '../utils/menuItems';
import { IngresoWithIDView } from '../views/Pagos/IngresoWithIDView';

export const RouterComponent:React.FC = () => {
  const {home, clientes, ingresos, ventas, productos, pagos} = menuItems;
  return (
    <Routes>
      <Route path={clientes.href} element={<ClientesView />} />
      <Route path={home.href} element={<HomeView />} />
      <Route path={ingresos.href} element={<IngresoView />} />
      <Route path={ventas.href} element={<VentasView />} />
      <Route path={`${pagos.href}/:id`} element={<IngresoWithIDView />} />
      <Route path={productos.href} element={<ProductosView />} />
      <Route path="/*" element={<HomeView />} />
    </Routes>
  );
}
