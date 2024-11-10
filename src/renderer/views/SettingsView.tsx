import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import './../public/css/dashboard.css'
import './../public/css/dashboard.rtl.css'
import { Graphic } from '../components/Graphic';
import { graphicDataIngresos, graphicDataPedidos, graphicLabelsDays } from '../utils/graphics';
import { useCustomDispatch, useCustomSelector } from '../hooks/redux';
import { GetAllClients } from '../redux/slice/clientes';
import { IClient } from '../../main/interfaces';
import { setSelectClienteSearch } from '../redux/slice/ventas';
import { GetAllProducts } from '../redux/slice/productos';
import { TablaVentas } from './Ventas/TablaVentas';
import { useGetConfig } from '../hooks/Settings/useGetConfig';
import { Typography } from '@mui/material';
import { Loading } from '../components/Loading';

export const SettingsView = ():JSX.Element => {
  const [enabled, setEnabled] = useState<boolean>(true);
  const {result, isSuccess, isLoading, error} = useGetConfig(enabled);
  const dispatch = useCustomDispatch();
  useEffect(() => {
    if(isSuccess) setEnabled(false);
  }, [isSuccess]);
  return isLoading ? <Loading /> : (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Configuración</h1>
      </div>
      {
        result == null
          ? null
          : (
            <>
              <Typography>Host: {result.host}</Typography>
              <Typography>Puerto: {result.port}</Typography>
              <Typography>Base de datos: {result.database}</Typography>
              <Typography>Usuario: {result.user}</Typography>
            </>
          )
      }
    </>
  );
}
