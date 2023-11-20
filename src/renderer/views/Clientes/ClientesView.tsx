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
import { FindClient, GetAllClients, setHandleAddClient } from '../../redux/slice/clientes';
import { InfoClienteAddressCard } from './InfoClienteAddressCard';
import { TablaAddressByCliente } from './TablaAddressByCliente';
import { InputSearchCliente } from '../../components/InputSearchCliente';
import { ButtonAddNewAddress } from '../../components/ButtonAddNewAddress';

export const ClientesView = ():JSX.Element => {
  const { selectClient, handleAddClient, handleWatchAddress } = useCustomSelector((state) => state.clientSlice);
  const [inputSearch, setInputSearch] = useState<string>('');

  const dispatch = useCustomDispatch();

  // useEffect(() => {
  //   dispatch(GetAllClients());
  // }, []);


  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Clientes</h1>
        {
          selectClient === null
          ? (<InputSearchCliente />)
          : <ButtonAddNewAddress idCliente={selectClient.id}/>
        }
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
        selectClient === null ? handleAddClient === true
          ? <AddClienteCard /> : <TablaClienteCard />
          : handleWatchAddress === false ? <InfoClienteCard /> : <TablaAddressByCliente />
      }
    </main>
  );
}
