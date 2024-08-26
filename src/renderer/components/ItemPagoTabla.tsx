import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { IClient, IPago, IVenta } from "../../main/interfaces";
import { useCustomDispatch, useCustomSelector } from '../hooks/redux';
import { numberToPrice } from "../utils/price";
import { dateToString } from "../utils/date";
import { useGetClientById } from "../hooks/";
import { setSelectVenta, setSelectView } from "../redux/slice/ventas";
import { useNavigate } from "react-router-dom";
import { menuItems } from "../utils/menuItems";

interface IDataProps{
  pago: IPago;
}

export const ItemPagoTabla = ({pago}: IDataProps):JSX.Element => {
  const navigate = useNavigate();
  const { pagos } = menuItems;
  const {id, id_client, fecha, monto} = pago;
  const dispatch = useCustomDispatch();

  const itemDate = new Date(fecha);

  return (
  <tr>
    <td>{id}</td>
    <td>{`${numberToPrice(monto)}`}</td>
    {/* <td>{address}</td> */}
    <td>{`${dateToString(itemDate)}`}</td>
    {<td>
      <Button
        variant="primary"
        onClick={
          () => {
            console.log(`se visualizara la venta con id ${id}`);
            navigate(`${pagos.href}/${id}`);
          }
        }
      >
        Ver
      </Button>
    </td>}
  </tr>
  );
}