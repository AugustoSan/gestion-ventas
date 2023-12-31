export interface IDirection {
  id: number;
  id_client: number;
  direccion: string;
}

export interface IClient {
  id: number;
  name: string;
  app: string,
  apm: string;
  saldo: number;
  tel: string;
  direcciones: IDirection[];
}

export interface IPriceProduct {
  id: number;
  id_producto: number;
  id_client: number;
  precio: number;
}

export interface IProducto {
  id: number;
  concepto: string;
  precio: number;
  list_prices: Array<IPriceProduct>
}

export interface IPago {
  id: number;
  id_client: number;
  fecha: string;
  monto: number;
}

export interface IVentasProductos {
  id: number;
  id_venta: number;
  id_producto: number;
  id_precio: number;
  cantidad: number;
}

export interface IVenta {
  id: number;
  id_client: number;
  id_direccion: number;
  fecha: string;
  total: number;
  por_pagar: number;
  status: number;
  productos: Array<IVentasProductos>
}

export interface IPrecioProductoCliente {
  id: number;
  id_producto: number;
  id_client: number;
  precio: number;
}

export interface IItemMenu {
  title: string;
  href: string;
  icon: JSX.Element;
}
