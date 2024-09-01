import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useGetAllPagosByClient } from '../hooks';
import { ItemPagoTabla } from './ItemPagoTabla';
import { TablaPagos } from './TablaPagos';
import { IClient } from '../../main/interfaces';
import { useCustomSelector } from '../hooks/redux';

export const TablaPagosByCliente = ():JSX.Element => {
  const {selectClient} = useCustomSelector((state) => state.clientSlice);
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const {
    result,
    isLoading,
    isSuccess,
    error,
    status
  } = useGetAllPagosByClient({isValid: isEnabled, id: selectClient === null ? -1 : selectClient.id});

  useEffect(() => {
    if(result !== null || isSuccess)
    {
      setIsEnabled(false);
    }
  }, [isSuccess, result]);

  useEffect(() => {
    console.log('se modifico el estado de selectClient')
    setIsEnabled(true);
  }, [selectClient]);

  console.log(`TablaPagosByCliente id:`, selectClient);

  return (
      <TablaPagos arrayPagos={result}/>
  );
}
