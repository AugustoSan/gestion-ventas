import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { LabelInfoCard } from '../../components/LabelInfoCard';
import { ItemClientTabla } from '../../components/ItemClientTabla';
import { IClient } from '../../../main/interfaces';
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux';
import { ItemVentaTabla } from '../../components/ItemVentaTabla';
import { ItemAddVentaTabla } from '../../components/ItemAddVentaTabla';

export const TablaProductosAddVenta = ():JSX.Element => {
  const { selectProductos, totalAddVenta } = useCustomSelector((state) => state.ventaSlice)
  const dispatch = useCustomDispatch();

  return (
      <div className="card">
        <div className="card-body">
          <div className="table-responsive small">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Producto</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Precio</th>
                <th scope="col">Total</th>
                <th scope="col">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {
                selectProductos.map( (item, index) => {
                  return <ItemAddVentaTabla key={`${index}-${item.id_producto}-item-add-producto-tabla`} data={item}  />
                })
              }
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>Total: </td>
                <td>$ {totalAddVenta.toLocaleString("es-ES", {style:"currency", currency:"MXN"})}</td>
                <td></td>
              </tr>
            </tbody>
          </Table>
          </div>
        </div>
      </div>
  );
}
