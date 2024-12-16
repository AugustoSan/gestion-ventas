import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux';
import { InputCard } from '../../components/InputCard';
import { InputPriceCard } from '../../components/InputPriceCard';
import { useFindAddressById, useGetClientById, useGetVentaById } from '../../hooks';
import { useEffect } from 'react';
import { setSelectVenta, setSelectView } from '../../redux/slice/ventas';
import { TablaPagosByVenta } from '../../components/TablaPagosByVenta';
import { dateToString } from '../../utils/date';

interface IDataProps{
  id: number;
}

export const InfoVentaCard = ({id}: IDataProps):JSX.Element => {
  const { selectVenta } = useCustomSelector((state) => state.ventaSlice);
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [isEnabledResult, setIsEnabledResult] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [idClient, setIdClient] = useState<number>(-1);
  const [idAddress, setIdAddress] = useState<number>(-1);
  const dispatch = useCustomDispatch();
  const {
    result,
    isLoading,
    isSuccess,
    error,
    status
  } = useGetVentaById({isValid: isEnabled, id});
  const {
    result: client,
    isLoading: isLoadingClient,
    isSuccess: isSuccessClient,
    error: errorClient,
    status: statusClient
  } = useGetClientById({isValid: isEnabledResult, id: idClient});
  const {
    result: direction,
    isLoading: isLoadingDirection,
    isSuccess: isSuccessDirection,
    error: errorDirection,
    status: statusDirection
  } = useFindAddressById({isValid: isEnabledResult, id: idAddress});

  useEffect(() => {
    if(isSuccess) setIsEnabled(false);
    if(isSuccessClient) setIsEnabledResult(false);
    if(isSuccessClient) setIsEnabledResult(false);
  }, [isSuccess, isSuccessClient, isSuccessDirection]);

  useEffect(() => {
    if(result !== null)
    {
      setIsEnabledResult(true);
      setIdAddress(result.id_direccion);
      setIdClient(result.id_client);
    }
    if(client !== null) setName(client.nombre);
    if(direction !== null) setAddress(direction.direccion);
  }, [result, client, direction]);



  // return <h1>Venta Info</h1>
  return result === null ? <h1>Sin resultados</h1> : (
    <Card className="mb-2">
      <Card.Header>Información de la venta</Card.Header>
      <Card.Body>
        <InputCard
          title={'Folio'}
          value={result.id.toString()}
          onChange={() => {}}
          disabled={true}
        />
        <InputCard
          title={'Fecha'}
          value={dateToString(new Date(result.fecha))}
          onChange={() => {}}
          disabled={true}
        />
        <InputCard
          title={'Cliente'}
          value={name}
          onChange={() => {}}
          disabled={true}
        />
        <InputCard
          title={'Direccion'}
          value={address}
          onChange={() => {}}
          disabled={true}
        />
        <InputPriceCard
          title={'Por pagar'}
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
        <Container className="mb-3">
          <Row>
            <Col>
              <TablaPagosByVenta idVenta={id}/>
            </Col>
          </Row>
        </Container>
      </Card.Body>
      <Card.Footer>
        <Container>
          <Row>
            <Col xs={6}>
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
            <Col xs={6}>
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
          </Row>
        </Container>
      </Card.Footer>
    </Card>
  );
}
