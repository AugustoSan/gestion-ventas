import { IClient, IDirection } from "../../interfaces";
import { IDataAddAddress, IDataAddClient, IDataUpdateAddress, IDataUpdateClient } from "../../interfaces/IClients";
import { createTables, openDb } from "../database";

export const findAddressByIDClient = async (id: number): Promise<Array<IDirection>> => {
  try {
    if(!(await createTables())){
      return [];
    }
    const db = await openDb();
    const result:Array<IDirection> = await db.all(`SELECT * FROM direcciones WHERE id_client=${id}`);
    console.log(`clientAddress: ${id}   address: ${result}`);
    return result;
  } catch (error) {
    console.log('ERROR:', error);
    return [];
  }
}

export const findAllClients = async ():Promise<Array<IClient>> => {
  try {
    if(!(await createTables())){
      return [];
    }
    const db = await openDb();
    const result:Array<IClient> = await db.all('SELECT * FROM clientes');
    const allClients:Array<IClient> = await Promise.all(
      result.map(async (cliente) => {
        cliente.direcciones = await findAddressByIDClient(cliente.id);
        return cliente;
      })
    );
    console.log('allClients: ', allClients);
    return allClients;
  } catch (error) {
    console.log('ERROR:', error);
    return [];
  }
}

export const findCliente = async (texto: string):Promise<Array<IClient>> => {
  try {
    if(!(await createTables())){
      return [];
    }
    const db = await openDb();
    const query = `SELECT * FROM clientes WHERE name LIKE '%${texto}%' OR app LIKE '%${texto}%' OR apm LIKE '%${texto}%' OR tel LIKE '%${texto}%'`;
    console.log('query:', query);
    const result:Array<IClient> = await db.all(query);
    const allClients:Array<IClient> = await Promise.all(
      result.map(async (cliente) => {
        cliente.direcciones = await findAddressByIDClient(cliente.id);
        return cliente;
      })
    );
    console.log('allClients: ', allClients);
    return allClients;
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

// Direcciones
export const addAddress = async (direccion: IDataAddAddress):Promise<number> => {
  try {
    if(!(await createTables())){
      return -2;
    }
    const db = await openDb();
    const result = await db.run('INSERT INTO direcciones(id_client, direccion) VALUES (:cliente, :direccion)', {
      ':cliente': direccion.id_client,
      ':direccion': direccion.direccion,
    });
    console.log(`changes: ${result.changes}`);
    console.log(`lastID: ${result.lastID}`);
    return result.lastID ?? 0;
  } catch (error) {
    console.log('ERROR:', error);
    return -1;
  }
}

export const updateAddress = async (direccion: IDataUpdateAddress):Promise<number> => {
  try {
    if(!(await createTables())){
      return -2;
    }
    const db = await openDb();
    const result = await db.run('UPDATE direcciones SET direccion=:direccion WHERE id=:id', {
      ':id': direccion.id,
      ':direccion': direccion.direccion.direccion
    });
    console.log(`changes: ${result.changes}`);
    console.log(`lastID: ${result.lastID}`);

    return result.changes ?? 0;
  } catch (error) {
    console.log('ERROR:', error);
    return -1;
  }
}

export const deleteAddress = async (id: number):Promise<number> => {
  try {
    if(!(await createTables())){
      return -2;
    }
    const db = await openDb();
    const result = await db.run('DELETE FROM direcciones WHERE id=:id', {
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
