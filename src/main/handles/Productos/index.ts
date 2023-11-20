import { addProducto, deleteProducto, findAllProductos, findProducto, updateProducto } from '../../database/productos';
import { IProducto } from '../../interfaces';
import { IDataAddProduct, IDataUpdateProduct } from '../../interfaces/IProducts';

export const findAllProductosHandler = async (event: Electron.IpcMainInvokeEvent):Promise<Array<IProducto>> => {
  return await findAllProductos();
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
