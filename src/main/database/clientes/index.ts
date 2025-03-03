import { IClient, IDirection } from "../../interfaces";
import { IDataAddAddress, IDataAddClient, IDataUpdateAddress, IDataUpdateClient } from "../../interfaces/IClients";
import { IDataPagination } from "../../interfaces/IProducts";
import { PagedList } from "../../utils/Pagination";
import { getClientDB } from "../database-pg";
import {
  fn_deleteAddress, fn_deleteClient, fn_FindAddressById, fn_FindClientById, fn_findMatchClients,
  fn_getAllAddress, fn_getAllAddressByClient, fn_getAllClients, fn_insertAddress, fn_insertClient,
  fn_updateAddress, fn_updateClient
} from "../querysDatabase";
import { getDeudaByClient } from "../ventas";

const getAllAddress = async ():Promise<Array<IDirection>> => {
  const client = await getClientDB();
  await client.connect();
  try {
    const temp = await client.query(`SELECT * FROM ${fn_getAllAddress.name}()`);
    const result:Array<IDirection> = temp.rows;
    return result;
  } catch (error) {
    console.log('ERROR:', error);
    return [];
  } finally {
    await client.end();
  }
}

const getAllAddressByClient = async (id: number):Promise<Array<IDirection>> => {
  const client = await getClientDB();
  await client.connect();
  try {
    const temp = await client.query(`SELECT * FROM ${fn_getAllAddressByClient.name}(${id})`);
    const result:Array<IDirection> = temp.rows;
    return result;
  } catch (error) {
    console.log('ERROR:', error);
    return [];
  } finally {
    await client.end();
  }
}

