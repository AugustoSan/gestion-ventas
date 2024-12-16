/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import { addAddressHandler, addClienteHandler, deleteAddressHandler, deleteClienteHandler, findAddressByIdHandler, findAllAddressByClientHandler, findAllClientsHandler, findAllClientsWithPaginationHandler, findClienteByIdHandler, findClienteHandler, getAllAddressHandler, updateAddressHandler, updateClienteHandler } from './handles/Clientes';
import { addProductoHandler, deleteProductoHandler, getAllProductosWithPaginationHandler, findProductoByIdHandler, findProductoHandler, getAllProductosHandler, updateProductoHandler } from './handles/Productos';
// import { migrateDB } from './database/database';
import { addVentaHandler, findAllVentasHandler, findProductoFromVentaHandler, findVentaByIDHandler, findVentasByClienteHandler } from './handles/Ventas';
import { addPagoHandler, deletePagoHandler, findPagoByIdHandler, getAllPagosByClientHandler, getAllPagosByVentaHandler, getAllPagosHandler } from './handles/Pagos';
import { initializer } from './database/database-pg';
import { getConfigHandler } from './handles/Settings';
import { createWindow } from './mainWindow';
import { createErrorWindow } from './errorWindow';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;
let errorWindow: BrowserWindow | null = null;

// findAllClients().then((data) => {
//   console.log('data: ', data);
// });

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

ipcMain.on('get-erros-init', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

// Settings
ipcMain.handle('settings:getConfig', getConfigHandler);
// Clientes
ipcMain.handle('clients:getAllClients', findAllClientsHandler);
ipcMain.handle('clients:getAllClientsWithPagination', findAllClientsWithPaginationHandler);
ipcMain.handle('clients:findClient', findClienteHandler);
ipcMain.handle('clients:findClientById', findClienteByIdHandler);
ipcMain.handle('clients:addlClient', addClienteHandler);
ipcMain.handle('clients:updateClient', updateClienteHandler);
ipcMain.handle('clients:deleteClient', deleteClienteHandler);

//Direcciones
ipcMain.handle('address:getAllAddress', getAllAddressHandler);
ipcMain.handle('address:findAddressById', findAddressByIdHandler);
ipcMain.handle('address:getAllAddressByClient', findAllAddressByClientHandler);
ipcMain.handle('address:addlAddress', addAddressHandler);
ipcMain.handle('address:updateAddress', updateAddressHandler);
ipcMain.handle('address:deleteAddress', deleteAddressHandler);

// Productos
ipcMain.handle('products:getAllProducts', getAllProductosHandler);
ipcMain.handle('products:getAllProductsWithPagination', getAllProductosWithPaginationHandler);
ipcMain.handle('products:findProduct', findProductoHandler);
ipcMain.handle('products:findProductById', findProductoByIdHandler);
// ipcMain.handle('products:findPricesProduct', findPricesProductoHandler);
ipcMain.handle('products:addlProduct', addProductoHandler);
ipcMain.handle('products:updateProduct', updateProductoHandler);
ipcMain.handle('products:deleteProduct', deleteProductoHandler);

// Ventas
ipcMain.handle('ventas:getAllVentas', findAllVentasHandler);
ipcMain.handle('ventas:getVentaById', findVentaByIDHandler);
ipcMain.handle('ventas:getVentaByCliente', findVentasByClienteHandler);
// ipcMain.handle('ventas:getVentaByID', findVentaByIDHandler);
ipcMain.handle('ventas:getProductosFromVenta', findProductoFromVentaHandler);
ipcMain.handle('ventas:addVenta', addVentaHandler);

// Pagos
//getAllPagosHandler
ipcMain.handle('pagos:getAllPagosHandler', getAllPagosHandler);
ipcMain.handle('pagos:getAllPagosByVentaHandler', getAllPagosByVentaHandler);
ipcMain.handle('pagos:getAllPagosByClientHandler', getAllPagosByClientHandler);
ipcMain.handle('pagos:findPagoByIdHandler', findPagoByIdHandler);
ipcMain.handle('pagos:addPagoHandler', addPagoHandler);
ipcMain.handle('pagos:deletePagoHandler', deletePagoHandler);


if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}


/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    if (process.env.NODE_ENV === 'development') {
      process.exit(0); // Cierra el proceso Node.js, incluyendo Webpack
    } else {
      app.quit();
    }
  }
});

app
  .whenReady()
  .then(async () => {
    try {
      console.log(`Entro en whenReady`);
      const errors = await initializer();
      // createWindow();
      // migrateDB();

      if(errors.length > 0)
      {
        errors.forEach(error => {
          console.log(`error: ${error}`);
        });
        console.log('Errors detected:', errors);
        createErrorWindow(errorWindow, errors);
      }
      else{
        createWindow(mainWindow);
        app.on('activate', () => {
          // On macOS it's common to re-create a window in the app when the
          // dock icon is clicked and there are no other windows open.
          // if(errors.length > 0 && mainWindow === null) createErrorWindow(errors.toString());
          if ( mainWindow === null) createWindow(mainWindow);
        });
      }
    } catch (err) {
      console.error('Initialization error:', JSON.stringify(err));
      // createErrorWindow(JSON.stringify(err));
    }
  })
  .catch(console.log);
