export interface IDataAddClient {
  nombre: string;
  apellidopaterno: string;
  apellidomaterno: string;
  telefono: string;
  direccioness: Array<string>
}

export interface IDataUpdateClient {
  id: number;
  client: IDataAddClient;
}

export interface IDataAddAddress {
  id_client: number;
  direccion: string;
}

export interface IDataUpdateAddress {
  id: number;
  direccion: IDataAddAddress;
}

