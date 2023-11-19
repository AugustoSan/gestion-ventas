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
import { GetAllClients } from '../../redux/slice/clientes';

export const ClientesView = ():JSX.Element => {
  const { selectClient } = useCustomSelector((state) => state.clientSlice);

  const dispatch = useCustomDispatch();

  useEffect(() => {
    dispatch(GetAllClients());
  }, []);


  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Clientes</h1>
        {/* <form className="form-inline my-2 my-lg-0"> */}
        <div className="col-9 row">
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Buscar cliente"
              aria-label="Buscar cliente"
              aria-describedby="Nombre apellido"
            />
            <Button variant="primary">
              Buscar
            </Button>
        </InputGroup>
          {/* <div className="col-10">
            <input className="form-control" type="search" placeholder="Buscar cliente" aria-label="Search" />
          </div>
          <div className="col-2">
            <button className="btn btn-outline-success">Buscar</button>
          </div> */}
      </div>
        {/* </form> */}
      </div>
      {
        selectClient === null ? <TablaClienteCard /> : <InfoClienteCard />
      }
    </main>
  );
}
