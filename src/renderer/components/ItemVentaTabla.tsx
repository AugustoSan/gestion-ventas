import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { IClient, IVenta } from "../../main/interfaces";
import { useCustomDispatch, useCustomSelector } from '../hooks/redux';
import { numberToPrice } from "../utils/price";
import { dateToString } from "../utils/date";
import { useGetClientById } from "../hooks/";
import { setSelectVenta, setSelectView } from "../redux/slice/ventas";

interface IDataProps{
  venta: IVenta;
}

export const ItemVentaTabla = ({venta}: IDataProps):JSX.Element => {
  const {id, id_client, fecha, total, por_pagar, status} = venta;
  const dispatch = useCustomDispatch();

  const [address, setAddress] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);
  const {result:client, isLoading, isSuccess, error} = useGetClientById(id_client);
  const itemDate = new Date(fecha);

  useEffect(() => {
    if(isSuccess) setIsValid(false);
  }, [isSuccess]);

  // status
  // 0: pagado,
  // 1: falta por pagar,
  // 2: pausado
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
    <td>{status === 0 ? 'Pagado' : status === 1 ? 'Con adeudo' : 'Pausado'}</td>
    <td>
      <Button
        variant="primary"
        onClick={
          () => {
            /* console.log(`se visualizara la venta con id ${id}`); */
            dispatch(setSelectVenta(id));
            dispatch(setSelectView("infoVenta"));
          }
        }
      >
        Ver
      </Button>
    </td>
  </tr>
  );
}
