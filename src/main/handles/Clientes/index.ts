import { IClient } from '../../interfaces';
import { IDataAddClient, IDataUpdateClient } from '../../interfaces/IClients';
import { addCliente, deleteCliente, findAllClients, findCliente, updateCliente } from './../../database/clientes';

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
