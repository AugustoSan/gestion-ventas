import { useState } from "react";
import Button from 'react-bootstrap/Button';
import { IClient, IProducto } from "../../main/interfaces";
import { useCustomDispatch } from '../hooks/redux';
import { DeleteProduct, setSelectProduct } from "../redux/slice/productos";
import { numberToPrice } from "../utils/price";

interface IDataProps{
  producto: IProducto;
}

export const ItemProductoTabla = ({producto}: IDataProps):JSX.Element => {
  const dispatch = useCustomDispatch();
  return (
  <tr>
    <td>{producto.id}</td>
    <td>{producto.concepto}</td>
    <td>{numberToPrice(producto.precio)}</td>
    <td>
      <Button
        variant="primary"
        onClick={
          () => {
            console.log(`se editara el producto con id ${producto.id}`);
            dispatch(setSelectProduct(producto));
          }
        }
      >
        Ver
      </Button>
    </td>
  </tr>
  );
}
