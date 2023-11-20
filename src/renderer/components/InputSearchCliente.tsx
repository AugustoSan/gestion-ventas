import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useCustomDispatch } from '../hooks/redux';
import { FindClient } from '../redux/slice/clientes';

export const InputSearchCliente = ():JSX.Element => {
  const [inputSearch, setInputSearch] = useState<string>('');

  const dispatch = useCustomDispatch();

  return (
    <div className="col-9 row">
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Buscar cliente"
          aria-label="Buscar cliente"
          aria-describedby="Nombre apellido"
          value={inputSearch}
          onChange={(event) => {
            setInputSearch(event.target.value);
            dispatch(FindClient(event.target.value));
          }}
        />
        <Button variant="outline-primary" onClick={() => {
          dispatch(FindClient(inputSearch));
        }}>
          Buscar
        </Button>
      </InputGroup>
    </div>
  );
}
