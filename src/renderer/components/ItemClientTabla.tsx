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
    <td>{cliente.name}</td>
    <td>{cliente.app}</td>
    <td>{cliente.apm}</td>
    <td>{cliente.tel}</td>
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
