import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useCustomDispatch } from '../hooks/redux';
import { AddAddres, FindClient } from '../redux/slice/clientes';
import { IDataAddAddress } from '../../main/interfaces/IClients';

interface IDataProps {
  idCliente: number;
}

export const ButtonAddNewAddress = ({idCliente}:IDataProps):JSX.Element => {
  const [inputAddAddress, setInputAddAddress] = useState<string>('');
  const dispatch = useCustomDispatch();

  return (
    <div className="col-9 row">
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Crear nueva dirección"
          aria-label="Crear nueva dirección"
          aria-describedby="helpNewAddress"
          value={inputAddAddress}
          onChange={(event) => {
            setInputAddAddress(event.target.value);
          }}
        />
        <Button variant="outline-primary" onClick={() => {
          if(inputAddAddress.length <= 2){
            window.alert('La dirección debe de tener al menos dos caractéres')
          }
          else{
            const newAddAddress:IDataAddAddress = {
              id_client: idCliente,
              direccion: inputAddAddress
            }
            dispatch(AddAddres(newAddAddress));
          }
        }}>
          Crear
        </Button>
      </InputGroup>
    </div>
  );
}
