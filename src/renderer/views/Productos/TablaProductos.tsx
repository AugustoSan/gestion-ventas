import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useCustomSelector } from '../../hooks/redux';
import { ItemProductoTabla } from '../../components/ItemProductTabla';

export const TablaProductos = ():JSX.Element => {
  // Aqui hay que obtener todos los clientes
  const {productosArray, searchProducto} = useCustomSelector((state) => state.productSlice);

  return (
      <div className="card">
        <div className="card-body">
        <div className="table-responsive small">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Concepto</th>
              <th scope="col">Información</th>
            </tr>
          </thead>
          <tbody>
            {
              searchProducto !== null && searchProducto.length > 0
              ? searchProducto.map((producto, index) => {
                return <ItemProductoTabla key={`${index}-${producto.id}-item-producto-search`} producto={producto} />
              })
              : productosArray.map( (producto, index) => {
                return <ItemProductoTabla key={`${index}-${producto.id}-item-producto`} producto={producto} />
              })
            }
          </tbody>
        </Table>
      </div>
        </div>
      </div>
  );
}
