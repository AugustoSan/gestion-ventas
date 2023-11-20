import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardGroup from 'react-bootstrap/CardGroup';
import { LabelInfoCard } from '../../components/LabelInfoCard';
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux';
import { DeleteClient, setSelectClient } from '../../redux/slice/clientes';
import { IClient } from '../../../main/interfaces';
import { InputCard } from '../../components/InputCard';
// import { appendLogFile } from '../../main/util';

interface IDataProps {
  cliente: IClient
}

export const UpdateClienteCard = ({ cliente } : IDataProps):JSX.Element => {
  const { selectClient } = useCustomSelector((state) => state.clientSlice);
  const [inputName = cliente.name, setInputName] = useState<string>('');
  const dispatch = useCustomDispatch();
  console.log('selectClient', selectClient);
  const {id = 0, name = '', app = '', apm = '', tel = '', direcciones = [], saldo = 0} = selectClient ?? {};
  console.log('cliente: - ', selectClient);

  return selectClient === null ? <></> : (
    <Card className="mb-2">
      <Card.Header>Información del cliente</Card.Header>
      <Card.Body>
        <InputCard title={'Nombre'} value={inputName} onChange={setInputName} />
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
      </Card.Body>
      <Card.Footer>
        <Container>
          <Row>
            <Col xs>
              <Button
                variant="danger"
                onClick={
                  () => {
                    console.log(`Button se eliminara el cliente con id ${id}`);
                    const resultConfirm = confirm('Realmente desea eliminar el cliente');
                    if(resultConfirm){
                      dispatch(DeleteClient(selectClient.id));
                    }
                  }
                }
              >
                Eliminar
              </Button>
            </Col>
            <Col xs>
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
            </Col>
            <Col xs>
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
            </Col>
          </Row>
        </Container>
      </Card.Footer>
    </Card>
  );
}
