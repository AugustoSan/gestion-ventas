import { IVenta } from ".";
import { IPago } from "./IPagos";

export interface IFiltersGraphics {
  from: Date | null;
  to: Date | null;
  id_client: number;
  status: number;
}

export interface IGraphicResponse {
  ventas: Array<IVenta>;
  pagos: Array<IPago>;
  labelsX: Array<string>;
  labelsY: Array<string>;
}
