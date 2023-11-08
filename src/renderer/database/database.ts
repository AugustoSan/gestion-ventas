import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
// import { appendLogFile } from '../../main/util'

// you would have to import / invoke this in another file
const openDb = async() => {
  return open({
    filename: '/tmp/database.db',
    driver: sqlite3.Database
  })
}

const createTables = async(): Promise<boolean> => {
  try {
    const db = await openDb();
    // Validamos que existan todas las tablas
    const tbClientes = await db.get("SELECT name FROM sqlite_master WHERE type='table' AND name= ?", 'clientes');
    const tbDirecciones = await db.get("SELECT name FROM sqlite_master WHERE type='table' AND name= ?", 'direcciones');
    const tbEgresos = await db.get("SELECT name FROM sqlite_master WHERE type='table' AND name= ?", 'egresos');
    const tbIngresos = await db.get("SELECT name FROM sqlite_master WHERE type='table' AND name= ?", 'ingresos');
    const tbProductos = await db.get("SELECT name FROM sqlite_master WHERE type='table' AND name= ?", 'productos');
    if(tbClientes === undefined || tbClientes === null){
        await db.exec('CREATE TABLE clientes ( id INTEGER PRIMARY KEY, name TEXT, tel TEXT )')
    }
    if(tbDirecciones === undefined || tbDirecciones === null){
        await db.exec('CREATE TABLE direcciones ( id INTEGER PRIMARY KEY, id_client INTEGER, direccion TEXT )')
    }
    if(tbEgresos === undefined || tbEgresos === null){
        await db.exec('CREATE TABLE egresos ( id INTEGER PRIMARY KEY, fecha TEXT, tel TEXT )')
    }
    if(tbIngresos === undefined || tbIngresos === null){
        await db.exec('CREATE TABLE clientes ( id INTEGER PRIMARY KEY, name TEXT, tel TEXT )')
    }
    if(tbProductos === undefined || tbProductos === null){
        await db.exec('CREATE TABLE clientes ( id INTEGER PRIMARY KEY, name TEXT, tel TEXT )')
    }
    return true;
  } catch (error) {
    console.log('ERROR: ', error);
    // appendLogFile({ text: error !== null && error !== undefined ? error.toString() : 'Error no encontrado en al momento d ecrear las tablas de la DB.'});
    return false;
  }
}
