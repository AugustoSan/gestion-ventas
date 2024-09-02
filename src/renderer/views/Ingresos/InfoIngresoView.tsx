import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useLocation, useParams } from 'react-router-dom';
import { InputPriceCard } from '../../components/InputPriceCard';
import { InputCard } from '../../components/InputCard';
import { useFindPagoById } from '../../hooks';
import { Loading } from '../../components/Loading';
import { numberToPrice } from '../../utils/price';
import { dateToString, timeToString } from '../../utils/date';
import { IPago } from '../../../main/interfaces/IPagos';

interface IDataProps{
  pago: IPago;
}

export const InfoIngresoView = ({pago}:IDataProps):JSX.Element => {
  const {id, id_cliente, fecha, monto} = pago;
  const itemDate = new Date(fecha);

  return (
    <>
      <InputCard
        title={'ID'}
        value={id.toString()}
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
        value={id_cliente.toString()}
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
