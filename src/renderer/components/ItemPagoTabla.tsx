import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { IClient, IVenta } from "../../main/interfaces";
import { useCustomDispatch, useCustomSelector } from '../hooks/redux';
import { numberToPrice } from "../utils/price";
import { dateToString } from "../utils/date";
import { useGetClientById } from "../hooks/";
// import { useNavigate } from "react-router-dom";
import { menuItems } from "../utils/menuItems";
import { setSelectView } from "../redux/slice/ingresos";
import { IPago } from "../../main/interfaces/IPagos";
import { IngresoWithIDView } from "../views/Ingresos/IngresoWithIDView";
import { setIdMenu } from "../redux/slice/menu";

interface IDataProps{
  pago: IPago;
}

export const ItemPagoTabla = ({pago}: IDataProps):JSX.Element => {
  // const navigate = useNavigate();
  const { pagos } = menuItems;
  const {id, id_cliente, fecha, monto} = pago;
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
            console.log(`${pagos.href}/${id}`);
            dispatch(setIdMenu(id));
            // navigate(`${pagos.href}/${id}`);
            // dispatch(setSelectView('viewPago'));
          }
        }
      >
        Ver
      </Button>
    </td>}
  </tr>
  );
}
