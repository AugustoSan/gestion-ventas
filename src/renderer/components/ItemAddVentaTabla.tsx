import { useState } from "react";
import Button from 'react-bootstrap/Button';
import { IPrecioProductoCliente, IProducto } from "../../main/interfaces";
import { useCustomDispatch } from '../hooks/redux';
import { IDataAddVentaProductos } from "../../main/interfaces/IVentas";
import { deleteAddProductAddVenta } from "../redux/slice/ventas";

interface IDataProps{
  data: IDataAddVentaProductos;
}

export const ItemAddVentaTabla = ({data}: IDataProps):JSX.Element => {
  const {producto, cantidad} = data;
  const {id, concepto} = producto;
  const total = cantidad * producto.precio;

  const dispatch = useCustomDispatch();
  return (
  <tr>
    <td>{id}</td>
    <td>{concepto}</td>
    <td>{cantidad}</td>
    <td>$ {producto.precio.toLocaleString("es-ES", {style:"currency", currency:"MXN"})}</td>
    <td>$ {(total ?? 0).toLocaleString("es-ES", {style:"currency", currency:"MXN"})}</td>
    <td>
      <Button
        variant="danger"
        onClick={
          () => {
            console.log(`se eliminara el producto de la venta`);
            dispatch(deleteAddProductAddVenta(data))
          }
        }
      >
        Eliminar
      </Button>
    </td>
  </tr>
  );
}
