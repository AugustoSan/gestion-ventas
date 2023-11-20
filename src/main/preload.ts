// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { IClient, IProducto } from './interfaces';
import { IDataAddAddress, IDataAddClient, IDataUpdateAddress, IDataUpdateClient } from './interfaces/IClients';
import { IDataAddProduct, IDataUpdateProduct } from './interfaces/IProducts';

export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    // Clients
    GetAllClients:():Promise<Array<IClient>> => ipcRenderer.invoke('clients:getAllClients', []),
    FindCliente:(texto: string):Promise<Array<IClient>> => ipcRenderer.invoke('clients:findClient', texto),
    AddClient:(data: IDataAddClient):Promise<number> => ipcRenderer.invoke('clients:addlClient', data),
    UpdateClient:(data: IDataUpdateClient):Promise<number> => ipcRenderer.invoke('clients:updateClient', data),
    DeleteClient:(data: number):Promise<number> => ipcRenderer.invoke('clients:deleteClient', data),
    // Direcciones
    AddAddress:(data: IDataAddAddress):Promise<number> => ipcRenderer.invoke('address:addlAddress', data),
    UpdateAddress:(data: IDataUpdateAddress):Promise<number> => ipcRenderer.invoke('address:updateAddress', data),
    DeleteAddress:(data: number):Promise<number> => ipcRenderer.invoke('address:deleteAddress', data),
    // Products
    GetAllProducts:():Promise<Array<IProducto>> => ipcRenderer.invoke('products:getAllProducts', []),
    FindProducto:(concepto: string):Promise<Array<IProducto>> => ipcRenderer.invoke('products:findProduct', concepto),
    AddProduct:(data: IDataAddProduct):Promise<number> => ipcRenderer.invoke('products:addlProduct', data),
    UpdateProduct:(data: IDataUpdateProduct):Promise<number> => ipcRenderer.invoke('products:updateProduct', data),
    DeleteProduct:(data: number):Promise<number> => ipcRenderer.invoke('products:deleteProduct', data),
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
