export interface IDataAddClient {
  name: string;
  app: string;
  apm: string;
  tel: string;
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
