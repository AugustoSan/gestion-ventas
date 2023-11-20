import sqlite3 from 'sqlite3'
import { IMigrate, open } from 'sqlite'
import path from 'path';
import fs from 'fs';
import { IClient, IDirection, IProducto } from '../interfaces';
import { findAllAddress, findAllClients } from './clientes';
import { findAllProductos } from './productos';
// import { appendLogFile } from '../../main/util'

// you would have to import / invoke this in another file
export const openDb = async() => {
  return open({
    filename: 'database.db',
    driver: sqlite3.Database
  })
}

export const createTables = async(): Promise<boolean> => {
  try {
    const db = await openDb();
    await db.exec('CREATE TABLE IF NOT EXISTS clientes ( id INTEGER PRIMARY KEY, name TEXT, app TEXT, apm TEXT, tel TEXT )');
    await db.exec('CREATE TABLE IF NOT EXISTS direcciones ( id INTEGER PRIMARY KEY, id_client INTEGER, direccion TEXT )');
    await db.exec('CREATE TABLE IF NOT EXISTS ventas ( id INTEGER PRIMARY KEY, id_client INTEGER, id_direccion INTEGER, id_producto INTEGER, fecha TEXT, cantidad REAL, total REAL, por_pagar REAL, status INTEGER )')
    await db.exec('CREATE TABLE IF NOT EXISTS pagos ( id INTEGER PRIMARY KEY, id_client INTEGER, fecha TEXT, monto REAL )')
    await db.exec('CREATE TABLE IF NOT EXISTS productos ( id INTEGER PRIMARY KEY, concepto TEXT, precio REAL)')
    await db.exec('CREATE TABLE IF NOT EXISTS precioProductoCliente ( id INTEGER PRIMARY KEY, id_producto INTEGER, id_client INTEGER, precio REAL)');
    return true;
  } catch (error) {
    console.log('ERROR: ', error);

    return false;
  }
}

export const migrateDB = async (): Promise<void> => {
  console.log('Entro en migrate');

  const db = await openDb();
  const fecha = new Date();
  const pathBackup = path.join(__dirname, `${fecha.getDay()}-${fecha.getMonth()}-${fecha.getFullYear()}-backup.sql`);
  const clientes:Array<IClient> = await findAllClients();
  const direcciones:Array<IDirection> = await findAllAddress();
  // const ventas:Array<IClient> = await findAllClients();
  // const pagos:Array<IClient> = await findAllClients();
  const productos:Array<IProducto> = await findAllProductos();
  // const precioProductoCliente:Array<IClient> = await findAllClients();
  fs.appendFileSync(pathBackup,'--- Clientes \n');
  clientes.map((cliente) => {
    const {id, name, app, apm, tel} = cliente;
    const query: string = `INSERT INTO clientes(id, name, app, apm, tel) VALUES ( ${id}, '${name}', '${app}','${apm}', '${tel}'); \n`;
    fs.appendFileSync(pathBackup,query);
  });

  fs.appendFileSync(pathBackup,'--- Direcciones \n');
  direcciones.map((address) => {
    const {id, id_client, direccion} = address;
    console.log('address: ', JSON.stringify(address));

    const query: string = `INSERT INTO direcciones(id, id_client, direccion) VALUES ( ${id}, ${id_client}, '${direccion}'); \n`;
    fs.appendFileSync(pathBackup,query);
  });

  fs.appendFileSync(pathBackup,'--- Productos \n');
  productos.map((producto) => {
    const {id, concepto, precio} = producto;
    const query: string = `INSERT INTO productos(id, concepto, precio) VALUES ( ${id}, ${concepto}, '${precio}'); \n`;
    fs.appendFileSync(pathBackup,query);
  });
}
