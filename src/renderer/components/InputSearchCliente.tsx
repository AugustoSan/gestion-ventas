import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useCustomDispatch, useCustomSelector } from '../hooks/redux';
import { FindClient } from '../redux/slice/clientes';

export const InputSearchCliente = ():JSX.Element => {
  const {pagination} = useCustomSelector((state) => state.clientSlice);
  const [inputSearch, setInputSearch] = useState<string>('');

  const dispatch = useCustomDispatch();
  const {currentPage, sizePage} = pagination;

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
            dispatch(FindClient(event.target.value, 0, sizePage));
          }}
        />
        <Button variant="outline-primary" onClick={() => {
          dispatch(FindClient(inputSearch, 0, sizePage));
        }}>
          Buscar
        </Button>
      </InputGroup>
    </div>
  );
}
