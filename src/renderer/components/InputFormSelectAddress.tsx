import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { IClient, IDirection } from '../../main/interfaces';
import { useCustomSelector } from '../hooks/redux';
import { useEffect, useState } from 'react';

interface IDataProps {
  cliente: IClient | null;
  onChange: React.Dispatch<React.SetStateAction<IDirection | null>>;
}

export const InputFormSelectAddress = ({cliente, onChange}:IDataProps):JSX.Element => {

  console.log('cliente:', cliente);


  return (
    <InputGroup className="mb-3">
          <Container>
            <Row>
              <Col xs={4}><InputGroup.Text>{"Seleccionar dirección"}</InputGroup.Text></Col>
              <Col xs={8}>
                <Form.Select aria-label="Seleccionar dirección" onChange={(event) => {
                  try {
                    if( event.target.value === "-1"){
                      return;
                    }
                    const direction:IDirection = JSON.parse(event.target.value);
                    onChange(direction);
                  } catch (error) {
                    console.log('Error: ', error);
                    return;
                  }
                }} disabled={cliente === null ? true : false}>
                  {
                    cliente === null
                    ? <option value={-1}>{`Seleccione un cliente`}</option>
                    : cliente.direcciones.length === 0
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
