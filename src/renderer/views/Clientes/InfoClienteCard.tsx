import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { LabelInfoCard } from '../../components/LabelInfoCard';
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux';
import { setSelectClient } from '../../redux/slice/clientes';
// import { appendLogFile } from '../../main/util';


export const InfoClienteCard = ():JSX.Element => {
  const { selectClient, handleSelectClient } = useCustomSelector((state) => state.clientSlice);
  const dispatch = useCustomDispatch();
  console.log('selectClient', selectClient);
  const {id = 0, name = '', app = '', apm = '', tel = '', direcciones = [], saldo = 0} = selectClient ?? {};
  console.log('cliente: - ', selectClient);

  return handleSelectClient === false ? <></> : (
    <div
    className="modal show"
    style={{ display: 'block', position: 'initial' }}
  >
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>Información del cliente</Modal.Title>
      </Modal.Header>

      <Modal.Body>
            <LabelInfoCard title={'Nombre'} value={name} />
            <LabelInfoCard title={'Apellido Paterno'} value={app} />
            <LabelInfoCard title={'Appelido Materno'} value={apm} />
            <LabelInfoCard title={'Telefono'} value={tel} />
            <LabelInfoCard title={'Saldo'} value={saldo.toString()} />
            {
              direcciones.map((direccion) => {
                return <LabelInfoCard key={`${direccion.id}-${direccion.idClient}-dir`} title={direccion.id.toString()} value={direccion.direccion} />
              })
            }
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="danger"
          onClick={
            () => {
              console.log(`Button se eliminara el cliente con id ${id}`);
            }
          }
        >
          Eliminar
        </Button>
        <Button
          variant="secondary"
          onClick={
            () => {
              dispatch(setSelectClient(null))
            }
          }
        >
          Cerrar
        </Button>
        <Button
          variant="primary"
          onClick={
            () => {
              console.log(`se editara el cliente con id ${id}`);
            }
          }
        >
          Editar
        </Button>
      </Modal.Footer>
    </Modal.Dialog>
  </div>
  );
}
