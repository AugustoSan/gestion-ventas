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
import { InputCard } from '../../components/InputCard';
import { IDataUpdateClient } from '../../../main/interfaces/IClients';
import { IDataUpdateProduct } from '../../../main/interfaces/IProducts';
import { InputPriceCard } from '../../components/InputPriceCard';
import { useGetVentaById } from '../../hooks';
import { useEffect } from 'react';
import { setSelectVenta, setSelectView } from '../../redux/slice/ventas';

interface IDataProps{
  id: number;
}

export const InfoVentaCard = ({id}: IDataProps):JSX.Element => {
  const { selectVenta } = useCustomSelector((state) => state.ventaSlice);
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const dispatch = useCustomDispatch();
  const {result, isLoading, isSuccess, error, status} = useGetVentaById({isValid: isEnabled, id});

  useEffect(() => {
    if(isSuccess) setIsEnabled(false);
  }, [isSuccess]);


  console.log('venta: - ', result);

  // return <h1>Venta Info</h1>
  return result === null ? <h1>Sin resultados</h1> : (
    <Card className="mb-2">
      <Card.Header>Información de la venta</Card.Header>
      <Card.Body>
        <InputCard
          title={'ID'}
          value={result.id.toString()}
          onChange={() => {}}
          disabled={true}
        />
        <InputCard
          title={'Cliente'}
          value={result.id_client.toString()}
          onChange={() => {}}
          disabled={true}
        />
        <InputCard
          title={'Direccion'}
          value={result.id_direccion.toString()}
          onChange={() => {}}
          disabled={true}
        />
        <InputPriceCard
          title={'Por_pagar'}
          value={result.por_pagar}
          onChange={() => {}}
          disabled={true}
        />
        <InputPriceCard
          title={'Total'}
          value={result.total}
          onChange={() => {}}
          disabled={true}
        />
      </Card.Body>
      <Card.Footer>
        <Container>
          <Row>
            <Col xs={4}>
              <Button
                variant="danger"
                onClick={
                  () => {
                    const resultConfirm = confirm('Realmente desea la venta el producto');
                    if(resultConfirm){
                      // dispatch(DeleteProduct(result.id));
                    }
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
                    dispatch(setSelectVenta(null));
                    dispatch(setSelectView("all"));
                    // dispatch(setHandleUpdateProduct(false));
                  }
                }
                >
                Cerrar
              </Button>
            </Col>
            {/* <Col xs={4}>
              <Button
                variant="primary"
                onClick={
                  () => {
                    const temp:IDataUpdateProduct = {
                      id: selectProducto.id,
                      product: {
                        concepto: inputConcepto,
                        precio: inputPrecio
                      }
                    }
                    dispatch(UpdateProduct(temp));
                  }
                }
                >
                Guardar
              </Button>
            </Col> */}
          </Row>
        </Container>
      </Card.Footer>
    </Card>
  );
}
