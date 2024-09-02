import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux';
import { IClient } from '../../../main/interfaces';
import { GetAllVentas, setHandleAddVenta, setSelectClienteSearch, setSelectView } from '../../redux/slice/ventas';
import { InputFormSelectClientes } from '../../components/InputFormSelectClientes';
import { InputPriceCard } from '../../components/InputPriceCard';
import { useAddPago } from '../../hooks/Pagos/useAddPago';
import { IAddPago } from '../../../main/interfaces/IPagos';
import { dateToString, timeToString } from '../../utils/date';


export const AddIngreso = ():JSX.Element => {
  const [abono, setAbono] = useState<number>(0);
  const [cliente, setCliente] = useState<IClient | null>(null);
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [pago, setPago] = useState<IAddPago>({id_client: 0, monto: 0});
  const [error, setError] = useState<string>('');
  const { result, isSuccess, error: errorsAddPago } = useAddPago({isValid: isEnabled, pago});

  const dispatch = useCustomDispatch();

  useEffect(() => {
    if(pago.id_client !== 0 && pago.monto > 0){
      setIsEnabled(true);
    }
  }, [pago]);

  useEffect(() => {
    if(isSuccess){
      setIsEnabled(false);
    }
  }, [isSuccess]);


  const validateInputs = (): boolean => {
    if(cliente === null || cliente === undefined)
    {
      setError('Debe de seleccionar un cliente');
      return false;
    }
    if(abono === 0)
    {
      setError('El abono debe de ser mayor a cero');
      return false;
    }
    setError('');
    return true;
  }

  console.log('result: ', result);

  return (
    <Card className="mb-2">
      <Card.Header>Crear nuevo abono</Card.Header>
      <Card.Body>
        {
          error.length !== 0
          ? (<Alert variant={'danger'}>{error}</Alert>)
          : <></>
        }
        <InputFormSelectClientes  onChange={setCliente}/>
        <InputPriceCard title={'Abonar'} value={abono} onChange={setAbono} />
      </Card.Body>
      <Card.Footer>
        <Container>
          <Row>
            <Col xs={6}>
              <Button
                variant='outline-secondary'
                onClick={() => {
                  dispatch(setSelectView("all"));
                }}
              >
                Cancelar
              </Button>
            </Col>
            <Col xs={6}>
             <Button
                variant='outline-primary'
                onClick={() => {
                  if(validateInputs() && cliente !== null){
                    setPago({id_client: cliente.id, monto: abono});
                    // const date = new Date(); // Obtén la fecha y hora actuales en UTC
                    // console.log('date', date);
                    // const utcDateString = date.toISOString(); // Convierte a formato ISO
                    // console.log('utcDateString', utcDateString);
                    // console.log('utcDateString', date.toUTCString());
                    // console.log('timeToString',timeToString(new Date('2024-09-02 07:48:33.597')));
                    // dispatch(setSelectView('all'));
                  }
                }}
              >
                Abonar
              </Button>
            </Col>
          </Row>
        </Container>
      </Card.Footer>
    </Card>
  );
}
