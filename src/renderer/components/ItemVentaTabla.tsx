import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { IClient, IVenta } from "../../main/interfaces";
import { useCustomDispatch, useCustomSelector } from '../hooks/redux';
import { DeleteProduct, setSelectProduct } from "../redux/slice/productos";
import { numberToPrice } from "../utils/price";
import { dateToString } from "../utils/date";
import { getClientHook } from "../hooks/database/getClient";

interface IDataProps{
  venta: IVenta;
}

export const ItemVentaTabla = ({venta}: IDataProps):JSX.Element => {
  const {id, id_client, fecha, total, por_pagar, status} = venta;
  // const dispatch = useCustomDispatch();

  const [address, setAddress] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);
  const {result:client, isLoading, isSuccess, error} = getClientHook(isValid, id_client);
  const itemDate = new Date(fecha);

  useEffect(() => {
    if(isSuccess) setIsValid(false);
  }, [isSuccess]);
  

  return client === null
  ? <></>
  : (
  <tr>
    <td>{id}</td>
    <td>{`${client.nombre} ${client.apellidopaterno}`}</td>
    {/* <td>{address}</td> */}
    <td>{`${dateToString(itemDate)}`}</td>
    <td>{numberToPrice(total)}</td>
    <td>{numberToPrice(por_pagar)}</td>
    <td>{status === 1 ? 'Pagado' : 'Con adeudo'}</td>
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
