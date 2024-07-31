import { addProducto, deleteProducto, findAllProductos, findProducto, findProductoById, updateProducto } from '../../database/productos';
import { IPriceProduct, IProducto } from '../../interfaces';
import { IDataAddProduct, IDataFindPricesProduct, IDataPagination, IDataUpdateProduct } from '../../interfaces/IProducts';
import { PagedList } from '../../utils/Pagination';

export const findAllProductosHandler = async (event: Electron.IpcMainInvokeEvent, data: IDataPagination):Promise<PagedList<IProducto>> => {
  return await findAllProductos(data);
}

export const findProductoHandler = async (event: Electron.IpcMainInvokeEvent, concepto: string, data: IDataPagination):Promise<PagedList<IProducto>> => {
  return await findProducto(concepto, data);
}

export const findProductoByIdHandler = async (event: Electron.IpcMainInvokeEvent, id: number):Promise<IProducto | null> => {
  return await findProductoById(id);
}

export const addProductoHandler = async (event: Electron.IpcMainInvokeEvent, data:IDataAddProduct):Promise<number> => {
  return await addProducto(data);
}

export const updateProductoHandler = async (event: Electron.IpcMainInvokeEvent, data:IDataUpdateProduct):Promise<number> => {
  return await updateProducto(data);
}

export const deleteProductoHandler = async (event: Electron.IpcMainInvokeEvent, data:number):Promise<number> => {
  return await deleteProducto(data);
}

// export const findPricesProductoHandler = async (event: Electron.IpcMainInvokeEvent, data: IDataFindPricesProduct):Promise<Array<IPriceProduct>> => {
//   return await getAllPricesProduct(data);
// }
