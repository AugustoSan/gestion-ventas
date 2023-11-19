import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { LabelInfoCard } from '../../components/LabelInfoCard';
import { InfoClienteCard } from './InfoClienteCard';
import { AddClienteCard } from './AddClienteCard';
import { TablaClienteCard } from './TablaClientes';
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux';

// import { appendLogFile } from '../../main/util';
import { useEffect } from 'react';
import { GetAllClients, setHandleAddClient } from '../../redux/slice/clientes';

export const ClientesView = ():JSX.Element => {
  const { selectClient, handleAddClient } = useCustomSelector((state) => state.clientSlice);

  const dispatch = useCustomDispatch();

  useEffect(() => {
    dispatch(GetAllClients());
  }, []);


  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Clientes</h1>
        {/* <div className="col-9 row">
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Buscar cliente"
              aria-label="Buscar cliente"
              aria-describedby="Nombre apellido"
            />
            <Button variant="outline-primary">
              Buscar
            </Button>
          </InputGroup>
        </div> */}
      </div>
      {
        selectClient === null && handleAddClient !== true
          ? (<div className="card mb-2">
              <Button variant="outline-primary" size="lg" onClick={() => dispatch(setHandleAddClient(!handleAddClient))}>
                {'Agregar nuevo cliente'}
              </Button>
            </div>)
          : <></>
      }
      {
        selectClient === null ? handleAddClient === true ? <AddClienteCard /> : <TablaClienteCard /> : <InfoClienteCard />
      }
    </main>
  );
}
