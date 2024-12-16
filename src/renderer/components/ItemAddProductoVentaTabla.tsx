import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { IClient, IPrecioProductoCliente, IProducto } from "../../main/interfaces";
import { useCustomDispatch, useCustomSelector } from '../hooks/redux';
import { IDataAddVentaProductos } from "../../main/interfaces/IVentas";
// import { FindPricesProduct } from "../redux/slice/productos";

interface IDataProps {
  producto: IProducto;
  cliente: IClient;
}

export const ItemAddProductoVentaTabla = ({ producto, cliente}: IDataProps):JSX.Element => {
  const {id, concepto, precio} = producto;
  const {addVentaListPricesProduct} = useCustomSelector((state) => state.ventaSlice);
  const dispatch = useCustomDispatch();
  const [inputCantidad, setInputCantidad] = useState<number>(0);

  // useEffect(() => {
  //   if(producto !== null && producto.id !== 0 && producto.concepto.length > 2){
  //     dispatch(FindPricesProduct({id_cliente: cliente.id, id_product: producto.id}));
  //   }
  // }, [cliente, producto]);


  return (
  <tr>
    <td>{id}</td>
    <td>{concepto}</td>
    <td>
      <Form.Control
        aria-label="Default"
        aria-describedby="inputGroup-sizing-default"
        value={inputCantidad}
        onChange={(event) => {
          try {
            setInputCantidad(Number(event.target.value))
          } catch (error) {
            alert('La entrada del dato deben ser números')
          }
        }}
        placeholder={'Cantidad'}
      />
    </td>
    <td>$ Precios</td>
    <td>$ Total</td>
    <td>
      <Button
        variant="danger"
        onClick={
          () => {
            console.log(`se eliminara el producto de la venta`);
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
