import { findAllVentas, findVentasByIDClient } from "../../database/ventas";
import { IVenta } from "../../interfaces";

export const findAllVentasHandler = async (event: Electron.IpcMainInvokeEvent):Promise<Array<IVenta>> => {
  return await findAllVentas();
}

export const findVentasByClienteHandler = async (event: Electron.IpcMainInvokeEvent, id: number):Promise<Array<IVenta>> => {
  return await findVentasByIDClient(id);
}

