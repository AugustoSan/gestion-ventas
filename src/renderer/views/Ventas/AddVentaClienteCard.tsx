import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux';
import { IClient, IDirection, IProducto } from '../../../main/interfaces';
import { setHandleAddVenta } from '../../redux/slice/ventas';
import { InputFormSelectClientes } from '../../components/InputFormSelectClientes';
import { InputFormSelectAddress } from '../../components/InputFormSelectAddress';
import { InputDateCard } from '../../components/InputDateCard';
// import { appendLogFile } from '../../main/util';

export const AddVentaClienteCard = ():JSX.Element => {
  const [cliente, setCliente] = useState<IClient>({
    id: 0,
    name: "",
    app: "",
    apm: "",
    saldo: 0,
    tel: "",
    direcciones: [],
  });
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [address, setAddress] = useState<IDirection>({
    id: 0,
    id_client: 0,
    direccion: "",
  });
  const [inputDate, setInputDate] = useState<Date>(new Date(Date.now()));
  const [error, setError] = useState<string>('');
  const dispatch = useCustomDispatch();

  useEffect(() => {
    if(cliente.direcciones.length > 0){
      setAddress(cliente.direcciones[0]);
      setError('');
    }
    else{
      setError('Debe de registrar una dirección para continuar');
      setAddress({
        id: 0,
        id_client: 0,
        direccion: "",
      });
    }
  }, [cliente])


  const validate = (): boolean => {

    if(cliente.id === 0 && cliente.name.length <= 2 ){
      setError('Por favor seleccione un cliente');
      return false;
    }
    if(address.id === 0 && address.direccion.length <= 2 ){
      if(cliente.direcciones.length === 0) setError('Debe de registrar una dirección para continuar');
      else setError('Por favor seleccione una dirección');
      return false;
    }
    if(inputDate === null || inputDate === undefined ){
      setError('Por favor seleccione la fecha de venta');
      return false;
    }
    setError('');
    return true;
  }

  return (
    <Card className="mb-2">
      <Card.Header>Crear nueva venta</Card.Header>
      <Card.Body>
        <InputFormSelectClientes  onChange={setCliente} isEnabled={setIsEnabled}/>
        <InputFormSelectAddress cliente={cliente}  onChange={setAddress} isEnabled={!isEnabled}/>
        <InputDateCard value={inputDate} onChange={setInputDate} disabled={!isEnabled} />

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
                onClick={() => dispatch(setHandleAddVenta(false))}
              >
                Cancelar
              </Button>
            </Col>
            <Col xs={6}>
             <Button
                variant='outline-primary'
                onClick={() => {
                  if(validate()){
                    console.log('Se procedera con el proceso de agregar una nueva venta.')
                  }
                }}
              >
                Siguiente
              </Button>
            </Col>
          </Row>
        </Container>
      </Card.Footer>
    </Card>
  );
}
