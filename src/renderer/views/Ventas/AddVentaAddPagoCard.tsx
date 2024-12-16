import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux';
import { IDataAddVenta } from '../../../main/interfaces/IVentas';
import { AddNewVenta, setAddVenta, setSelectView } from '../../redux/slice/ventas';
import { InputPriceCard } from '../../components/InputPriceCard';

export const AddVentaAddPagoCard = ():JSX.Element => {
  const {addVenta} = useCustomSelector((state) => state.ventaSlice);
  const [pagado, setPagado] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const dispatch = useCustomDispatch();

  const validateInputs = (): boolean => {
    if(addVenta === null || addVenta === undefined)
    {
      setError('No se encontro información sobre el cliente');
      return false;
    }
    const { id_client, id_direccion, fecha, total, productos } = addVenta;
    if(id_client === null)
    {
      setError('No se encontro el id del cliente');
      return false;
    }
    if(id_direccion === null)
    {
      setError('No se encontro el id de la dirección');
      return false;
    }
    if(fecha === null)
    {
      setError('No se encontro la fecha');
      return false;
    }
    if(total === 0)
    {
      setError('El total es cero');
      return false;
    }
    if(productos.length === 0)
    {
      setError('No tiene productos agregados');
      return false;
    }
    setError('');
    return true;
  }

  return addVenta !== null
  ? (
    <Card className="mb-2">
      <Card.Header>Crear nueva venta</Card.Header>
      <Card.Body>
        {
          error.length !== 0
          ? (<Alert variant={'danger'}>{error}</Alert>)
          : <></>
        }
        <InputPriceCard title={'Monto abonado'} value={pagado} onChange={setPagado} />
      </Card.Body>
      <Card.Footer>
        <Container>
          <Row>
            <Col xs={6}>
              <Button
                variant='outline-secondary'
                onClick={() => {
                  dispatch(setSelectView("all"));
                  dispatch(setAddVenta(null));
                }}
              >
                Cancelar
              </Button>
            </Col>
            <Col xs={6}>
              <Button
                variant='outline-primary'
                onClick={() => {
                  if(validateInputs()){
                    const newVenta: IDataAddVenta =
                    {
                      ...addVenta,
                      pagado: pagado
                    }
                    /* console.log('newVenta: ', newVenta); */
                    dispatch(AddNewVenta(newVenta));
                    dispatch(setSelectView('all'));
                  }
                }}
              >
                Crear venta
              </Button>
            </Col>
          </Row>
        </Container>
      </Card.Footer>
    </Card>
  )
  : <></> ;
}
