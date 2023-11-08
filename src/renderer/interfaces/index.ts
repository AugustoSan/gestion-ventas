export interface IDiretion {
  id: number;
  idClient: number;
  direccion: string;
}

export interface IClient {
  id: number;
  nombre: string;
  app: string,
  apm: string;
  saldo: number;
  telefono: string;
  direcciones: IDiretion[];
}

export interface IProducto {
  id: number;
  descripcion: string;
  precio: number;
}

export interface IPago {
  id: number;
  fecha: string;
  cantidad: number;
}

export interface IVenta {
  id: number;
  fechaVenta: string;
  cantidad: number;
  producto: IProducto;
  fechaPago: IPago[];
}
