import { addVenta, findAllVentas, findProductFromVenta, findVentaById, findVentasByIDClient } from "../../database/ventas";
import { IVenta, IVentasProductos } from "../../interfaces";
import { IDataPagination } from "../../interfaces/IProducts";
import { IDataAddVenta } from "../../interfaces/IVentas";
import { PagedList } from "../../utils/Pagination";

export const findAllVentasHandler = async (event: Electron.IpcMainInvokeEvent, data: IDataPagination):Promise<PagedList<IVenta>> => {
  return await findAllVentas(data);
}

export const findVentasByClienteHandler = async (event: Electron.IpcMainInvokeEvent, id: number, data: IDataPagination):Promise<PagedList<IVenta>> => {
  return await findVentasByIDClient(id, data);
}

export const findVentaByIDHandler = async (event: Electron.IpcMainInvokeEvent, id: number):Promise<IVenta | null> => {
  return await findVentaById(id);
}

export const findProductoFromVentaHandler = async (event: Electron.IpcMainInvokeEvent, id: number):Promise<Array<IVentasProductos>> => {
  return await findProductFromVenta(id);
}

export const addVentaHandler = async (event: Electron.IpcMainInvokeEvent, venta: IDataAddVenta):Promise<number> => {
  return await addVenta(venta);
}
