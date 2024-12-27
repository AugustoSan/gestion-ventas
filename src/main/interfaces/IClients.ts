export interface IDirection {
  id: number;
  id_client: number;
  direccion: string;
}
export interface IClient {
  id: number;
  nombre: string;
  apellidopaterno: string,
  apellidomaterno: string;
  saldo: number;
  telefono: string;
  direcciones: IDirection[];
}
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

export interface IDataRequestSearchWithString
{
  isValid: boolean;
  match: string;
}

export interface IDataRequestSearchWithStringAndPagination
{
  isValid: boolean;
  match: string;
  page: number;
  sizePage: number;
}

