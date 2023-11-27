import { IClient, IDirection } from '../../interfaces';
import { IDataAddAddress, IDataAddClient, IDataUpdateAddress, IDataUpdateClient } from '../../interfaces/IClients';
import { addAddress, addCliente, deleteAddress, deleteCliente, findAddressByIDClient, findAllAddress, findAllClients, findCliente, updateAddress, updateCliente } from './../../database/clientes';

export const findAllClientsHandler = async (event: Electron.IpcMainInvokeEvent):Promise<Array<IClient>> => {
  return await findAllClients();
}

export const findClienteHandler = async (event: Electron.IpcMainInvokeEvent, texto: string):Promise<Array<IClient>> => {
  return await findCliente(texto);
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
