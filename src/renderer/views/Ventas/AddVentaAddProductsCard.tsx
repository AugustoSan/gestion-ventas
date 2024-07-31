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
import { AddVenta, setAddVenta, setSelectView } from '../../redux/slice/ventas';
import { InputProductItem } from '../../components/InputProductItem';
import { TablaProductosAddVenta } from './TablaProductosAddVenta';

export const AddVentaAddProductsCard = ():JSX.Element => {
  const {productosArray} = useCustomSelector((state) => state.productSlice);
  const {selectClient, addVenta} = useCustomSelector((state) => state.ventaSlice);

  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  const [product, setProduct] = useState<IProducto | null>(null);
  const [inputDate, setInputDate] = useState<Date>(new Date(Date.now()));
  const [total, setTotal] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const dispatch = useCustomDispatch();

  const validateInputs = (): boolean => {
    setError('');
    return true;
  }

  console.log('isEnabled: ', isEnabled);
  console.log('producto: ', product);


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
                    const {id_client, id_direccion, fecha, productos, total: totalAddVenta, pagado } = addVenta;
                    if(id_client !== null && id_direccion !== null  && fecha !== null && total > 0 && productos.length > 0){
                      console.log('Se va a guardar el nuevo producto');
                      dispatch(AddVenta(addVenta));
                      dispatch(setSelectView('all'))
                    }
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
