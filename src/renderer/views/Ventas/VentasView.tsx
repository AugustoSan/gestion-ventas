import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux';
import { IClient } from '../../../main/interfaces';
import { TablaVentasByCliente } from './TablaVentasByCliente';
import { TablaVentas } from './TablaVentas';
import { GetAllVentas, setHandleAddVenta, setSelectClienteSearch, setSelectView } from '../../redux/slice/ventas';
import { AddVentaClienteCard } from './AddVentaClienteCard';
import { AddVentaAddProductsCard } from './AddVentaAddProductsCard';

export const VentasView = ():JSX.Element => {
  const {clientesArray} = useCustomSelector((state) => state.clientSlice);
  const {handleAddVenta, selectView, addVenta} = useCustomSelector((state) => state.ventaSlice);
  const [client, setClient] = useState<IClient | null>(null);
  const [dropdownSelect, setDropdownSelect] = useState<string>(client === null ? 'Seleccionar cliente' : `${client.name} ${client.app}`);

  const dispatch = useCustomDispatch();

  useEffect(() => {
    dispatch(GetAllVentas());
  }, []);


  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Ventas</h1>
        {
          !handleAddVenta
          ? (<Dropdown>
            <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">{dropdownSelect}</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                key={`control-dropdown-ventas`}
                onClick={
                  () => {
                    console.log(`control`);
                    setDropdownSelect('Ver todo');
                    setClient(null);
                    dispatch(setSelectClienteSearch(null));
                  }
                }
              >
                {'Ver todo'}
              </Dropdown.Item>
              {
                clientesArray.map((cliente, index) => {
                  return <Dropdown.Item
                            key={`${index}-${cliente.id}-dropdown-ventas`}
                            onClick={
                              () => {
                                console.log(`id: ${cliente.id}`);
                                setClient(cliente);
                                dispatch(setSelectClienteSearch(cliente.id));
                                setDropdownSelect(`${cliente.name} ${cliente.app}`);
                              }
                            }
                          >
                            {`${cliente.name} ${cliente.app}`}
                          </Dropdown.Item>
                })
              }
            </Dropdown.Menu>
          </Dropdown>)
          : <></>
        }
      </div>
      {
        !handleAddVenta
        ? <div className="card mb-2">
            <Button variant="outline-primary" size="lg" onClick={() => {
              dispatch(setHandleAddVenta(!handleAddVenta));
              dispatch(setSelectView("addCliente"))
            }}>
              {'Agregar nueva venta'}
            </Button>
          </div>
        // : <AddVentaCard />
        : <></>
      }
      {
        selectView === "all"
        ? <TablaVentas />
        : selectView === "infoVenta"
          ? <></>
          : selectView === "addCliente"
            ? <AddVentaClienteCard />
            : selectView === "addProducts"
              ? <AddVentaAddProductsCard />
              : <></>
      }
      {/* {
        client !== null
        ? <TablaVentasByCliente cliente={client}/>
        : client === null
          ? <TablaVentas />
          : <></>
      } */}
    </main>
  );
}
