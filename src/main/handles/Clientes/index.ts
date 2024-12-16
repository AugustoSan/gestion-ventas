import { IClient, IDirection } from '../../interfaces';
import { IDataAddAddress, IDataAddClient, IDataUpdateAddress, IDataUpdateClient } from '../../interfaces/IClients';
import { addAddress, addCliente, deleteAddress, deleteCliente, findAddressByIDClient, findAddressById, findAllAddress, findAllClients, findAllClientsWithPagination, findCliente, findClienteById, updateAddress, updateCliente } from '../../database/clientes/';
import { PagedList } from '../../utils/Pagination';
import { IDataPagination } from '../../interfaces/IProducts';

export const findAllClientsWithPaginationHandler = async (event: Electron.IpcMainInvokeEvent, data: IDataPagination):Promise<PagedList<IClient>> => {
  return await findAllClientsWithPagination(data);
}
export const findAllClientsHandler = async (event: Electron.IpcMainInvokeEvent, data: IDataPagination):Promise<Array<IClient>> => {
  return await findAllClients();
}

export const findClienteHandler = async (event: Electron.IpcMainInvokeEvent, texto: string, data: IDataPagination):Promise<PagedList<IClient>> => {
  return await findCliente(texto, data);
}

export const findClienteByIdHandler = async (event: Electron.IpcMainInvokeEvent, id: number):Promise<IClient | null> => {
  return await findClienteById(id);
}

export const addClienteHandler = async (event: Electron.IpcMainInvokeEvent, data:IDataAddClient):Promise<number> => {
  return await addCliente(data);
}

export const updateClienteHandler = async (event: Electron.IpcMainInvokeEvent, data:IDataUpdateClient):Promise<number> => {
  return await updateCliente(data);
}

export const deleteClienteHandler = async (event: Electron.IpcMainInvokeEvent, data:number):Promise<number> => {
  return await deleteCliente(data);
}

// Direcciones
export const getAllAddressHandler = async (event: Electron.IpcMainInvokeEvent):Promise<Array<IDirection>> => {
  return await findAllAddress();
}

export const findAddressByIdHandler = async (event: Electron.IpcMainInvokeEvent, id: number):Promise<IDirection | null> => {
  return await findAddressById(id);
}

export const findAllAddressByClientHandler = async (event: Electron.IpcMainInvokeEvent, id: number):Promise<Array<IDirection>> => {
  return await findAddressByIDClient(id);
}

export const addAddressHandler = async (event: Electron.IpcMainInvokeEvent, data:IDataAddAddress):Promise<number> => {
  return await addAddress(data);
}

export const updateAddressHandler = async (event: Electron.IpcMainInvokeEvent, data:IDataUpdateAddress):Promise<number> => {
  return await updateAddress(data);
}

export const deleteAddressHandler = async (event: Electron.IpcMainInvokeEvent, data:number):Promise<number> => {
  return await deleteAddress(data);
}
