import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux';
import { ItemAddressTabla } from '../../components/ItemAddressTabla';
import { setHandleWatchAddress } from '../../redux/slice/clientes';

export const TablaAddressByCliente = ():JSX.Element => {
  // Aqui hay que obtener todos los clientes
  const {selectClient} = useCustomSelector((state) => state.clientSlice);
  const dispatch = useCustomDispatch();

  console.log('selectClient: ', selectClient);

  return selectClient === null ? <></>
  : (
      <div className="card">
        <div className="card-body">
        <div className="table-responsive small">
        <div className="card mb-2">
          <Button variant="outline-secondary" size="lg" onClick={() => dispatch(setHandleWatchAddress(false))}>
            {'Regresar'}
          </Button>
        </div>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Direccion</th>
              <th scope="col">Eliminar</th>
              <th scope="col">Editar</th>
            </tr>
          </thead>
          <tbody>
            {
              selectClient.direcciones.map((address, index) => {
                return <ItemAddressTabla key={`${index}-${address.id}-tabla-address`} address={address} />
              })
            }
          </tbody>
        </Table>
      </div>
        </div>
      </div>
  );
}
