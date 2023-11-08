import React from 'react';

import { Route, Routes } from 'react-router-dom';

import {HomeView} from '../views/HomeView';
import { ClientesView } from '../views/Clientes/ClientesView';
import { IngresoView } from '../views/IngresoView';
import { OrderView } from '../views/OrderView';
import { ProductoView } from '../views/ProductoView';

export const RouterComponent:React.FC = () => {
  return (
    <Routes>
      <Route path="/clientes" element={<ClientesView />} />
      <Route path="/home" element={<HomeView />} />
      <Route path="/ingresos" element={<IngresoView />} />
      <Route path="/order" element={<OrderView />} />
      <Route path="/producto" element={<ProductoView />} />
      <Route path="/*" element={<HomeView />} />
    </Routes>
  );
}
