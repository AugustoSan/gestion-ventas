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

export interface IVentasProductos {
  id: number;
  id_venta: number;
  id_producto: number;
  id_precio: number;
  cantidad: number;
}

export interface ITypeVenta {
  id: number;
  id_client: number;
  id_direccion: number;
  fecha: Date;
  total: number;
  por_pagar: number;
  estatus: number;
  productos: Array<IVentasProductos>
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
