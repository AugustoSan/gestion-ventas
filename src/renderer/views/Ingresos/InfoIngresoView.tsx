import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import { InputPriceCard } from '../../components/InputPriceCard';
import { InputCard } from '../../components/InputCard';
import { useGetClientById } from '../../hooks';
import { dateToString, timeToString } from '../../utils/date';
import { IPago } from '../../../main/interfaces/IPagos';

interface IDataProps{
  pago: IPago;
}

export const InfoIngresoView = ({pago}:IDataProps):JSX.Element => {
  const [isValid, setIsValid] = useState<boolean>(true);
  const [cliente, setCliente] = useState<string>('');
  const {id, id_cliente, fecha, monto, id_venta} = pago;
  const itemDate = new Date(fecha);
  const {result, isSuccess, error} = useGetClientById({isValid, id: id_cliente});

  useEffect(() => {
    if(isSuccess)
    {
      setIsValid(false);
    }
    if(result !== null )
    {
      setCliente(`${result.nombre} ${result.apellidopaterno} ${result.apellidomaterno}`);
    }
  },[isSuccess, result, error]);

  return error !== null
  ? (<Alert variant={'danger'}>{error.message}</Alert>)
  : (
    <>
      <InputCard
        title={'ID'}
        value={id.toString()}
        onChange={() => {}}
        disabled={true}
      />
      <InputCard
        title={'Folio Venta'}
        value={id_venta.toString()}
        onChange={() => {}}
        disabled={true}
      />
      <InputCard
        title={'Fecha'}
        value={`${dateToString(itemDate)}`}
        onChange={() => {}}
        disabled={true}
      />
      <InputCard
        title={'Hora'}
        value={`${timeToString(new Date(itemDate))}`}
        onChange={() => {}}
        disabled={true}
      />
      <InputCard
        title={'Cliente'}
        value={cliente}
        onChange={() => {}}
        disabled={true}
      />
      <InputPriceCard
        title={'Monto'}
        value={monto}
        onChange={() => {}}
        disabled={true}
      />
    </>
  );
}
