export interface IDiretion {
  id: number;
  idClient: number;
  direccion: string;
}

export interface ITelefono {
  id: number;
  idClient: number;
  telefono: string;
}

export interface IClient {
  id: number;
  nombre: string;
  saldo: number;
  telefonos: ITelefono[];
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
