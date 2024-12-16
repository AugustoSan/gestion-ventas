import { useState } from "react";
import Button from 'react-bootstrap/Button';
import { IClient } from "../../main/interfaces";
import { useCustomDispatch } from '../hooks/redux';
import { setSelectClient } from '../redux/slice/clientes';

interface IDataProps{
  cliente: IClient;
  // setShow: React.Dispatch<React.SetStateAction<boolean>>
}

export const ItemClientTabla = ({cliente}: IDataProps):JSX.Element => {
  const dispatch = useCustomDispatch();
  return (
  <tr>
    <td>{cliente.nombre != null ? cliente.nombre.length != 0 ? cliente.nombre : '-' : '-'}</td>
    <td>{cliente.apellidopaterno.length != 0 ? cliente.apellidopaterno : '-'}</td>
    <td>{cliente.apellidomaterno.length != 0 ? cliente.apellidomaterno : '-'}</td>
    <td>{cliente.telefono.length != 0 ? cliente.telefono : '-'}</td>
    <td>
      <Button
        variant="primary"
        onClick={
          () => {
            console.log(`se editara el cliente con id ${cliente.id}`);
            dispatch(setSelectClient(cliente));
          }
        }
      >
        Ver
      </Button>
    </td>
  </tr>
  );
}
