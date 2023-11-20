import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux';
import { DeleteClient, UpdateClient, setHandleUpdateClient, setHandleWatchAddress, setSelectClient } from '../../redux/slice/clientes';
import { InputCard } from '../../components/InputCard';
import { IDataUpdateClient } from '../../../main/interfaces/IClients';
// import { appendLogFile } from '../../main/util';


export const InfoClienteAddressCard = ():JSX.Element => {
  const { selectClient, handleUpdateClient } = useCustomSelector((state) => state.clientSlice);
  const dispatch = useCustomDispatch();
  console.log('selectClient', selectClient);
  const {id = 0, name = '', app = '', apm = '', tel = '', direcciones = [], saldo = 0} = selectClient ?? {};
  const [inputName, setInputName] = useState<string>(name ?? '');
  const [inputAPP, setInputAPP] = useState<string>(app ?? '');
  const [inputAPM, setInputAPM] = useState<string>(apm ?? '');
  const [inputTel, setInputTel] = useState<string>(tel ?? '');
  const [error, setError] = useState<string | null>(null);
  console.log('cliente: - ', selectClient);

  const validateInputs = ():boolean => {
    if(inputName.length <= 2){
      setError('El nombre debe de tener al menos dos caractéres');
      return false;
    }
    if(inputAPP.length <= 2){
      setError('El apellido paerno debe de tener al menos dos caractéres');
      return false;
    }
    setError(null);
    return true;
  }

  return selectClient === null ? <></> : (
    <Card className="mb-2">
      <Card.Header>{`Direcciones del cliente ${name} ${apm}`}</Card.Header>
      <Card.Body>
        {
          direcciones.length === 0
          ? <Alert variant='primary'> Sin direcciones registradas </Alert>
          : direcciones.map((direccion, index) => {
            return <InputCard
              key={`${direccion.id}-${direccion.idClient}-dir`}
              title={`Dirección ${index+1}`}
              value={direccion.direccion}
              onChange={() => {}}
              disabled={true}
            />
          })
        }
        {
          error !== null
          ? <Alert variant='danger'>{error}</Alert>
          : <></>
        }
      </Card.Body>
      <Card.Footer>
        <Container>
          <Row>
            <Col xs={4}>
              <Button
                variant="danger"
                onClick={
                  () => {
                    console.log(`Button se eliminara el cliente con id ${id}`);
                    dispatch(DeleteClient(selectClient.id));
                  }
                }
              >
                Eliminar
              </Button>
            </Col>
            <Col xs={4}>
              <Button
                variant="secondary"
                onClick={
                  () => {
                    dispatch(setHandleWatchAddress(false));
                  }
                }
                >
                Regresar
              </Button>
            </Col>
            <Col xs={4}>
              <Button
                variant="primary"
                onClick={
                  () => {
                    console.log(`se ${handleUpdateClient === true ? 'guardará' : 'editará'} el cliente con id ${id}`);
                    dispatch(setHandleUpdateClient(true));
                    if(!validateInputs()) return;
                    if(handleUpdateClient){
                      const temp:IDataUpdateClient = {
                        id: selectClient.id,
                        client: {
                          name: inputName,
                          app: inputAPP,
                          apm: inputAPM,
                          tel: inputTel
                        }
                      }
                      dispatch(UpdateClient(temp));
                    }
                  }
                }
                >
                { handleUpdateClient === true ? 'Guardar' : 'Editar' }
              </Button>
            </Col>
          </Row>
        </Container>
      </Card.Footer>
    </Card>
  );
}
