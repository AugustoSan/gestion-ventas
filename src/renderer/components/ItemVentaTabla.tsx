import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { IClient, IVenta } from "../../main/interfaces";
import { useCustomDispatch, useCustomSelector } from '../hooks/redux';
import { DeleteProduct, setSelectProduct } from "../redux/slice/productos";

interface IDataProps{
  venta: IVenta;
}

export const ItemVentaTabla = ({venta}: IDataProps):JSX.Element => {
  const {clientesArray} = useCustomSelector((state) => state.clientSlice);
  const {id, id_client, id_direccion, fecha, total, por_pagar, status} = venta;
  const dispatch = useCustomDispatch();

  const [client, setClient] = useState<IClient | null>(null);
  const [address, setAddress] = useState<string>('');
  const itemDate = new Date(fecha);

  useEffect(() => {
    clientesArray.map((cliente) => {
      if(cliente.id === id_client){
        setClient(cliente);
      }
    });
    if(client !== null){
      client.direcciones.map((direction) => {
        if(direction.id === id_direccion){
          setAddress(direction.direccion);
        }
      })
    }
  }, [client])


  return client === null
  ? <></>
  : (
  <tr>
    <td>{id}</td>
    <td>{`${client.name} ${client.app}`}</td>
    <td>{address}</td>
    <td>{`${itemDate.getDay()}/${itemDate.getMonth()}/${itemDate.getFullYear()}`}</td>
    <td>$ {(total ?? 0).toLocaleString("es-ES", {style:"currency", currency:"MXN"})}</td>
    <td>$ {(por_pagar ?? 0).toLocaleString("es-ES", {style:"currency", currency:"MXN"})}</td>
    <td>{status === 2 ? 'Pagado' : 'Con adeudo'}</td>
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
