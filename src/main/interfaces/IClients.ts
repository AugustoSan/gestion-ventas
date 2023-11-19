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
