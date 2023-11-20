import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardGroup from 'react-bootstrap/CardGroup';
import { LabelInfoCard } from '../../components/LabelInfoCard';
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux';
import { DeleteClient, UpdateClient, setHandleUpdateClient, setSelectClient } from '../../redux/slice/clientes';
import { InputCard } from '../../components/InputCard';
import { IDataUpdateClient } from '../../../main/interfaces/IClients';
import { UpdateProduct, setSelectProduct } from '../../redux/slice/productos';
import { IDataUpdateProduct } from '../../../main/interfaces/IProducts';
// import { appendLogFile } from '../../main/util';


export const InfoProductoCard = ():JSX.Element => {
  const { selectProducto } = useCustomSelector((state) => state.productSlice);
  const dispatch = useCustomDispatch();
  const {id = 0, concepto = ''} = selectProducto ?? {};
  const [inputConcepto, setInputConcepto] = useState<string>(concepto ?? '');
  console.log('producto: - ', selectProducto);

  return selectProducto === null ? <></> : (
    <Card className="mb-2">
      <Card.Header>Información del producto</Card.Header>
      <Card.Body>
        <InputCard
          title={'ID'}
          value={selectProducto.id.toString()}
          onChange={() => {}}
          disabled={true}
        />
        <InputCard
          title={'Concepto'}
          value={inputConcepto}
          onChange={setInputConcepto}
          disabled={false}
        />
        {/* {
          direcciones.map((direccion) => {
            return <LabelInfoCard key={`${direccion.id}-${direccion.idClient}-dir`} title={direccion.id.toString()} value={direccion.direccion} />
          })
        } */}
      </Card.Body>
      <Card.Footer>
        <Container>
          <Row>
            <Col xs={4}>
              <Button
                variant="danger"
                onClick={
                  () => {
                    console.log(`Button se eliminara el cliente con id ${id}`);
                    dispatch(DeleteClient(selectProducto.id));
                  }
                }
              >
                Eliminar
              </Button>
            </Col>
            <Col xs={4}>
              <Button
                variant="secondary"
                onClick={
                  () => {
                    dispatch(setSelectProduct(null))
                    dispatch(setHandleUpdateClient(false));
                  }
                }
                >
                Cerrar
              </Button>
            </Col>
            <Col xs={4}>
              <Button
                variant="primary"
                onClick={
                  () => {
                    const temp:IDataUpdateProduct = {
                      id: selectProducto.id,
                      product: {
                        concepto: inputConcepto
                      }
                    }
                    dispatch(UpdateProduct(temp));
                  }
                }
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
