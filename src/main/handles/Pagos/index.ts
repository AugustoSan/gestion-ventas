import { findPagoById, getAllPagosByVenta } from '../../database/pagos';
import { IPago } from '../../interfaces';
// import { PagedList } from '../../utils/Pagination';

// export const getAllProductosWithPaginationHandler = async (event: Electron.IpcMainInvokeEvent, data: IDataPagination):Promise<PagedList<IProducto>> => {
//   return await findAllProductos(data);
// }

export const getAllPagosByVentaHandler = async (event: Electron.IpcMainInvokeEvent, id: number):Promise<Array<IPago>> => {
  return await getAllPagosByVenta(id);
}

export const findPagoByIdHandler = async (event: Electron.IpcMainInvokeEvent, id: number):Promise<IPago | null> => {
  return await findPagoById(id);
}

// export const addProductoHandler = async (event: Electron.IpcMainInvokeEvent, data:IDataAddProduct):Promise<number> => {
//   return await addProducto(data);
// }

// export const updateProductoHandler = async (event: Electron.IpcMainInvokeEvent, data:IDataUpdateProduct):Promise<number> => {
//   return await updateProducto(data);
// }

// export const deleteProductoHandler = async (event: Electron.IpcMainInvokeEvent, data:number):Promise<number> => {
//   return await deleteProducto(data);
// }
