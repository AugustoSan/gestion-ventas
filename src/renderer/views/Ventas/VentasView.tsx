import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useCustomSelector } from '../../hooks/redux';
import { IClient } from '../../../main/interfaces';
import { TablaVentasByCliente } from './TablaVentasByCliente';
import { TablaVentas } from './TablaVentas';

export const VentasView = ():JSX.Element => {
  const {clientesArray} = useCustomSelector((state) => state.clientSlice);
  const [client, setClient] = useState<IClient | null>(null);
  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Ventas</h1>
      </div>
      <Dropdown>
        <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
          Seleccionar cliente
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {
            clientesArray.map((cliente, index) => {
              return <Dropdown.Item
                        key={`${index}-${cliente.id}-dropdown-ventas`}
                        onClick={
                          () => {
                            console.log(`id: ${cliente.id}`);
                            setClient(cliente);
                          }
                        }
                      >
                        {`${cliente.name} ${cliente.app}`}
                      </Dropdown.Item>
            })
          }
        </Dropdown.Menu>
      </Dropdown>
      {
        client === null
        ? <TablaVentas />
        : <TablaVentasByCliente cliente={client}/>
      }
    </main>
  );
}
