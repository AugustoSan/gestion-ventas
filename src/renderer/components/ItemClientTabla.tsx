import { useState } from "react";
import { IClient } from "../interfaces";
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
    <td>{cliente.nombre}</td>
    <td>{cliente.app}</td>
    <td>{cliente.apm}</td>
    <td>{cliente.telefono}</td>
    <td>
      <button
        type="button"
        className="btn btn-primary"
        onClick={
          () => {
            console.log(`se editara el cliente con id ${cliente.id}`);
            dispatch(setSelectClient(cliente));
          }
        }
      >
        Ver
      </button>
    </td>
  </tr>
  );
}
