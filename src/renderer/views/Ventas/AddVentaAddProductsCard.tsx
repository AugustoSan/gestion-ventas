import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Dropdown from 'react-bootstrap/Dropdown';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux';
import { InputCard } from '../../components/InputCard';
import { AddProduct, setHandleAddProduct } from '../../redux/slice/productos';
import { IDataAddProduct } from '../../../main/interfaces/IProducts';
import { InputPriceCard } from '../../components/InputPriceCard';
import { IClient, IDirection, IProducto } from '../../../main/interfaces';
import { IDataAddVenta } from '../../../main/interfaces/IVentas';
import { AddVenta, setHandleAddVenta, setSelectView } from '../../redux/slice/ventas';
import { InputFormSelectClientes } from '../../components/InputFormSelectClientes';
import { InputFormSelectAddress } from '../../components/InputFormSelectAddress';
import { InputDateCard } from '../../components/InputDateCard';
import { InputProductItem } from '../../components/InputProductItem';
import { TablaProductosAddVenta } from './TablaProductosAddVenta';
import { InputFormSelectProduct } from '../../components/InputFormSelectProduct';

export const AddVentaAddProductsCard = ():JSX.Element => {
  const {productosArray} = useCustomSelector((state) => state.productSlice);
  const {selectClient, selectAddress, selectFecha, selectProductos, totalAddVenta} = useCustomSelector((state) => state.ventaSlice);

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


  return selectClient === null ? <></>
  : (
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
                    if(selectAddress !== null && selectFecha !== null && totalAddVenta > 0 && selectProductos.length > 0){
                      console.log('Se va a guardar el nuevo producto');
                      const newVenta:IDataAddVenta = {
                        client: selectClient,
                        direccion: selectAddress,
                        fecha: selectFecha,
                        total: totalAddVenta,
                        por_pagar: totalAddVenta,
                        status: 0,
                        productos: selectProductos
                      };

                      dispatch(AddVenta(newVenta));
                      dispatch(setSelectView('all'))
                    }
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
