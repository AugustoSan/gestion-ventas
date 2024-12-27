import { formatDate } from "../../utils/DateTime";
import { getClientDB } from "../database-pg";
import { fn_DeletePagoById, fn_FindPagoById, fn_FindPagosByCliente, fn_FindPagosByVenta, fn_GetAllPagos } from "../querysDatabase";
import { IAddPago, IPago } from "../../interfaces/IPagos";



export const getAllPagos = async ():Promise<Array<IPago>> => {
  console.log('getAllPagos');
  const client = await getClientDB();
  await client.connect();
  try {
    const query = `SELECT * FROM ${fn_GetAllPagos.name}()`;
    const temp = await client.query(query);
    console.log(query);
    const result:Array<IPago> = temp.rows;
    console.log('result: ', result);
    return result;
  } catch (error) {
    console.log('ERROR:', error);
    return [];
  } finally {
    await client.end();
  }
}

export const getAllPagosByVenta = async (id: number):Promise<Array<IPago>> => {
  console.log('getAllPagosByVenta');
  const client = await getClientDB();
  await client.connect();
  try {
    const query = `SELECT * FROM ${fn_FindPagosByVenta.name}(${id})`;
    console.log(query);
    const temp = await client.query(query);
    const result:Array<IPago> = temp.rows;
    console.log('result: ', result);
    return result;
  } catch (error) {
    console.log('ERROR:', error);
    return [];
  } finally {
    await client.end();
  }
}

export const getAllPagosByClient = async (id: number):Promise<Array<IPago>> => {
  console.log('getAllPagosByClient id:', id);
  const client = await getClientDB();
  await client.connect();
  try {
    const query = `SELECT * FROM ${fn_FindPagosByCliente.name}(${id})`;
    const temp = await client.query(query);
    console.log(query);
    const result:Array<IPago> = temp.rows;
    console.log('result: ', result);
    return result;
  } catch (error) {
    console.log('ERROR:', error);
    return [];
  } finally {
    await client.end();
  }
}

export const findPagoById = async (id: number):Promise<IPago | null> => {
  const client = await getClientDB();
  await client.connect();
  try {
    const query = `SELECT * FROM ${fn_FindPagoById.name}(${id})`;
    console.log(query);
    const temp = await client.query(query);
    const result:Array<IPago> = temp.rows;
    return result[0] ?? null;
  } catch (error) {
    console.log('ERROR:', error);
    return null;
  } finally {
    await client.end();
  }
}


export const addPago = async ({id_client, monto, fecha}: IAddPago):Promise<number> => {
  const client = await getClientDB();
  await client.connect();
  try {
    const query = `SELECT fn_insertPago(${id_client}, ${monto}, '${formatDate(fecha)}'::TIMESTAMP) AS id;`;
    console.log('query: ', query);
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

export const deletePago = async (id: number):Promise<number> => {
  const client = await getClientDB();
  await client.connect();
  try {
    const query = `SELECT ${fn_DeletePagoById.name}(${id}) AS id;`;
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
