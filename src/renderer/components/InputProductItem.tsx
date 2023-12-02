import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useCustomSelector } from '../hooks/redux';
import { IClient, IPriceProduct, IProducto } from '../../main/interfaces';
import { SetStateAction, useState, useEffect } from 'react';
import { InputNumberCard } from './InputNumberCard';
import { InputFormSelectProduct } from './InputFormSelectProduct';
import { InputFormSelectPriceProduct } from './InputFormSelectPriceProduct';

interface IDataProps {
  producto: IProducto | null;
  cliente: IClient;
  onChangeProduct: React.Dispatch<React.SetStateAction<IProducto | null>>;
  disabled: boolean;
}

export const InputProductItem = ({producto, cliente, onChangeProduct, disabled = false}:IDataProps):JSX.Element => {
  const {productosArray} = useCustomSelector((state) => state.productSlice);
  const {addVentaListPricesProduct} = useCustomSelector((state) => state.ventaSlice);
  const [inputCantidad, setInputCantidad] = useState<number>(0);
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [price, setPrice] = useState<IPriceProduct>({
    id: 0,
    id_producto: 0,
    id_client: 0,
    precio: 0,
  });
  const productDefault: IProducto = {
    id: 0,
    concepto: '',
    precio: 0,
    list_prices: []
  };

  const [inputProduct, setInputProduct] = useState<IProducto>(productDefault);

  useEffect(() => {
    if(producto === null) {
      setInputProduct(productDefault);
      setIsEnabled(false);
    }
    else {
      setInputProduct(producto)
      setIsEnabled(true);
    }
  }, [producto])

  return (
    <>
      <InputFormSelectProduct onChange={onChangeProduct} disabled={disabled} />
      <InputFormSelectPriceProduct producto={inputProduct} cliente={cliente} onChange={setPrice} disabled={!isEnabled} />
      {/* <InputNumberCard title={'Cantidad'} value={inputCantidad} onChange={setInputCantidad} disabled={disabled} /> */}
      <InputGroup className="mb-3">
        <Container>
          <Row>
            <Col xs={4}><InputGroup.Text>{'Cantidad'}</InputGroup.Text></Col>
            <Col xs={4}>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                value={inputCantidad}
                onChange={(event) => {
                  try {
                    setInputCantidad(Number(event.target.value))
                  } catch (error) {
                    alert('La entrada del dato deben ser números')
                  }
                }}
                disabled={disabled}
                placeholder={'Cantidad'}
              />
            </Col>
            <Col xs={4}><InputGroup.Text>{'Button'}</InputGroup.Text></Col>
          </Row>
        </Container>
      </InputGroup>
    </>
  );
}
