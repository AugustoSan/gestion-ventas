import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useCustomSelector } from '../hooks/redux';
import { IProducto } from '../../main/interfaces';

interface IDataProps {
  onChange: React.Dispatch<React.SetStateAction<number>>;
  disabled: boolean;
}

export const InputProductItem = ({onChange, disabled = false}:IDataProps):JSX.Element => {
  const {productosArray} = useCustomSelector((state) => state.productSlice);
  return (
    <InputGroup className="mb-3">
      <Container>
        <Row>
          <Col xs={4}><InputGroup.Text>{"Seleccionar producto"}</InputGroup.Text></Col>
          <Col xs={8}>
            <Form.Select aria-label="Seleccionar producto" onChange={(event) => {
              if(event.target.value === "-1") return;
              const producto:IProducto = JSON.parse(event.target.value);
              // onChange(cliente);
            }}
            disabled={disabled}
            >
              <option key={`default-item-producto`} value={"-1"}>{`Selecciona un producto`}</option>
              {
                productosArray.map((producto, index) => {
                  return (<option key={`${index}-${producto.id}-item-producto`} value={JSON.stringify(producto)}>{`${producto.concepto}`}</option>)
                })
              }
            </Form.Select>
          </Col>
        </Row>
      </Container>
      {/* <Container>
        <Row>
          <Col xs={4}><InputGroup.Text>Cantidad</InputGroup.Text></Col>
          <Col xs={8}>
            <Form.Control
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              value={0}
              type={'number'}
              min={0}
              step={0.01}
              // onChange={(event) => onChange(Number(event.target.value))}
              disabled={disabled}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={4}><InputGroup.Text>Precio</InputGroup.Text></Col>
          <Col xs={8}>
            <Form.Control
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              value={0}
              type={'number'}
              // onChange={(event) => onChange(Number(event.target.value))}
              disabled={disabled}
              placeholder={'Concepto'}
            />
          </Col>
        </Row>
      </Container> */}
      </InputGroup>
  );
}
