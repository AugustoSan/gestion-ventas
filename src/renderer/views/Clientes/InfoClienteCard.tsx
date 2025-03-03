import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux';
import { DeleteClient, UpdateClient, setHandleUpdateClient, setHandleWatchAddress, setSelectClient } from '../../redux/slice/clientes';
import { InputCard } from '../../components/InputCard';
import { IClient, IDataUpdateClient } from '../../../main/interfaces/IClients';
import { numberToPrice } from '../../utils/price';
import { useGetClientById } from '../../hooks';
import { Client } from 'pg';
import { useEffect } from 'react';
// import { appendLogFile } from '../../main/util';


export const InfoClienteCard = ():JSX.Element => {
  const { selectClient, handleUpdateClient } = useCustomSelector((state) => state.clientSlice);
  const dispatch = useCustomDispatch();
  const {result, isSuccess} = useGetClientById(selectClient?.id ?? 0);
  const [inputName, setInputName] = useState<string>(`-`);
  const [inputAPP, setInputAPP] = useState<string>(`-`);
  const [inputAPM, setInputAPM] = useState<string>(`-`);
  const [inputTel, setInputTel] = useState<string>(`-`);
  const [labelSaldo, setLabelSaldo] = useState<number>(0);
  // const [arrayAddress, setarrayAddress] = useState<Array<string>>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if(result != null)
    {
      const {nombre, apellidopaterno, apellidomaterno, telefono, saldo, direcciones} = result;
      setInputName(nombre);
      setInputAPP(apellidopaterno);
      setInputAPM(apellidomaterno);
      setInputTel(telefono);
      setLabelSaldo(saldo);
      // setarrayAddress([...direcciones]);
    }
  }, [result]);


  const validateInputs = ():boolean => {
    if(inputName.length <= 2){result
      setError('El nombre debe de tener al menos dos caractéres');
      return false;
    }
    if(inputAPP.length <= 2){
      setError('El apellido paerno debe de tener al menos dos caractéres');
      return false;
    }
    setError(null);
    return true;
  }

  return selectClient === null ? <></> : (
    <Card className="mb-2">
      <Card.Header>Información del cliente</Card.Header>
      <Card.Body>
        <InputCard
          title={'Nombre'}
          value={inputName}
          onChange={setInputName}
          disabled={!handleUpdateClient}
        />
        <InputCard
          title={'Apellido Paterno'}
          value={inputAPP}
          onChange={setInputAPP}
          disabled={!handleUpdateClient}
        />
        <InputCard
          title={'Apellido Materno'}
          value={inputAPM}
          onChange={setInputAPM}
          disabled={!handleUpdateClient}
        />
        <InputCard
          title={'Telefono'}
          value={inputTel}
          onChange={setInputTel}
          disabled={!handleUpdateClient}
        />
        <InputCard
          title={'Saldo'}
          value={numberToPrice(labelSaldo)}
          onChange={() => {}}
          disabled={true}
        />
        <div className="d-grid gap-2 mb-2 mt-2">
          <Button variant="primary" size="lg" onClick={() => dispatch(setHandleWatchAddress(true))}>
            Ver direcciones
          </Button>
        </div>
        {
          error !== null
          ? <Alert variant='danger'>{error}</Alert>
          : <></>
        }
      </Card.Body>
      <Card.Footer>
        <Container>
          <Row>
            <Col xs={4}>
              <Button
                variant="danger"
                onClick={
                  () => {
                    /* console.log(`Button se eliminara el cliente con id ${id}`); */
                    const resultConfirm = confirm('Realmente desea eliminar el cliente');
                    if(resultConfirm){
                      dispatch(DeleteClient(selectClient.id));
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
                    dispatch(setSelectClient(null))
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
                    /* console.log(`se ${handleUpdateClient === true ? 'guardará' : 'editará'} el cliente con id ${id}`); */
                    dispatch(setHandleUpdateClient(true));
                    if(!validateInputs()) return;
                    if(handleUpdateClient){
                      const temp:IDataUpdateClient = {
                        id: selectClient.id,
                        client: {
                          nombre: inputName,
                          apellidopaterno: inputAPP,
                          apellidomaterno: inputAPM,
                          telefono: inputTel,
                          direccioness: []
                        }
                      }
                      dispatch(UpdateClient(temp));
                    }
                  }
                }
                >
                { handleUpdateClient === true ? 'Guardar' : 'Editar' }
              </Button>
            </Col>
          </Row>
        </Container>
      </Card.Footer>
    </Card>
  );
}
