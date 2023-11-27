import { addVenta, findAllVentas, findProductFromVenta, findVentaByID, findVentasByIDClient } from "../../database/ventas";
import { IVenta, IVentasProductos } from "../../interfaces";
import { IDataAddVenta } from "../../interfaces/IVentas";

export const findAllVentasHandler = async (event: Electron.IpcMainInvokeEvent):Promise<Array<IVenta>> => {
  return await findAllVentas();
}

export const findVentasByClienteHandler = async (event: Electron.IpcMainInvokeEvent, id: number):Promise<Array<IVenta>> => {
  return await findVentasByIDClient(id);
}

export const findVentaByIDHandler = async (event: Electron.IpcMainInvokeEvent, id: number):Promise<IVenta> => {
  return await findVentaByID(id);
}

export const findProductoFromVentaHandler = async (event: Electron.IpcMainInvokeEvent, id: number):Promise<Array<IVentasProductos>> => {
  return await findProductFromVenta(id);
}

export const addVentaHandler = async (event: Electron.IpcMainInvokeEvent, venta: IDataAddVenta):Promise<number> => {
  return await addVenta(venta);
}
