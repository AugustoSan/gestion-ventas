import { PagedList } from "../../utils/Pagination";
import { WriteFileSQLBackup } from "../../files/log";
import { IPago } from "../../interfaces";
import { getClientDB } from "../database-pg";
import { fn_FindPagoById, fn_FindPagosByCliente, fn_FindPagosByVenta, fn_GetAllPagos } from "../querysDatabase";

// export const getAllPagosWithPagination = async ({page, sizePage}: IDataPagination):Promise<PagedList<IProducto>> => {
//   const client = await getClientDB();
//   await client.connect();
//   try {
//     const temp = await client.query(`SELECT * FROM fn_getAllProducts()`);
//     const result:Array<IProducto> = temp.rows;
//     console.log('result: ', result);
//     const pagedList:PagedList<IProducto> = PagedList.create(result, page, sizePage);
//     console.log('pagedList: ', pagedList);
//     console.log('items: ', pagedList.items);
//     return pagedList;
//   } catch (error) {
//     console.log('ERROR:', error);
//     return PagedList.create([], 1, 10);
//   } finally {
//     await client.end();
//   }
// }

// fn_GetAllPagos

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


// export const addProducto = async ({concepto, precio}: IDataAddProduct):Promise<number> => {
//   const client = await getClientDB();
//   await client.connect();
//   try {
//     const query = `SELECT fn_insertProduct('${concepto}', ${precio}) AS id;`;
//     const temp = await client.query(`${query}`);
//     const result:Array<number> = temp.rows;
//     const _id:number = result.length > 0 ? temp.rows[0].id : -1;
//     console.log(`_id: ${_id}`);
//     return _id;
//   } catch (error) {
//     console.log('ERROR:', error);
//     return -1;
//   } finally {
//     await client.end();
//   }
// }

// export const updateProducto = async (producto: IDataUpdateProduct):Promise<number> => {
//   const client = await getClientDB();
//   await client.connect();
//   try {
//     const {concepto, precio} = producto.product;
//     const query = `SELECT fn_updateProduct(${producto.id}, '${concepto}', ${precio}) AS id;`;
//     const temp = await client.query(`${query}`);
//     const result:Array<number> = temp.rows;
//     const _id:number = result.length > 0 ? temp.rows[0].id : -1;
//     console.log(`_id: ${_id}`);
//     return _id;
//   } catch (error) {
//     console.log('ERROR:', error);
//     return -1;
//   } finally {
//     await client.end();
//   }
// }


// export const deleteProducto = async (id: number):Promise<number> => {
//   const client = await getClientDB();
//   await client.connect();
//   try {
//     const query = `SELECT fn_deleteProduct(${id}) AS id;`;
//     const temp = await client.query(`${query}`);
//     const result:Array<number> = temp.rows;
//     const _id:number = result.length > 0 ? temp.rows[0].id : -1;
//     console.log(`_id: ${_id}`);
//     return _id;
//   } catch (error) {
//     console.log('ERROR:', error);
//     return -1;
//   } finally {
//     await client.end();
//   }
// }
