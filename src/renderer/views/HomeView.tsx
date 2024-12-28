import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import './../public/css/dashboard.css'
import './../public/css/dashboard.rtl.css'
import { Graphic } from '../components/Graphic';
import { useCustomDispatch, useCustomSelector } from '../hooks/redux';
import { GetAllClients } from '../redux/slice/clientes';
import { setSelectClienteSearch } from '../redux/slice/ventas';
import { TablaVentas } from './Ventas/TablaVentas';
import { useGetPagosForGraphic } from '../hooks/Pagos/useGetPagosForGraphic';
import { getDate } from '../utils/date';
import { useGetGraphics } from '../hooks/Graphics';

export const HomeView = ():JSX.Element => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const [listPagos, setListPagos] = useState<Array<number>>([]);
  const [labelsPagos, setLabelsPagos] = useState<Array<string>>([]);
  const [labelsVentas, setLabelsVentas] = useState<Array<string>>([]);
  const [listVentas, setListVentas] = useState<Array<number>>([]);
  const [labelsProducts, setLabelsProducts] = useState<Array<string>>([]);
  const [listProducts, setListProducts] = useState<Array<number>>([]);
  const {clientesArray, pagination: paginationClient} = useCustomSelector((state) => state.clientSlice);
  const { selectClientSearchVentas } = useCustomSelector((state) => state.ventaSlice)
  const [dropdownSelect, setDropdownSelect] = useState<string>('Seleccionar cliente');
  const dispatch = useCustomDispatch();
  const {result, isLoading, isSuccess, error } = useGetGraphics({isValid: isEnabled, from: new Date('1995-12-17T03:24:00'), to: new Date(Date.now()), id_client: id, estatus: 3});


  useEffect(() => {
    dispatch(GetAllClients(paginationClient.currentPage, paginationClient.sizePage));
    // dispatch(GetAllVentas());
    // dispatch(GetAllProducts(pagination.currentPage, pagination.sizePage));
    dispatch(setSelectClienteSearch(null));
  }, []);

  useEffect(() => {
    if(result != null)
    {
      const newListPagos = result.pagos.map((pago) => pago.monto);
      setListPagos(newListPagos);
      const newListLabelsPagos = result.pagos.map((pago) => getDate(new Date(pago.fecha)));
      setLabelsPagos(newListLabelsPagos);

      const newListVentas = result.ventas.map((venta) => venta.total);
      setListVentas(newListVentas);
      const newListLabelsVentas = result.ventas.map((venta) => getDate(new Date(venta.fecha)));
      setLabelsVentas(newListLabelsVentas);

      const newListProducts = result.productos.map((prod) => prod.cantidad);
      setListProducts(newListProducts);
      const newListLabelsProducts = result.productos.map((prod) => prod.name);
      setLabelsProducts(newListLabelsProducts);
    }
    // if(resultVentas != null)
    //   {
    //     const newListVentas= resultVentas.map((venta) => venta.);
    //     setListVentas(newListVentas);
    //   }
  }, [result]);


  useEffect(() => {
    if(isLoading)
    {
      setIsEnabled(false);
    }
  }, [isLoading, isSuccess]);

  useEffect(() => {
    if(selectClientSearchVentas === null)
    {
      setId(0);
      setIsEnabled(true);
    }
    else {
      setId(selectClientSearchVentas);
      setIsEnabled(true);
    }
  }, [selectClientSearchVentas]);

  console.log('result: ',result);

  return (
    <>
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
                      /* console.log(`control`); */
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
                    /* console.log('Se selecciono el cliente ', cliente.nombre); */
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

      <Graphic title='Ventas' data={listVentas} labels={labelsVentas} type='line' color='rgb(33, 154, 12)'/>
      <Graphic title='Pagos' data={listPagos} labels={labelsPagos} type='line' />
      <Graphic title='Productos' data={listProducts} labels={labelsProducts} type='bar' />
      {/* <TablaVentas /> */}

    </>
  );
}
