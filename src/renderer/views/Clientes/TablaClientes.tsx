import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { LabelInfoCard } from '../../components/LabelInfoCard';
import { ItemClientTabla } from '../../components/ItemClientTabla';
import { IClient } from '../../../main/interfaces';
import { useCustomSelector } from '../../hooks/redux';

export const TablaClienteCard = ():JSX.Element => {
  // Aqui hay que obtener todos los clientes
  const {clientesArray} = useCustomSelector((state) => state.clientSlice);

  console.log('clientesArray: ', clientesArray);

  return (
      <div className="card">
        <div className="card-body">
        <div className="table-responsive small">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido paterno</th>
              <th scope="col">Apellido materno</th>
              <th scope="col">Telefono</th>
              <th scope="col">Acción</th>
            </tr>
          </thead>
          <tbody>
            {
              clientesArray.map( (cliente, index) => {
                return <ItemClientTabla key={`${index}-${cliente.id}-item-cliente`} cliente={cliente} />
              })
            }
          </tbody>
        </Table>
      </div>
        </div>
      </div>
  );
}
