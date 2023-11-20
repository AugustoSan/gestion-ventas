import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { IClient } from '../interfaces'
import { IDataAddClient, IDataUpdateClient } from '../interfaces/IClients'
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
    await db.exec('CREATE TABLE IF NOT EXISTS ventas ( id INTEGER PRIMARY KEY, id_client INTEGER, id_direccion INTEGER, id_producto INTEGER, fecha TEXT, cantidad REAL, total REAL )')
    await db.exec('CREATE TABLE IF NOT EXISTS pagos ( id INTEGER PRIMARY KEY, id_client INTEGER, fecha TEXT, monto REAL )')
    await db.exec('CREATE TABLE IF NOT EXISTS productos ( id INTEGER PRIMARY KEY, concepto TEXT, precio REAL)')
    await db.exec('CREATE TABLE IF NOT EXISTS precioProductoCliente ( id INTEGER PRIMARY KEY, id_producto INTEGER, id_client INTEGER, precio REAL)');
    return true;
  } catch (error) {
    console.log('ERROR: ', error);
    return false;
  }
}
