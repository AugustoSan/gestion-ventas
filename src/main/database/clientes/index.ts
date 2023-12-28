import { IClient, IDirection } from "../../interfaces";
import { IDataAddAddress, IDataAddClient, IDataUpdateAddress, IDataUpdateClient } from "../../interfaces/IClients";
// import { createTables, openDb } from "../database";
import { openDBPostgres } from "../database-pg";

export const findAddressByIDClient = async (id: number): Promise<Array<IDirection>> => {
  const client = await openDBPostgres();
  await client.connect();
  try {
    const temp = await client.query(`SELECT * FROM tblDirecciones WHERE id_client=${id}`);
    const result:Array<IDirection> = temp.rows;
    // const result:Array<IDirection> = await db.all(`SELECT * FROM direcciones WHERE id_client=${id}`);
    return result;
  } catch (error) {
    console.log('ERROR:', error);
    return [];
  } finally {
    await client.end();
  }
}

export const findAllClients = async ():Promise<Array<IClient>> => {
  const client = await openDBPostgres();
  await client.connect();
  try {
    console.log('entro en findAllClients');
    
    const temp = await client.query(`SELECT * FROM tblClientes`);
    const result:Array<IClient> = temp.rows;
    const allClients:Array<IClient> = await Promise.all(
      result.map(async (cliente) => {
        cliente.direcciones = await findAddressByIDClient(cliente.id);
        return cliente;
      })
    );
    return allClients;
  } catch (error) {
    console.log('ERROR:', error);
    return [];
  } finally {
    await client.end();
  }
}

export const findCliente = async (texto: string):Promise<Array<IClient>> => {
  const client = await openDBPostgres();
  await client.connect();
  try {
    const query = `SELECT * FROM tblClientes WHERE name LIKE ${texto + '%'} OR app LIKE ${texto + '%'} OR apm LIKE ${texto + '%'} OR tel LIKE ${texto + '%'}`;
    const temp = await client.query(`${query}`);
    const result:Array<IClient> = temp.rows;
    const allClients:Array<IClient> = await Promise.all(
      result.map(async (cliente) => {
        cliente.direcciones = await findAddressByIDClient(cliente.id);
        return cliente;
      })
    );
    return allClients;
  } catch (error) {
    console.log('ERROR:', error);
    return [];
  } finally {
    await client.end();
  }
}

export const addCliente = async (cliente: IDataAddClient):Promise<number> => {
  const client = await openDBPostgres();
  await client.connect();
  try {
    const {name, app, apm, tel} = cliente;
    const query = `INSERT INTO tblClientes(name, app, apm, tel) VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [name, app, apm, tel];
    const result = await client.query(query, values);
    return result.rowCount ?? 0;
  } catch (error) {
    console.log('ERROR:', error);
    return -1;
  } finally {
    await client.end();
  }
}

export const updateCliente = async (cliente: IDataUpdateClient):Promise<number> => {
  const client = await openDBPostgres();
  await client.connect();
  try {
    const { name, app, apm, tel} = cliente.client;
    const query = `UPDATE tblClientes SET name=$1, app=$2, apm=$3, tel=$4 WHERE id=$5`;
    const values = [name, app, apm, tel, cliente.id];
    const result = await client.query(query, values);
    return result.rowCount ?? 0;
  } catch (error) {
    console.log('ERROR:', error);
    return -1;
  } finally {
    await client.end();
  }
}


export const deleteCliente = async (id: number):Promise<number> => {
  const client = await openDBPostgres();
  await client.connect();
  try {
    const result = await client.query(`DELETE FROM tblClientes WHERE id=${id}`);
    return result.rowCount ?? 0;
  } catch (error) {
    console.log('ERROR:', error);
    return -1;
  } finally {
    await client.end();
  }
}

// Direcciones
export const findAllAddress = async ():Promise<Array<IDirection>> => {
  const client = await openDBPostgres();
  await client.connect();
  try {
    const temp = await client.query(`SELECT * FROM tblDirecciones`);
    const result:Array<IDirection> = temp.rows;
    return result;
  } catch (error) {
    console.log('ERROR:', error);
    return [];
  } finally {
    await client.end();
  }
}

export const findAllAddressByClient = async (id: number):Promise<Array<IDirection>> => {
  const client = await openDBPostgres();
  await client.connect();
  try {
    const temp = await client.query(`SELECT * FROM tblDirecciones WHERE id_client=${id}`);
    const result:Array<IDirection> = temp.rows;
    return result;
  } catch (error) {
    console.log('ERROR:', error);
    return [];
  } finally {
    await client.end();
  }
}

export const addAddress = async (direccion: IDataAddAddress):Promise<number> => {
  const client = await openDBPostgres();
  await client.connect();
  try {
    const {id_client, direccion:dir } = direccion;
    const query = `INSERT INTO tblDirecciones(id_client, direccion) VALUES ($1, $2) RETURNING *`;
    const values = [id_client, dir];
    const result = await client.query(query, values);
    // const result = await client.query(`INSERT INTO tblDirecciones(id_client, direccion) VALUES (${direccion.id_client}, ${ direccion.direccion})`);
    return result.rowCount ?? 0;
  } catch (error) {
    console.log('ERROR:', error);
    return -1;
  } finally {
    await client.end();
  }
}

export const updateAddress = async (direccion: IDataUpdateAddress):Promise<number> => {
  const client = await openDBPostgres();
  await client.connect();
  try {
    const query = `UPDATE tblDirecciones SET direccion=$1 WHERE id=$2 RETURNING *`;
    const values = [direccion.direccion, direccion.id];
    const result = await client.query(query, values);
    return result.rowCount ?? 0;
  } catch (error) {
    console.log('ERROR:', error);
    return -1;
  } finally {
    await client.end();
  }
}

export const deleteAddress = async (id: number):Promise<number> => {
  const client = await openDBPostgres();
  await client.connect();
  try {
    const result = await client.query(`DELETE FROM tblDirecciones WHERE id=${id}`);
    return result.rowCount ?? 0;
  } catch (error) {
    console.log('ERROR:', error);
    return -1;
  } finally {
    await client.end();
  }
}
