import { useState } from "react";
import Button from 'react-bootstrap/Button';
import { IVenta } from "../../main/interfaces";
import { useCustomDispatch } from '../hooks/redux';
import { DeleteProduct, setSelectProduct } from "../redux/slice/productos";

interface IDataProps{
  venta: IVenta;
}

export const ItemVentaTabla = ({venta}: IDataProps):JSX.Element => {
  const {id, id_client, id_direccion, fecha, total, por_pagar, status} = venta;
  const dispatch = useCustomDispatch();
  return (
  <tr>
    <td>{id}</td>
    <td>{id_client}</td>
    <td>{id_direccion}</td>
    <td>{fecha}</td>
    <td>$ {(total ?? 0).toLocaleString("es-ES", {style:"currency", currency:"MXN"})}</td>
    <td>$ {(por_pagar ?? 0).toLocaleString("es-ES", {style:"currency", currency:"MXN"})}</td>
    <td>{status}</td>
    <td>
      <Button
        variant="primary"
        onClick={
          () => {
            console.log(`se visualizara la venta con id ${id}`);
            // dispatch(setSelectProduct(producto));
          }
        }
      >
        Ver
      </Button>
    </td>
  </tr>
  );
}
