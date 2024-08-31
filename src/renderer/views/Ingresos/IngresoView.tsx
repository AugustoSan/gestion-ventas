import React, { SetStateAction } from 'react';
import { useLocation } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { InputPriceCard } from '../../components/InputPriceCard';
import { useState } from 'react';
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux';
import { DropdownClientes } from '../../components/DropdownClientes';
import { IClient } from '../../../main/interfaces';
import { useEffect } from 'react';
import { TablaPagosByCliente } from '../../components/TablaPagosByCliente';
import { TablaPagosGetAllPagos } from '../../components/TablaPagosGetAllPagos';
import { setSelectClient } from '../../redux/slice/clientes';

export const IngresoView = ():JSX.Element => {
  const {selectClient} = useCustomSelector((state) => state.clientSlice);
  const dispatch = useCustomDispatch();

  console.log('selectClient: ', selectClient);

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Abonos</h1>
        { <DropdownClientes />
        }
      </div>
      {
        selectClient === null
        ? <TablaPagosGetAllPagos />
        : <TablaPagosByCliente />
        /* selectView === "all"
        ? <TablaVentas />
        : selectView === "viewPago"
          ? <InfoVentaCard id={selectVenta ?? -1} />
          : selectView === "viewByClient"
            ? <InfoVentaCard id={selectVenta ?? -1} />
            : selectView === "add"
              ? <AddVentaClienteCard />
              : selectView === "update"
                ? <AddVentaAddProductsCard />
                : <></> */
      }
    </main>
  );
}
