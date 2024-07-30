import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import './../public/css/dashboard.css'
import './../public/css/dashboard.rtl.css'
import { Graphic } from '../components/Graphic';
import { Tabla } from '../components/Tabla';
import { graphicDataIngresos, graphicDataPedidos, graphicLabelsDays } from '../utils/graphics';
import { useCustomDispatch, useCustomSelector } from '../hooks/redux';
import { GetAllClients } from '../redux/slice/clientes';
import { IClient } from '../../main/interfaces';
import { GetAllVentas, setSelectClienteSearch } from '../redux/slice/ventas';
import { GetAllProducts } from '../redux/slice/productos';
import { TablaVentas } from './Ventas/TablaVentas';

export const HomeView = ():JSX.Element => {
  const {clientesArray} = useCustomSelector((state) => state.clientSlice);
  const {pagination} = useCustomSelector((state) => state.productSlice);
  const [clientSelected, setClientSelected] = useState<IClient | null>(null);
  const [dropdownSelect, setDropdownSelect] = useState<string>('Seleccionar cliente');
  const dispatch = useCustomDispatch();
  useEffect(() => {
    dispatch(GetAllClients());
    // dispatch(GetAllVentas());
    // dispatch(GetAllProducts(pagination.currentPage, pagination.sizePage));
    dispatch(setSelectClienteSearch(null));
  }, []);
  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Dashboard</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          {/* <div className="btn-group me-2">
            <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
            <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
          </div> */}
          <Dropdown>
            <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
              { dropdownSelect }
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                  key={`control-dropdown-ventas`}
                  onClick={
                    () => {
                      console.log(`control`);
                      setDropdownSelect('Ver todo');
                      dispatch(setSelectClienteSearch(null));
                    }
                  }
                >
                  {'Ver todo'}
              </Dropdown.Item>
              {
                clientesArray.map((cliente, index) => {
                  return (<Dropdown.Item key={`${cliente.id}-${index}-dropdown-dashboard`} onClick={() => {
                    console.log('Se selecciono el cliente ', cliente.nombre);
                    setDropdownSelect(`${cliente.nombre} ${cliente.apellidopaterno}`);
                    dispatch(setSelectClienteSearch(cliente.id));
                  }}>{`${cliente.nombre} ${cliente.apellidopaterno}`}</Dropdown.Item>);
                })
              }
            </Dropdown.Menu>
          </Dropdown>
          {/* <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-1">
            <svg className="bi"><use href="#calendar3"/></svg>
            Seleccionar cliente
          </button> */}
        </div>
      </div>

      <Graphic dataIngresos={graphicDataIngresos} dataPedidos={graphicDataPedidos} labels={graphicLabelsDays}/>
      <TablaVentas />

    </main>
  );
}
