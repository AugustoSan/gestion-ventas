import { addPago, findPagoById, getAllPagos, getAllPagosByClient, getAllPagosByVenta } from '../../database/pagos';
import { IPago } from '../../interfaces';
import { IAddPago } from '../../interfaces/IPagos';
// import { PagedList } from '../../utils/Pagination';

// export const getAllProductosWithPaginationHandler = async (event: Electron.IpcMainInvokeEvent, data: IDataPagination):Promise<PagedList<IProducto>> => {
//   return await findAllProductos(data);
// }

export const getAllPagosHandler = async (event: Electron.IpcMainInvokeEvent):Promise<Array<IPago>> => {
  return await getAllPagos();
}

export const getAllPagosByVentaHandler = async (event: Electron.IpcMainInvokeEvent, id: number):Promise<Array<IPago>> => {
  return await getAllPagosByVenta(id);
}

export const getAllPagosByClientHandler = async (event: Electron.IpcMainInvokeEvent, id: number):Promise<Array<IPago>> => {
  console.log('handle id: ', id);
  return await getAllPagosByClient(id);
}

export const findPagoByIdHandler = async (event: Electron.IpcMainInvokeEvent, id: number):Promise<IPago | null> => {
  return await findPagoById(id);
}

export const addPagoHandler = async (event: Electron.IpcMainInvokeEvent, data:IAddPago):Promise<number> => {
  return await addPago(data);
}

// export const updateProductoHandler = async (event: Electron.IpcMainInvokeEvent, data:IDataUpdateProduct):Promise<number> => {
//   return await updateProducto(data);
// }

// export const deleteProductoHandler = async (event: Electron.IpcMainInvokeEvent, data:number):Promise<number> => {
//   return await deleteProducto(data);
// }
