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
import { setHandleUpdateClient, setSelectClient } from '../../redux/slice/clientes';
import { InputCard } from '../../components/InputCard';
// import { appendLogFile } from '../../main/util';


export const InfoClienteCard = ():JSX.Element => {
  const { selectClient, handleUpdateClient } = useCustomSelector((state) => state.clientSlice);
  const dispatch = useCustomDispatch();
  console.log('selectClient', selectClient);
  const {id = 0, name = '', app = '', apm = '', tel = '', direcciones = [], saldo = 0} = selectClient ?? {};
  const [enabledEdit, setEnabledEdit] = useState<boolean>(false);
  const [inputName, setInputName] = useState<string>(name);
  const [inputAPP, setInputAPP] = useState<string>(app);
  const [inputAPM, setInputAPM] = useState<string>(apm);
  const [inputTel, setInputTel] = useState<string>(tel);
  // const [inputName, setInputName] = useState<string>(name);
  console.log('cliente: - ', selectClient);

  return selectClient === null ? <></> : (
    <Card className="mb-2">
      <Card.Header>Información del cliente</Card.Header>
      <Card.Body>
        <InputCard title={'Nombre'} value={inputName} onChange={setInputName} disabled={!enabledEdit}/>
        <InputCard title={'Apellido Paterno'} value={inputAPP} onChange={setInputAPP} disabled={!enabledEdit}/>
        <InputCard title={'Appelido Materno'} value={inputAPM} onChange={setInputAPM} disabled={!enabledEdit}/>
        <InputCard title={'Telefono'} value={inputTel} onChange={setInputTel} disabled={!enabledEdit}/>
        {/* <LabelInfoCard title={'Nombre'} value={name} />
        <LabelInfoCard title={'Apellido Paterno'} value={app} />
        <LabelInfoCard title={'Appelido Materno'} value={apm} />
        <LabelInfoCard title={'Telefono'} value={tel} /> */}
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
                    setEnabledEdit(true);
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
