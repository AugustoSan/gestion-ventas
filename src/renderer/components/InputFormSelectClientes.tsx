import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { IClient } from '../../main/interfaces';
import { useCustomSelector } from '../hooks/redux';
import { useState } from 'react';

interface IDataProps {
  onChange: React.Dispatch<React.SetStateAction<IClient | null>>;
}

export const InputFormSelectClientes = ({onChange}:IDataProps):JSX.Element => {
  const {clientesArray} = useCustomSelector((state) => state.clientSlice);

  return (
    <InputGroup className="mb-3">
          <Container>
            <Row>
              <Col xs={4}><InputGroup.Text>{"Seleccionar cliente"}</InputGroup.Text></Col>
              <Col xs={8}>
                <Form.Select aria-label="Seleccionar cliente" onChange={(event) => {
                  if(event.target.value === "-1") {
                    onChange(null);
                    return ;
                  }
                  const cliente:IClient = JSON.parse(event.target.value);
                  onChange(cliente);
                }}>
                  <option key={`default-item-cliente`} value={"-1"}>{`Selecciona un cliente`}</option>
                  {
                    clientesArray.map((cliente, index) => {
                      return (<option key={`${index}-${cliente.id}-item-cliente-${cliente.name}`} value={JSON.stringify(cliente)}>{`${cliente.name} ${cliente.app}`}</option>)
                    })
                  }
                </Form.Select>
              </Col>
            </Row>
          </Container>
        </InputGroup>
  );
}
