import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { LabelInfoCard } from '../../components/LabelInfoCard';
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux';
import { setSelectClient } from '../../redux/slice/clientes';
// import { appendLogFile } from '../../main/util';


export const InfoClienteCard = ():JSX.Element => {
  const { selectClient } = useCustomSelector((state) => state.clientSlice);
  const dispatch = useCustomDispatch();
  console.log('selectClient', selectClient);
  const {id = 0, nombre = '', app = '', apm = '', telefono = '', direcciones = [], saldo = 0} = selectClient ?? {};
  console.log('cliente: - ', selectClient);

  return (
    <CardGroup>
      <Card>
        <Card.Body>
          <LabelInfoCard title={'Nombre'} value={nombre} />
          <LabelInfoCard title={'Apellido Paterno'} value={app} />
          <LabelInfoCard title={'Appelido Materno'} value={apm} />
          <LabelInfoCard title={'Telefono'} value={telefono} />
          <LabelInfoCard title={'Saldo'} value={saldo.toString()} />
          {
            direcciones.map((direccion) => {
              return <LabelInfoCard key={`${direccion.id}-${direccion.idClient}-dir`} title={direccion.id.toString()} value={direccion.direccion} />
            })
          }
          <Button
              variant='primary'
              className='col-3 m-1'
              disabled={selectClient === null ? true : false}
              onClick={
                () => {
                  console.log(`se editara el cliente con id ${id}`);
                }
              }
            >
              Editar
            </Button>
            <Button
              variant="danger"
              className="col-3 m-1"
              disabled={selectClient === null ? true : false}
              onClick={
                () => {
                  console.log(`Button se eliminara el cliente con id ${id}`);
                }
              }
            >
              Eliminar
            </Button>
            <Button
              variant='primary'
              className='col-3 m-1'
              disabled={selectClient === null ? true : false}
              onClick={
                () => {
                  console.log(`se deseleccionara el cliente con id ${id}`);
                  dispatch(setSelectClient(null));
                }
              }
            >
              Deseleccionar
            </Button>
        </Card.Body>
      </Card>
    </CardGroup>
  );
}
