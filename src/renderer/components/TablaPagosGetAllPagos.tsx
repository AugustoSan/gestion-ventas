import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useGetAllPagos } from '../hooks';
import { TablaPagos } from './TablaPagos';
import { IClient } from '../../main/interfaces';

export const TablaPagosGetAllPagos = ():JSX.Element => {
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const {
    result,
    isLoading,
    isSuccess,
    error,
    status
  } = useGetAllPagos(isEnabled);

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
