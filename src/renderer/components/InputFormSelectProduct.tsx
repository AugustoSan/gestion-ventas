import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useCustomDispatch, useCustomSelector } from '../hooks/redux';
import { IClient, IProducto } from '../../main/interfaces';
import { SetStateAction, useState, useEffect } from 'react';
import { InputNumberCard } from './InputNumberCard';
// import { FindPricesProduct } from '../redux/slice/productos';
// import { IDataFindPricesProduct } from '../../main/interfaces/IProducts';

interface IDataProps {
  onChange: React.Dispatch<React.SetStateAction<IProducto | null>>;
  disabled?: boolean;
}

export const InputFormSelectProduct = ({onChange, disabled = false}:IDataProps):JSX.Element => {
  const {productosArray} = useCustomSelector((state) => state.productSlice);

  const productDefault:IProducto = {
    id: 0,
    concepto: 'Selecciona un producto',
    precio: 0,
    list_prices: []
  }

  return (
    <InputGroup className="mb-3">
      <Container>
        <Row>
          <Col xs={4}><InputGroup.Text>{"Seleccionar producto"}</InputGroup.Text></Col>
          <Col xs={8}>
            <Form.Select aria-label="Seleccionar producto" onChange={(event) => {
              const producto:IProducto = JSON.parse(event.target.value);
              onChange(producto);
            }}
            disabled={disabled}
            >
              <option key={`default-item-producto`} value={JSON.stringify(productDefault)}>{`Selecciona un producto`}</option>
              {
                productosArray.map((producto, index) => {
                  return (<option key={`${index}-${producto.id}-item-producto`} value={JSON.stringify(producto)}>{`${producto.concepto}`}</option>)
                })
              }
            </Form.Select>
          </Col>
        </Row>
      </Container>
    </InputGroup>
  );
}
