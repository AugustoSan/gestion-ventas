export interface IPago {
  id: number;
  id_venta: number;
  fecha: string;
  monto: number;
}

export interface IAddPago {
  id_client: number;
  monto: number;
}

