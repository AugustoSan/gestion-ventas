import { useState } from "react";
import { IClient } from "../interfaces";

interface IDataProps{
  cliente: IClient;
  // setShow: React.Dispatch<React.SetStateAction<boolean>>
}

export const ItemClientTabla = ({cliente}: IDataProps):JSX.Element => {
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
            // setShow(true);
          }
        }
      >
        Ver
      </button>
    </td>
  </tr>
  );
}
