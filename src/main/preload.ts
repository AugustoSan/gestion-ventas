// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { IClient, IDirection, IPriceProduct, IProducto, IVenta, IVentasProductos } from './interfaces';
import { IDataAddAddress, IDataAddClient, IDataUpdateAddress, IDataUpdateClient } from './interfaces/IClients';
import { IDataAddProduct, IDataFindPricesProduct, IDataPagination, IDataUpdateProduct } from './interfaces/IProducts';
import { IDataAddVenta } from './interfaces/IVentas';
import { PagedList } from './utils/Pagination';

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
    FindClienteById:(id: number):Promise<IClient | null> => ipcRenderer.invoke('clients:findClientById', id),
    AddClient:(data: IDataAddClient):Promise<number> => ipcRenderer.invoke('clients:addlClient', data),
    UpdateClient:(data: IDataUpdateClient):Promise<number> => ipcRenderer.invoke('clients:updateClient', data),
    DeleteClient:(data: number):Promise<number> => ipcRenderer.invoke('clients:deleteClient', data),
    // Direcciones
    GetAllAddress:():Promise<Array<IDirection>> => ipcRenderer.invoke('address:getAllAddress', []),
    FindAllAddressByClient:(id: number):Promise<Array<IDirection>> => ipcRenderer.invoke('address:getAllAddressByClient', id),
    AddAddress:(data: IDataAddAddress):Promise<number> => ipcRenderer.invoke('address:addlAddress', data),
    UpdateAddress:(data: IDataUpdateAddress):Promise<number> => ipcRenderer.invoke('address:updateAddress', data),
    DeleteAddress:(data: number):Promise<number> => ipcRenderer.invoke('address:deleteAddress', data),
    // Products
    GetAllProducts:(data: IDataPagination):Promise<PagedList<IProducto>> => ipcRenderer.invoke('products:getAllProducts', data),
    FindProducto:(concepto: string):Promise<Array<IProducto>> => ipcRenderer.invoke('products:findProduct', concepto),
    // FindPricesProducto:(data: IDataFindPricesProduct):Promise<Array<IPriceProduct>> => ipcRenderer.invoke('products:findPricesProduct', data),
    AddProduct:(data: IDataAddProduct):Promise<number> => ipcRenderer.invoke('products:addlProduct', data),
    UpdateProduct:(data: IDataUpdateProduct):Promise<number> => ipcRenderer.invoke('products:updateProduct', data),
    DeleteProduct:(data: number):Promise<number> => ipcRenderer.invoke('products:deleteProduct', data),
    // Ventas
    GetAllVentas:(data: IDataPagination):Promise<PagedList<IVenta>> => ipcRenderer.invoke('ventas:getAllVentas', data),
    GetAllVentasByCliente:(id: number):Promise<Array<IVenta>> => ipcRenderer.invoke('ventas:getVentaByCliente', id),
    GetProductosFromVenta:(id: number):Promise<Array<IVentasProductos>> => ipcRenderer.invoke('ventas:getProductosFromVenta', id),
    // GetVentaByID:(id: number):Promise<IVenta> => ipcRenderer.invoke('ventas:getVentaByID', id),
    AddVenta:(venta: IDataAddVenta):Promise<number> => ipcRenderer.invoke('ventas:addVenta', venta),
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
