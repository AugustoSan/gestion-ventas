import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux';
import { IClient, IDirection, IProducto } from '../../../main/interfaces';
import { setAddAddressInAddVenta, setAddClienteInAddVenta, setAddDateInAddVenta, setAddVenta, setHandleAddVenta, setSelectView } from '../../redux/slice/ventas';
import { InputFormSelectClientes } from '../../components/InputFormSelectClientes';
import { InputFormSelectAddress } from '../../components/InputFormSelectAddress';
import { InputDateCard } from '../../components/InputDateCard';
import { IDataAddVenta } from '../../../main/interfaces/IVentas';
import { formatDate } from '../../utils/date';
// import { appendLogFile } from '../../main/util';

export const AddVentaClienteCard = ():JSX.Element => {
  const [cliente, setCliente] = useState<IClient | null>(null);
  const [address, setAddress] = useState<IDirection | null>(null);
  const [inputDate, setInputDate] = useState<Date>(new Date());
  const [error, setError] = useState<string>('');
  const dispatch = useCustomDispatch();

  useEffect(() => {
    dispatch(setAddClienteInAddVenta(cliente));
    if(cliente !== null && cliente.direcciones.length > 0) {
      setAddress(cliente.direcciones[0]);
      dispatch(setAddAddressInAddVenta(cliente.direcciones[0]));
    }
    else dispatch(setAddAddressInAddVenta(address));

    dispatch(setAddDateInAddVenta(formatDate(inputDate)));
  }, [cliente, address, inputDate]);


  const validate = (): boolean => {

    if(cliente === null ){
      setError('Por favor seleccione un cliente');
      return false;
    }
    if(cliente != null && cliente.direcciones.length === 0 ){
      setError('El cliente no tiene ninguna direccion registrada. Registre una para continuar');
      return false;
    }
    if(cliente != null && cliente.direcciones.length > 0 && address === null ){
      setError('Por favor seleccione una dirección');
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
        <InputFormSelectClientes  onChange={setCliente}/>
        <InputFormSelectAddress cliente={cliente}  onChange={setAddress} />
        <InputDateCard value={inputDate} onChange={setInputDate} disabled={cliente === null ? true : false} />

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
                  if(validate()){
                    if(cliente !== null && address !== null){
                      const newVenta:IDataAddVenta = {
                        id_client: cliente.id,
                        id_direccion: address.id,
                        fecha: formatDate(inputDate),
                        total: 0,
                        pagado: 0,
                        productos: []
                      };
                      /* console.log('newVenta', newVenta); */

                      dispatch(setAddVenta(newVenta));
                      dispatch(setSelectView("addProducts"));
                      /* console.log('Se procedera con el proceso de agregar una nueva venta.') */
                    }
                    else{
                      dispatch(setAddVenta(null));
                    }
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
