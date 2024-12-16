import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from 'react';
import { useCustomDispatch, useCustomSelector } from '../hooks/redux';
import { IClient } from '../../main/interfaces';
import { setSelectClient } from '../redux/slice/clientes';

export const DropdownClientes = ():JSX.Element => {
  const {clientesArray, selectClient} = useCustomSelector((state) => state.clientSlice);
  const [dropdownSelect, setDropdownSelect] = useState<string>(selectClient === null ? 'Seleccionar cliente' : `${selectClient.nombre} ${selectClient.apellidopaterno}`);
  const dispatch = useCustomDispatch();

  return (
    <Dropdown>
      <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">{dropdownSelect}</Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          key={`control-dropdown-ventas`}
          onClick={() => {
            setDropdownSelect('Ver todo');
            dispatch(setSelectClient(null));
          }}
        >
          {'Ver todo'}
        </Dropdown.Item>
        {
          clientesArray.map((cliente, index) => {
            return <Dropdown.Item
                      key={`${index}-${cliente.id}-dropdown-ventas`}
                      onClick={
                        () => {
                          console.log(`DropdownClientes id: ${cliente.id}`);
                          dispatch(setSelectClient(cliente));
                          setDropdownSelect(`${cliente.nombre} ${cliente.apellidopaterno}`);
                        }
                      }
                    >
                      {`${cliente.nombre} ${cliente.apellidopaterno}`}
                    </Dropdown.Item>
          })
        }
      </Dropdown.Menu>
    </Dropdown>
  );
}
