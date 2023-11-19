import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { LabelInfoCard } from '../../components/LabelInfoCard';
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux';
import { AddClient, setCliente, setHandleAddClient } from '../../redux/slice/clientes';
import { IDataAddClient } from '../../../main/interfaces/IClients';
import { InputCard } from '../../components/InputCard';
// import { appendLogFile } from '../../main/util';

export const AddClienteCard = ():JSX.Element => {
  const { handleAddClient } = useCustomSelector((state) => state.clientSlice);
  const [inputName, setInputName] = useState<string>('');
  const [inputApp, setInputApp] = useState<string>('');
  const [inputApm, setInputApm] = useState<string>('');
  const [inputTelefono, setInputTelefono] = useState<string>('');
  const [error, setError] = useState<string>('');
  const dispatch = useCustomDispatch();

  const validateInputs = (): boolean => {
    if(inputName.length <= 2) {
      setError('Por favor introduce un nombre.');
      return false;
    }
    if(inputApp.length <= 2) {
      setError('Por favor introduce un apellido paterno.');
      return false;
    }
    setError('');
    return true;
  }

  return (
    <Card className="mb-2">
      <Card.Header>Crear nuevo cliente</Card.Header>
      <Card.Body>
        <InputCard
          title={'Nombre'}
          value={inputName}
          onChange={setInputName}
        />
        <InputCard
          title={'Apellido Paterno'}
          value={inputApp}
          onChange={setInputApp}
        />
        <InputCard
          title={'Apellido Materno'}
          value={inputApm}
          onChange={setInputApm}
        />
        <InputCard
          title={'Teléfono'}
          value={inputTelefono}
          onChange={setInputTelefono}
        />
        {
          error.length !== 0
          ? (<Alert variant={'danger'}>{error}</Alert>)
          : <></>
        }
      </Card.Body>
      <Card.Footer>
        <Container>
          <Row>
            <Col xs={6}>
              <Button
                variant='outline-secondary'
                onClick={() => dispatch(setHandleAddClient(false))}
              >
                Cancelar
              </Button>
            </Col>
            <Col xs={6}>
              <Button
                variant='outline-primary'
                onClick={() => {
                  if(validateInputs()){
                    console.log('Se va a guardar el nuevo cliente');
                    const newClient: IDataAddClient = {
                      name: inputName,
                      app: inputApp,
                      apm: inputApm,
                      tel: inputTelefono
                    }
                    dispatch(AddClient(newClient));
                  }
                }}
              >
                Guardar
              </Button>
            </Col>
          </Row>
        </Container>
      </Card.Footer>
    </Card>
  );
}
