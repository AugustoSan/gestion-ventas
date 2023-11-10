import React, { useState } from 'react';
import { LabelInfoCard } from '../../components/LabelInfoCard';
import { InfoClienteCard } from './InfoClienteCard';
import { AddClienteCard } from './AddClienteCard';
import { TablaClienteCard } from './TablaClientes';
import { useCustomSelector } from '../../hooks/redux';

// import { appendLogFile } from '../../main/util';

export const ClientesView = ():JSX.Element => {

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Clientes</h1>
        {/* <form className="form-inline my-2 my-lg-0"> */}
        <div className="col-9 row">
          <div className="col-10">
            <input className="form-control" type="search" placeholder="Buscar cliente" aria-label="Search" />
          </div>
          <div className="col-2">
            <button className="btn btn-outline-success">Buscar</button>
          </div>
        </div>
        {/* </form> */}
      </div>
      <InfoClienteCard />
      {/* <InfoClienteCard cliente={client} />
      <AddClienteCard /> */}
      <TablaClienteCard />
    </main>
  );
}
