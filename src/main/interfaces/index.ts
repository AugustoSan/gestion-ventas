export interface IDirection {
  id: number;
  idClient: number;
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

export interface IProducto {
  id: number;
  concepto: string;
  precio: number;
}

export interface IPago {
  id: number;
  idClient: number;
  fecha: string;
  monto: number;
}

export interface IVenta {
  id: number;
  idCliente: number;
  idProducto: IProducto;
  fechaVenta: string;
  cantidad: number;
  total: number;
}
