import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Dropdown from 'react-bootstrap/Dropdown';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import InputGroup from 'react-bootstrap/InputGroup';
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux';
import { InputCard } from '../../components/InputCard';
import { AddProduct, setHandleAddProduct } from '../../redux/slice/productos';
import { IDataAddProduct } from '../../../main/interfaces/IProducts';
import { InputPriceCard } from '../../components/InputPriceCard';
import { IClient, IDirection, IProducto } from '../../../main/interfaces';
import { IDataAddVenta } from '../../../main/interfaces/IVentas';
import { setHandleAddVenta } from '../../redux/slice/ventas';
import { InputFormSelectClientes } from '../../components/InputFormSelectClientes';
import { InputFormSelectAddress } from '../../components/InputFormSelectAddress';
import { InputDateCard } from '../../components/InputDateCard';
import { InputProductItem } from '../../components/InputProductItem';
import { TablaProductosAddVenta } from './TablaProductosAddVenta';
import { InputFormSelectProduct } from '../../components/InputFormSelectProduct';


interface IDataProps {
  cliente: IClient;
  address: IDirection;
}

export const AddVentaAddProductsCard = ({cliente, address}:IDataProps):JSX.Element => {
  const {productosArray} = useCustomSelector((state) => state.productSlice);
  const {handleAddVenta} = useCustomSelector((state) => state.ventaSlice);

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


  return (
    <Card className="mb-2">
      <Card.Header>Crear nueva venta</Card.Header>
      <Card.Body>
        {/* Aqui va la info del cliente */}

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
                onClick={() => dispatch(setHandleAddVenta(false))}
              >
                Cancelar
              </Button>
            </Col>
            <Col xs={6}>
              <Button
                variant='outline-primary'
                onClick={() => {
                  if(validateInputs()){
                    console.log('Se va a guardar el nuevo producto');
                    // const newVenta:IDataAddVenta = {
                    //   id_client: 0,
                    //   id_direccion: 0,
                    //   fecha: new Date(),
                    //   total: 0,
                    //   por_pagar: 0,
                    //   status: 0,
                    //   productos: []
                    // }
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
