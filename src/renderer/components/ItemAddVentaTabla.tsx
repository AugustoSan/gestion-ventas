import { useState } from "react";
import Button from 'react-bootstrap/Button';
import { IPrecioProductoCliente, IProducto } from "../../main/interfaces";
import { useCustomDispatch } from '../hooks/redux';
import { IDataAddVentaProductos } from "../../main/interfaces/IVentas";
import { deleteAddProductAddVenta } from "../redux/slice/ventas";
import { getProductHook } from "../hooks/database/Product.hook";
import { numberToPrice } from "../utils/price";

interface IDataProps{
  data: IDataAddVentaProductos;
}

export const ItemAddVentaTabla = ({data}: IDataProps):JSX.Element => {
  const [isValid, setIsValid] = useState<boolean>(true);
  const {id_producto, precio, cantidad} = data;
  const total = cantidad * precio;

  const {result, isLoading, isSuccess, status, error} = getProductHook(isValid, id_producto);

  const dispatch = useCustomDispatch();
  return result === null ? <></> 
  : (
  <tr>
    <td>{result.id}</td>
    <td>{result.concepto}</td>
    <td>{cantidad}</td>
    <td>{numberToPrice(precio)}</td>
    <td>{numberToPrice(total)}</td>
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
