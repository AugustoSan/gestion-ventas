import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useCustomDispatch } from '../../hooks/redux';
import { AddClient, setHandleAddClient } from '../../redux/slice/clientes';
import { IDataAddClient } from '../../../main/interfaces/IClients';
import { InputCard } from '../../components/InputCard';
// import { appendLogFile } from '../../main/util';

export const AddClienteCard = ():JSX.Element => {
  const [inputName, setInputName] = useState<string>('');
  const [inputApp, setInputApp] = useState<string>('');
  const [inputApm, setInputApm] = useState<string>('');
  const [inputTelefono, setInputTelefono] = useState<string>('');
  const [arrayAddress, setarrayAddress] = useState<Array<string>>([]);
  const [inputAddress, setInputAddress] = useState<string>('');
  const [error, setError] = useState<string>('');
  const dispatch = useCustomDispatch();
  const [flagAddress, setFlagAddress] = useState<boolean>(false);

  const validateInputs = (): boolean => {
    if(inputName.length <= 2) {
      setError('Por favor introduce un nombre.');
      return false;
    }
    if(inputApp.length <= 2) {
      setError('Por favor introduce un apellido paterno.');
      return false;
    }
    // if(arrayAddress.length <= 2) {
    //   setError('Por favor introduce una dirección.');
    //   return false;
    // }
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
        <InputCard
          title={'Dirección'}
          value={inputAddress}
          onChange={setInputAddress}
        />
        <div className="d-grid gap-2 mb-2 mt-2">
          <Button variant="primary" size="lg" onClick={() => {
            if(inputAddress.length > 2){
              setarrayAddress([inputAddress, ...arrayAddress]);
              setInputAddress('');
            }
          }}>
            Agregar dirección
          </Button>
        </div>
        <div className="d-grid gap-2 mb-2 mt-2">
          <ListGroup>
            {
              arrayAddress.map((address, index) => {
                    return <ListGroup.Item 
                              key={`${index}-item-list-address`}
                              as='li'
                              className='d-flex justify-content-between align-items-start'
                            >
                              <div className='ms-2 me-auto'>
                                {address}
                              </div>
                              <Badge bg='danger' onClick={() => {
                                const newArray = arrayAddress.filter((add, i) => add != address && i != index);
                                setarrayAddress(newArray);
                              }} pill>
                                x
                              </Badge>
                            </ListGroup.Item>
                  })
            }
            {/* <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
            <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item> */}
          </ListGroup>
        </div>
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
                      nombre: inputName,
                      apellidopaterno: inputApp,
                      apellidomaterno: inputApm,
                      telefono: inputTelefono,
                      direccioness: arrayAddress
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
