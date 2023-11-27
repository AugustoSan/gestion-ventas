import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { IClient, IDirection, IPriceProduct, IProducto } from '../../main/interfaces';
import { useCustomDispatch, useCustomSelector } from '../hooks/redux';
import { useEffect, useState } from 'react';
import { FindPricesProduct } from '../redux/slice/productos';

interface IDataProps {
  cliente: IClient;
  producto: IProducto;
  onChange: React.Dispatch<React.SetStateAction<IDirection>>;
}

export const InputFormSelectPriceProduct = ({cliente, producto, onChange}:IDataProps):JSX.Element => {
  const {addVentaListPricesProduct} = useCustomSelector((state) => state.ventaSlice);
  const [listPrices, setListPrices] = useState<Array<IPriceProduct>>(addVentaListPricesProduct);
  const dispatch = useCustomDispatch();

  useEffect(() => {
    dispatch(FindPricesProduct({id_cliente: cliente.id, id_product: producto.id}));
  }, [cliente, producto]);


  return (
    <InputGroup className="mb-3">
          <Container>
            <Row>
              <Col xs={4}><InputGroup.Text>{"Seleccionar precio"}</InputGroup.Text></Col>
              <Col xs={8}>
                <Form.Select aria-label="Seleccionar precio" onChange={(event) => {
                  const direction:IDirection = JSON.parse(event.target.value);
                  onChange(direction);
                }}>
                  <option value={-1}>{`${producto.precio}`}</option>
                  {
                    listPrices.map((price, index) => {
                      return (<option key={`${index}-${price.id}-item-price`} value={price.id}>{`${price.precio}`}</option>)
                    })
                  }
                </Form.Select>
              </Col>
            </Row>
          </Container>
        </InputGroup>
  );
}
