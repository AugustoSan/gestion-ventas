import { IClient, IDirection, IPrecioProductoCliente, IProducto } from ".";

export interface IDataAddVentaProductos {
  producto: IProducto;
  // precio: IPrecioProductoCliente;
  cantidad: number;
}

export interface IDataAddVenta {
  client: IClient;
  direccion: IDirection;
  fecha: string;
  total: number;
  por_pagar: number;
  status: number;
  productos: Array<IDataAddVentaProductos>
}

// export interface IDataUpdateClient {
//   id: number;
//   client: IDataAddClient;
// }

// export interface IDataAddAddress {
//   id_client: number;
//   direccion: string;
// }

// export interface IDataUpdateAddress {
//   id: number;
//   direccion: IDataAddAddress;
// }
