import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { IClient, IDirection } from '../../main/interfaces';
import { useCustomSelector } from '../hooks/redux';
import { useEffect, useState } from 'react';

interface IDataProps {
  cliente: IClient;
  onChange: React.Dispatch<React.SetStateAction<IDirection>>;
  isEnabled: boolean;
}

export const InputFormSelectAddress = ({cliente, onChange, isEnabled = false}:IDataProps):JSX.Element => {

  return (
    <InputGroup className="mb-3">
          <Container>
            <Row>
              <Col xs={4}><InputGroup.Text>{"Seleccionar dirección"}</InputGroup.Text></Col>
              <Col xs={8}>
                <Form.Select aria-label="Seleccionar dirección" onChange={(event) => {
                  const direction:IDirection = JSON.parse(event.target.value);
                  onChange(direction);
                }} disabled={isEnabled}>
                  {
                    cliente.direcciones.length === 0 && isEnabled === true
                    ? <option value={-1}>{`Sin direcciones registradas`}</option>
                    : cliente.direcciones.map((address, index) => {
                      return (<option key={`${index}-${address.id}-item-address`} value={address.id}>{`${address.direccion}`}</option>)
                    })
                  }
                </Form.Select>
              </Col>
            </Row>
          </Container>
        </InputGroup>
  );
}
