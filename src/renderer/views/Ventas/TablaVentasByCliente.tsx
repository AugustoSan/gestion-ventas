import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { LabelInfoCard } from '../../components/LabelInfoCard';
import { ItemClientTabla } from '../../components/ItemClientTabla';
import { IClient } from '../../../main/interfaces';
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux';

interface IDataProps {
  cliente: IClient;
}

export const TablaVentasByCliente = ({cliente}:IDataProps):JSX.Element => {

  const dispatch = useCustomDispatch();

  useEffect(() => {
    // Cargar los datos de las ventas
  }, []);


  return (
      <div className="card">
        <div className="card-body">
          <div className="table-responsive small">
          {/* <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Apellido paterno</th>
                <th scope="col">Apellido materno</th>
                <th scope="col">Telefono</th>
                <th scope="col">Acción</th>
              </tr>
            </thead>
            <tbody>
              {
                searchCliente.length > 0
                ? searchCliente.map( (cliente, index) => {
                  return <ItemClientTabla key={`${index}-${cliente.id}-item-cliente-search`} cliente={cliente} />
                })
                : clientesArray.map( (cliente, index) => {
                  return <ItemClientTabla key={`${index}-${cliente.id}-item-cliente`} cliente={cliente} />
                })
              }
            </tbody>
          </Table> */}
          </div>
        </div>
      </div>
  );
}
