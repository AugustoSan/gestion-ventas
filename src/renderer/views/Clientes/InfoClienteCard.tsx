import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import { LabelInfoCard } from '../../components/LabelInfoCard';
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux';
import { AddAddres, DeleteClient, UpdateClient, setHandleUpdateClient, setSelectClient } from '../../redux/slice/clientes';
import { InputCard } from '../../components/InputCard';
import { IDataAddAddress, IDataUpdateClient } from '../../../main/interfaces/IClients';
import { IDirection } from '../../../main/interfaces';
// import { appendLogFile } from '../../main/util';


export const InfoClienteCard = ():JSX.Element => {
  const { selectClient, handleUpdateClient } = useCustomSelector((state) => state.clientSlice);
  const dispatch = useCustomDispatch();
  console.log('selectClient', selectClient);
  const {id = 0, name = '', app = '', apm = '', tel = '', direcciones = [], saldo = 0} = selectClient ?? {};
  const [inputName, setInputName] = useState<string>(name ?? '');
  const [inputAPP, setInputAPP] = useState<string>(app ?? '');
  const [inputAPM, setInputAPM] = useState<string>(apm ?? '');
  const [inputTel, setInputTel] = useState<string>(tel ?? '');
  const [inputAddress, setInputAddress] = useState<string>('');
  const [enableAddAddress, setEnableAddAddress] = useState<boolean>(false);
  const [inputArrayAddress, setInputArrayAddress] = useState<Array<IDirection>>(direcciones);
  const [error, setError] = useState<string | null>(null);
  // const [inputName, setInputName] = useState<string>(name);
  console.log('cliente: - ', selectClient);

  const validateInputs = ():boolean => {
    if(inputName.length <= 2){
      setError('El nombre debe de tener al menos dos caractéres');
      return false;
    }
    if(inputAPP.length <= 2){
      setError('El apellido paerno debe de tener al menos dos caractéres');
      return false;
    }
    if(enableAddAddress && inputAddress.length <= 2){
      setError('Por favor debe de agregar una nueva dirección u ocultar la seccion para agregar una nueva dirección');
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
          title={'Appelido Materno'}
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
          value={`$ ${saldo.toLocaleString("es-ES", {style:"currency", currency:"MXN"})}`}
          onChange={() => {}}
          disabled={true}
        />
        <Card.Header>Direcciones</Card.Header>
        <div className="d-grid gap-2 mb-2 mt-2">
          <Button variant="primary" size="lg" onClick={() => setEnableAddAddress(!enableAddAddress)} disabled={!handleUpdateClient}>
            { enableAddAddress === false ? 'Agregar una nueva dirección' : 'Ocultar'}
          </Button>
        </div>
        {
          enableAddAddress === true
          ? <InputCard title={'Nueva dirección'} value={inputAddress} onChange={setInputAddress} disabled={false} />
          : <></>
        }
        {
          direcciones.length === 0
          ? <Alert variant='primary'> Sin direcciones registradas </Alert>
          : inputArrayAddress.map((direccion, index) => {
          //   return <InputCard
          //   title={`Dirección ${index}`}
          //   value={direccion.direccion}
          //   onChange={setInputArrayAddress}
          //   disabled={!handleUpdateClient}
          // />
            return <LabelInfoCard key={`${direccion.id}-${direccion.idClient}-dir`} title={`Dirección ${index+1}`} value={direccion.direccion} />
          })
        }
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
                    console.log(`Button se eliminara el cliente con id ${id}`);
                    dispatch(DeleteClient(selectClient.id));
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
                    console.log(`se ${handleUpdateClient === true ? 'guardará' : 'editará'} el cliente con id ${id}`);
                    dispatch(setHandleUpdateClient(true));
                    if(!validateInputs()) return;
                    console.log(`enableAddAddress: ${enableAddAddress} - inputAddress: ${inputAddress}`);
                    if(handleUpdateClient){
                      const temp:IDataUpdateClient = {
                        id: selectClient.id,
                        client: {
                          name: inputName,
                          app: inputAPP,
                          apm: inputAPM,
                          tel: inputTel
                        }
                      }
                      dispatch(UpdateClient(temp));
                    }
                    if(enableAddAddress && inputAddress.length > 2){
                      const newAddress:IDataAddAddress = {
                        id_client: selectClient.id,
                        direccion: inputAddress
                      }
                      dispatch(AddAddres(newAddress));
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
