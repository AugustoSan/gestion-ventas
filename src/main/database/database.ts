import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { IClient } from '../interfaces'
import { IDataAddClient, IDataUpdateClient } from '../interfaces/IClients'
// import { appendLogFile } from '../../main/util'

// you would have to import / invoke this in another file
const openDb = async() => {
  return open({
    filename: 'database.db',
    driver: sqlite3.Database
  })
  // return new sqlite3.Database('tmp/databasedatos.db', (err) => {
  //   if (err) {
  //       console.error('Error al abrir la base de datos:', err.message);
  //   } else {
  //       console.log('Conexión exitosa a la base de datos');
  //   }
  // });
}

const createTables = async(): Promise<boolean> => {
  try {
    const db = await openDb();
    await db.exec('CREATE TABLE IF NOT EXISTS clientes ( id INTEGER PRIMARY KEY, name TEXT, app TEXT, apm TEXT, tel TEXT )');
    await db.exec('CREATE TABLE IF NOT EXISTS direcciones ( id INTEGER PRIMARY KEY, id_client INTEGER, direccion TEXT )');
    await db.exec('CREATE TABLE IF NOT EXISTS egresos ( id INTEGER PRIMARY KEY, id_client INTEGER, id_producto INTEGER, fecha TEXT, cantidad REAL )')
    await db.exec('CREATE TABLE IF NOT EXISTS tbIngresos ( id INTEGER PRIMARY KEY, id_client INTEGER, fecha TEXT, monto REAL )')
    await db.exec('CREATE TABLE IF NOT EXISTS tbProductos ( id INTEGER PRIMARY KEY, concepto TEXT)')
    // Validamos que existan todas las tablas
    // const tbClientes = await db.get("SELECT name FROM sqlite_master WHERE type='table' AND name= ?", 'clientes');
    // const tbDirecciones = await db.get("SELECT name FROM sqlite_master WHERE type='table' AND name= ?", 'direcciones');
    // const tbEgresos = await db.get("SELECT name FROM sqlite_master WHERE type='table' AND name= ?", 'egresos');
    // const tbIngresos = await db.get("SELECT name FROM sqlite_master WHERE type='table' AND name= ?", 'ingresos');
    // const tbProductos = await db.get("SELECT name FROM sqlite_master WHERE type='table' AND name= ?", 'productos');
    // if(tbClientes === undefined || tbClientes === null){
    //     await db.exec('CREATE TABLE clientes ( id INTEGER PRIMARY KEY, name TEXT, app TEXT, apm TEXT, tel TEXT )')
    // }
    // if(tbDirecciones === undefined || tbDirecciones === null){
    //     await db.exec('CREATE TABLE direcciones ( id INTEGER PRIMARY KEY, id_client INTEGER, direccion TEXT )')
    // }
    // if(tbEgresos === undefined || tbEgresos === null){
    //     await db.exec('CREATE TABLE egresos ( id INTEGER PRIMARY KEY, id_client INTEGER, id_producto INTEGER, fecha TEXT, cantidad REAL )')
    // }
    // if(tbIngresos === undefined || tbIngresos === null){
    //     await db.exec('CREATE TABLE tbIngresos ( id INTEGER PRIMARY KEY, id_client INTEGER, fecha TEXT, monto REAL )')
    // }
    // if(tbProductos === undefined || tbProductos === null){
    //     await db.exec('CREATE TABLE tbProductos ( id INTEGER PRIMARY KEY, concepto TEXT)')
    // }
    return true;
  } catch (error) {
    console.log('ERROR: ', error);
    // appendLogFile({ text: error !== null && error !== undefined ? error.toString() : 'Error no encontrado en al momento d ecrear las tablas de la DB.'});
    return false;
  }
}

export const findAllClients = async ():Promise<Array<IClient>> => {
  try {
    if(!(await createTables())){
      return [];
    }
    const db = await openDb();
    const result:Array<IClient> = await db.all('SELECT * FROM clientes');
    return result;
  } catch (error) {
    console.log('ERROR:', error);
    return [];
  }
}

export const addCliente = async (cliente: IDataAddClient):Promise<number> => {
  try {
    if(!(await createTables())){
      return -2;
    }
    const db = await openDb();
    const result = await db.run('INSERT INTO clientes(name, app, apm, tel) VALUES (:name, :app, :apm, :tel)', {
      ':name': cliente.name,
      ':app': cliente.app,
      ':apm': cliente.apm,
      ':tel': cliente.tel
    });
    console.log(`changes: ${result.changes}`);
    console.log(`lastID: ${result.lastID}`);
    return result.lastID ?? 0;
  } catch (error) {
    console.log('ERROR:', error);
    return -1;
  }
}

export const updateCliente = async (cliente: IDataUpdateClient):Promise<number> => {
  try {
    if(!(await createTables())){
      return -2;
    }
    const db = await openDb();
    const result = await db.run('UPDATE clientes SET name=:name, app=:app, apm=:apm, tel=:tel WHERE id=:id', {
      ':id': cliente.id,
      ':name': cliente.client.name,
      ':app': cliente.client.app,
      ':apm': cliente.client.apm,
      ':tel': cliente.client.tel
    });
    console.log(`changes: ${result.changes}`);
    console.log(`lastID: ${result.lastID}`);

    return result.changes ?? 0;
  } catch (error) {
    console.log('ERROR:', error);
    return -1;
  }
}


export const deleteCliente = async (id: number):Promise<number> => {
  try {
    if(!(await createTables())){
      return -2;
    }
    const db = await openDb();
    const result = await db.run('DELETE FROM clientes WHERE id=:id', {
      ':id': id
    });
    console.log(`changes: ${result.changes}`);
    console.log(`lastID: ${result.lastID}`);
    return result.changes ?? 0;
  } catch (error) {
    console.log('ERROR:', error);
    return -1;
  }
}
