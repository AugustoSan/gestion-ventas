import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useFindPagoById } from '../../hooks';
import { Loading } from '../../components/Loading';
import { InfoIngresoView } from './InfoIngresoView';
import { useCustomSelector } from '../../hooks/redux';

export const IngresoWithIDView = ():JSX.Element => {
  const {id} = useCustomSelector((state) => state.menuSlice);
  const [price, setPrice] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [idPago, setIdPago] = useState<number>(-1);
  // const { id } = useParams();
  const { result, isLoading, isSuccess, error: errorsHook} = useFindPagoById({isValid: isEnabled, id: idPago});

  const getIdFromPath = () => {
    const path = window.location.pathname; // Obtiene el path (ej: "/pagos/123")
    const parts = path.split("/"); // Divide la ruta en partes

    return parts[2]; // `123` si la ruta es `/pagos/123`
  };

  useEffect(() => {
    try {
      if(id === null || id === undefined)
      {
        setError('El id es undefined');
        return;
      }
      const getId = Number(id);
      setIdPago(getId);
      setIsEnabled(true);
    } catch (error) {
      console.log(error);
      setError('Ocurrio un error al parsear el id');
    }
  }, []);

  useEffect(() => {
    if(errorsHook !== null)
    {
      setError(errorsHook.message);
    }
    if(isSuccess)
      {
        setIsEnabled(false);
      }
    if(idPago === -1)
    {
      setIsEnabled(true);
    }
  }, [errorsHook, idPago, isSuccess]);

  console.log(result);

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Información del abono</h1>
      </div>
      <Card className="mb-2">
        <Card.Header>Información del abono</Card.Header>
        <Card.Body>
          {
            isLoading ? <Loading /> : null
          }
          {
            error.length !== 0
            ? (<Alert variant={'danger'}>{error}</Alert>)
            : <></>
          }
          {
            result === null
              ? null
              : <InfoIngresoView pago={result} />
          }
        </Card.Body>
        <Card.Footer>
          <Container>
            <Row>
              <Col xs={6}>
                <Button
                  variant='outline-secondary'
                  onClick={() => {
                    // navigate(-1);
                  }}
                >
                  Cancelar
                </Button>
              </Col>
              <Col xs={6}>
              <Button
                  variant='outline-danger'
                  onClick={() => {
                    // if(validateInputs() && cliente !== null){
                    //   setPago({id_client: cliente.id, monto: abono});
                    //   // dispatch(setSelectView('all'));
                    // }
                    // navigate(-1);
                  }}
                >
                  Eliminar
                </Button>
              </Col>
            </Row>
          </Container>
        </Card.Footer>
      </Card>
    </main>
  );
}
