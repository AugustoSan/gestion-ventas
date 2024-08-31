import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useGetAllPagosByVenta } from '../hooks';
import { TablaPagos } from './TablaPagos';

interface IDataProps{
  idVenta: number;
}

export const TablaPagosByVenta = ({idVenta}: IDataProps):JSX.Element => {
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const {
    result,
    isLoading,
    isSuccess,
    error,
    status
  } = useGetAllPagosByVenta({isValid: isEnabled, id: idVenta ?? 0});

  useEffect(() => {
    if(result !== null || isSuccess)
    {
      setIsEnabled(false);
    }
  }, [isSuccess, result]);



  return (
      <TablaPagos arrayPagos={result}/>
  );
}
