import { addProducto, deleteProducto, findAllProductos, findProducto, updateProducto } from '../../database/productos';
import { IPriceProduct, IProducto } from '../../interfaces';
import { IDataAddProduct, IDataFindPricesProduct, IDataGetProducts, IDataUpdateProduct } from '../../interfaces/IProducts';
import { PagedList } from '../../utils/Pagination';

export const findAllProductosHandler = async (event: Electron.IpcMainInvokeEvent, data: IDataGetProducts):Promise<PagedList<IProducto>> => {
  return await findAllProductos(data);
}

export const findProductoHandler = async (event: Electron.IpcMainInvokeEvent, concepto: string):Promise<Array<IProducto>> => {
  return await findProducto(concepto);
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
