import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { ItemClientTabla } from '../../components/ItemClientTabla';
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux';
import { PaginationComponent } from '../../components/PaginationComponent';
import { setCurrentPage } from '../../redux/slice/clientes';

export const TablaClienteCard = ():JSX.Element => {
  // Aqui hay que obtener todos los clientes
  const {clientesArray, searchCliente, currentPage, sizePage} = useCustomSelector((state) => state.clientSlice);
  const dispatch = useCustomDispatch();

  console.log('clientesArray: ', clientesArray);

  return (
      <div className="card">
        <div className="card-body">
        <div className="table-responsive small">
        <Table responsive striped bordered hover size="sm">
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
              searchCliente.length > 0
              ? searchCliente.map( (cliente, index) => {
                return <ItemClientTabla key={`${index}-${cliente.id}-item-cliente-search`} cliente={cliente} />
              })
              : clientesArray.map( (cliente, index) => {
                return <ItemClientTabla key={`${index}-${cliente.id}-item-cliente`} cliente={cliente} />
              })
            }
          </tbody>
        </Table>
        {/* <PaginationComponent data={clientesArray} actionNextPage={() => { dispatch(setCurrentPage(currentPage+1))}} actionPreviousPage={() => { dispatch(setCurrentPage(currentPage-1))}}/> */}
      </div>
        </div>
      </div>
  );
}
