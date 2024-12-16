import { IClient, IDirection, IPrecioProductoCliente, IProducto } from ".";

export interface IDataAddVentaProductos {
  id_producto: number;
  precio: number;
  cantidad: number;
}

export interface IDataAddVenta {
  id_client: number;
  id_direccion: number;
  fecha: string;
  total: number;
  pagado: number;
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
