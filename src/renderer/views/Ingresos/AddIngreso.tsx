import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux';
import { IClient } from '../../../main/interfaces';
import { InputFormSelectClientes } from '../../components/InputFormSelectClientes';
import { InputPriceCard } from '../../components/InputPriceCard';
import { useAddPago } from '../../hooks/Pagos/useAddPago';
import { IAddPago } from '../../../main/interfaces/IPagos';
import { dateToString, timeToString } from '../../utils/date';
import { InputDateCard } from '../../components/InputDateCard';
import { SetStateAction } from 'react';
import { setSelectView } from '../../redux/slice/ingresos';
import { useGetDeudaByClient } from '../../hooks/Ventas/useGetDeudaByClient';


export const AddIngreso = ():JSX.Element => {
  const [abono, setAbono] = useState<number>(0);
  const [cliente, setCliente] = useState<IClient | null>(null);
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [pago, setPago] = useState<IAddPago>({id_client: 0, monto: 0, fecha: new Date()});
  const [error, setError] = useState<string>('');
  const [inputDate, setInputDate] = useState<Date>(new Date());
  const [id, setId] = useState<number>(0);
  const { result: deuda, isSuccess: isSuccessDeuda} = useGetDeudaByClient(id);
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
    if(result !== null)
    {
      dispatch(setSelectView("all"));
    }
    if(errorsAddPago !== null)
    {
      setError(errorsAddPago.message);
    }
  }, [isSuccess, result, errorsAddPago]);

  useEffect(() => {
    if(cliente !== null)
    {
      console.log(`Se reinician`)
      setId(cliente.id);
    }
  }, [cliente, deuda, isSuccessDeuda]);



  const validateInputs = (): boolean => {
    if(cliente === null || cliente === undefined)
    {
      setError('Debe de seleccionar un cliente');
      return false;
    }
    if(inputDate === null || inputDate === undefined)
      {
        setError('Debe de seleccionar una fecha');
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
        <InputPriceCard title={'Por pagar'} value={cliente != null ? deuda : 0} onChange={() => {}} disabled={cliente === null ? true : false}/>
        <InputPriceCard title={'Abonar'} value={abono} onChange={setAbono} disabled={cliente === null ? true : false}/>
        <InputDateCard value={inputDate} onChange={setInputDate} disabled={cliente === null ? true : false} />
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
                    setPago({id_client: cliente.id, monto: abono, fecha: inputDate});
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
