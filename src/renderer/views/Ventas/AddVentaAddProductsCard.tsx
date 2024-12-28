import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Dropdown from 'react-bootstrap/Dropdown';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux';
import { IProducto } from '../../../main/interfaces';
import { IDataAddVenta } from '../../../main/interfaces/IVentas';
import { AddNewVenta, setAddVenta, setSelectView } from '../../redux/slice/ventas';
import { InputProductItem } from '../../components/InputProductItem';
import { TablaProductosAddVenta } from './TablaProductosAddVenta';

export const AddVentaAddProductsCard = ():JSX.Element => {
  const {selectClient, addVenta, selectProductos, totalAddVenta} = useCustomSelector((state) => state.ventaSlice);
  const [product, setProduct] = useState<IProducto | null>(null);
  const [error, setError] = useState<string>('');
  const dispatch = useCustomDispatch();

  const validateInputs = (): boolean => {
    if(addVenta === null)
    {
      setError('No se encontro información sobre el cliente');
      return false;
    }
    if(addVenta.id_client === null)
    {
      setError('No se encontro el id del cliente');
      return false;
    }
    if(addVenta.id_direccion === null)
    {
      setError('No se encontro el id de la dirección');
      return false;
    }
    if(addVenta.fecha === null)
    {
      setError('No se encontro la fecha');
      return false;
    }
    if(addVenta.total > 0)
    {
      setError('El total es cero');
      return false;
    }
    if(selectProductos.length === 0)
    {
      setError('No tiene productos agregados');
      return false;
    }
    setError('');
    return true;
  }


  return addVenta !== null && selectClient !== null
  ? (
    <Card className="mb-2">
      <Card.Header>Crear nueva venta</Card.Header>
      <Card.Body>
        {/* Aqui va la info del cliente */}
        <InputProductItem producto={product} cliente={selectClient} onChangeProduct={setProduct}/>
        {
          error.length !== 0
          ? (<Alert variant={'danger'}>{error}</Alert>)
          : <></>
        }
        <TablaProductosAddVenta />
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
                    /* console.log('Se va a guardar el nuevo producto'); */
                    const newVenta: IDataAddVenta =
                    {
                      ...addVenta,
                      total: totalAddVenta,
                      productos: selectProductos
                    }
                    console.log(newVenta);
                    /* console.log('newVenta: ', newVenta); */
                    dispatch(setAddVenta(newVenta));
                    // dispatch(AddNewVenta(newVenta));
                    dispatch(setSelectView('addPago'));
                  }
                }}
              >
                Pagar
              </Button>
            </Col>
          </Row>
        </Container>
      </Card.Footer>
    </Card>
  )
  : <></> ;
}
