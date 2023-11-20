import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { LabelInfoCard } from '../../components/LabelInfoCard';
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux';
import { InputCard } from '../../components/InputCard';
import { AddProduct, setHandleAddProduct } from '../../redux/slice/productos';
import { IDataAddProduct } from '../../../main/interfaces/IProducts';
// import { appendLogFile } from '../../main/util';

export const AddProductoCard = ():JSX.Element => {
  const [inputConcepto, setInputConcepto] = useState<string>('');
  const [error, setError] = useState<string>('');
  const dispatch = useCustomDispatch();

  const validateInputs = (): boolean => {
    if(inputConcepto.length <= 2) {
      setError('Por favor introduce una descripción o concepto.');
      return false;
    }
    setError('');
    return true;
  }

  return (
    <Card className="mb-2">
      <Card.Header>Crear nuevo producto</Card.Header>
      <Card.Body>
        <InputCard
          title={'Concepto'}
          value={inputConcepto}
          onChange={setInputConcepto}
        />
        {
          error.length !== 0
          ? (<Alert variant={'danger'}>{error}</Alert>)
          : <></>
        }
      </Card.Body>
      <Card.Footer>
        <Container>
          <Row>
            <Col xs={6}>
              <Button
                variant='outline-secondary'
                onClick={() => dispatch(setHandleAddProduct(false))}
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
                    const newClient: IDataAddProduct = {
                      concepto: inputConcepto
                    }
                    dispatch(AddProduct(newClient));
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