const getAllClients = async ():Promise<Array<IClient>> => {
  const client = await getClientDB();
  await client.connect();
  try {
    const temp = await client.query(`SELECT * FROM ${fn_getAllClients.name}()`);
    const result:Array<IClient> = temp.rows;
    const allClients:Array<IClient> = await Promise.all(
      result.map(async (cliente) => {
        cliente.direcciones = await findAddressByIDClient(cliente.id);
        const saldo = await getDeudaByClient(cliente.id);
        console.log(`saldo: ${saldo}`);
        cliente.saldo = saldo;
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

export const findAddressByIDClient = async (id: number): Promise<Array<IDirection>> => {
  const client = await getClientDB();
  await client.connect();
  try {
    const temp = await client.query(`SELECT * FROM ${fn_getAllAddressByClient.name}(${id})`);
    const result:Array<IDirection> = temp.rows;
    return result;
  } catch (error) {
    return [];
  } finally {
    await client.end();
  }
}

export const findAllClientsWithPagination = async ({page, sizePage}: IDataPagination):Promise<PagedList<IClient>> => {
  try {
    const allClients:Array<IClient> = await getAllClients();
    const pagedList:PagedList<IClient> = PagedList.create(allClients, page, sizePage);
    return pagedList;
  } catch (error) {
    console.log('ERROR:', error);
    return PagedList.create([], 1, 10);
  }
}

export const findAllClients = async ():Promise<Array<IClient>> => {
  try {
    const allClients:Array<IClient> = await getAllClients();
    return allClients;
  } catch (error) {
    console.log('ERROR:', error);
    return [];
  }
}

export const findCliente = async (texto: string, {page, sizePage}: IDataPagination):Promise<PagedList<IClient>> => {
  const client = await getClientDB();
  await client.connect();
  try {
    const query = `SELECT * FROM ${fn_findMatchClients.name}('${texto}');`;
    const temp = await client.query(`${query}`);
    const result:Array<IClient> = temp.rows;
    const allClients:Array<IClient> = await Promise.all(
      result.map(async (cliente) => {
        cliente.direcciones = await findAddressByIDClient(cliente.id);
        return cliente;
      })
    );
    const pagedList:PagedList<IClient> = PagedList.create(allClients, page, sizePage);
    return pagedList;
  } catch (error) {
    console.log('ERROR:', error);
    return PagedList.create([], 1, 10);
  } finally {
    await client.end();
  }
}

export const findClienteById = async (id: number):Promise<IClient | null> => {
  const client = await getClientDB();
  await client.connect();
  try {
    const query = `SELECT * FROM ${fn_FindClientById.name}(${id});`;
    const temp = await client.query(`${query}`);
    const result:Array<IClient> = temp.rows;
    const allClients:Array<IClient> = await Promise.all(
      result.map(async (cliente) => {
        cliente.direcciones = await findAddressByIDClient(cliente.id);
        cliente.saldo = await getDeudaByClient(cliente.id);
        return cliente;
      })
    );
    return allClients[0] ?? null;
  } catch (error) {
    console.log('ERROR:', error);
    return null;
  } finally {
    await client.end();
  }
}

export const addCliente = async (cliente: IDataAddClient):Promise<number> => {
  const client = await getClientDB();
  await client.connect();
  try {
    const {nombre, apellidopaterno, apellidomaterno, telefono, direccioness} = cliente;
    const addressesArray = direccioness.length > 0 ? `ARRAY[${direccioness.map(dir => `'${dir}'`).join(",")}]` : "ARRAY[]::text[]";
    const query = `SELECT ${fn_insertClient.name}('${nombre}', '${apellidopaterno}', '${apellidomaterno}', '${telefono}', ${addressesArray}) AS id`;
    console.log(`query: ${query}`);
    const temp = await client.query(`${query}`);
    const result:Array<number> = temp.rows;
    const id:number = result.length > 0 ? temp.rows[0].id : -1;
    return id;
  } catch (error) {
    console.log('ERROR:', error);
    return -1;
  } finally {
    await client.end();
  }
}

export const updateCliente = async (cliente: IDataUpdateClient):Promise<number> => {
  const client = await getClientDB();
  await client.connect();
  try {
    const {nombre, apellidopaterno, apellidomaterno, telefono} = cliente.client;
    const query = `SELECT ${fn_updateClient.name}(${cliente.id}, '${nombre}', '${apellidopaterno}', '${apellidomaterno}', '${telefono}') AS id`;
    const temp = await client.query(`${query}`);
    const result:Array<number> = temp.rows;
    const id:number = result.length > 0 ? temp.rows[0].id : -1;
    console.log(`id: ${id}`);
    return id;
  } catch (error) {
    console.log('ERROR:', error);
    return -1;
  } finally {
    await client.end();
  }
}


export const deleteCliente = async (id: number):Promise<number> => {
  const client = await getClientDB();
  await client.connect();
  try {
    const query = `SELECT ${fn_deleteClient.name}(${id}) AS id`;
    const temp = await client.query(`${query}`);
    const result:Array<number> = temp.rows;
    const _id:number = result.length > 0 ? temp.rows[0].id : -1;
    console.log(`_id: ${_id}`);
    return _id;
  } catch (error) {
    console.log('ERROR:', error);
    return -1;
  } finally {
    await client.end();
  }
}

// Direcciones
export const findAllAddress = async ():Promise<Array<IDirection>> => {
  try {
    const result:Array<IDirection> = await getAllAddress();
    return result;
  } catch (error) {
    console.log('ERROR:', error);
    return [];
  }
}

export const findAddressById = async (id: number):Promise<IDirection | null> => {
  const client = await getClientDB();
  await client.connect();
  try {
    const query = `SELECT * FROM ${fn_FindAddressById.name}(${id});`;
    const temp = await client.query(`${query}`);
    const result:Array<IDirection> = temp.rows;
    return result[0] ?? null;
  } catch (error) {
    console.log('ERROR:', error);
    return null;
  } finally {
    await client.end();
  }
}

export const findAllAddressByClient = async (id: number):Promise<Array<IDirection>> => {
  try {
    const result:Array<IDirection> = await getAllAddressByClient(id);
    return result;
  } catch (error) {
    console.log('ERROR:', error);
    return [];
  }
}

export const addAddress = async (direccion: IDataAddAddress):Promise<number> => {
  const client = await getClientDB();
  await client.connect();
  try {
    const {id_client, direccion:dir } = direccion;
    const query = `SELECT ${fn_insertAddress.name}(${id_client}, '${dir}') AS id;`;
    const temp = await client.query(`${query}`);
    const result:Array<number> = temp.rows;
    const _id:number = result.length > 0 ? temp.rows[0].id : -1;
    console.log(`_id: ${_id}`);
    return _id;
  } catch (error) {
    console.log('ERROR:', error);
    return -1;
  } finally {
    await client.end();
  }
}

export const updateAddress = async (direccion: IDataUpdateAddress):Promise<number> => {
  const client = await getClientDB();
  await client.connect();
  try {
    // const query = `UPDATE tblDirecciones SET direccion=$1 WHERE id=$2 RETURNING *`;
    const {id, direccion:dir } = direccion;
    const query = `SELECT ${fn_updateAddress.name}(${id}, '${dir}') AS id;`;
    const temp = await client.query(`${query}`);
    const result:Array<number> = temp.rows;
    const _id:number = result.length > 0 ? temp.rows[0].id : -1;
    console.log(`_id: ${_id}`);
    return _id;
  } catch (error) {
    console.log('ERROR:', error);
    return -1;
  } finally {
    await client.end();
  }
}

export const deleteAddress = async (id: number):Promise<number> => {
  const client = await getClientDB();
  await client.connect();
  try {
    const query = `SELECT ${fn_deleteAddress.name}(${id}) AS id;`;
    const temp = await client.query(`${query}`);
    const result:Array<number> = temp.rows;
    const _id:number = result.length > 0 ? temp.rows[0].id : -1;
    console.log(`_id: ${_id}`);
    return _id;
  } catch (error) {
    console.log('ERROR:', error);
    return -1;
  } finally {
    await client.end();
  }
}
