import { PagedList } from "../../utils/Pagination";
import { IPriceProduct, IProducto } from "../../interfaces";
import { IDataAddProduct, IDataFindPricesProduct, IDataPagination, IDataUpdateProduct } from "../../interfaces/IProducts";
import { getClientDB } from "../database-pg";
import { fn_deleteProduct, fn_findMatchProducts, fn_FindProductById, fn_getAllProducts, fn_insertProduct, fn_updateProduct } from "../querysDatabase";

const getAllProductos = async ():Promise<Array<IProducto>> => {
  const client = await getClientDB();
  await client.connect();
  try {
    const temp = await client.query(`SELECT * FROM ${fn_getAllProducts.name}()`);
    const result:Array<IProducto> = temp.rows;
    console.log('result: ', result);
    return result;
  } catch (error) {
    console.log('ERROR:', error);
    return [];
  } finally {
    await client.end();
  }
}

export const findAllProductosWithPagination = async ({page, sizePage}: IDataPagination):Promise<PagedList<IProducto>> => {
  try {
    const result:Array<IProducto> = await getAllProductos();
    const pagedList:PagedList<IProducto> = PagedList.create(result, page, sizePage);
    return pagedList;
  } catch (error) {
    console.log('ERROR:', error);
    return PagedList.create([], 1, 10);
  }
}

export const findAllProductos = async ():Promise<Array<IProducto>> => {
  try {
    const result:Array<IProducto> = await getAllProductos();
    console.log('result: ', result);
    return result;
  } catch (error) {
    console.log('ERROR:', error);
    return [];
  }
}

export const findProducto = async (concepto: string, {page, sizePage}: IDataPagination):Promise<PagedList<IProducto>> => {
  const client = await getClientDB();
  await client.connect();
  try {
    const query = `SELECT * FROM ${fn_findMatchProducts.name}('${concepto}')`;
    const temp = await client.query(query);
    const result:Array<IProducto> = temp.rows;
    const pagedList:PagedList<IProducto> = PagedList.create(result, page, sizePage);
    console.log('pagedList: ', pagedList);
    console.log('items: ', pagedList.items);
    return pagedList;
  } catch (error) {
    console.log('ERROR:', error);
    return PagedList.create([], 1, 10);
  } finally {
    await client.end();
  }
}

export const findProductoById = async (id: number):Promise<IProducto | null> => {
  const client = await getClientDB();
  await client.connect();
  try {
    const query = `SELECT * FROM ${fn_FindProductById.name}(${id})`;
    const temp = await client.query(query);
    const result:Array<IProducto> = temp.rows;
    return result[0] ?? null;
  } catch (error) {
    console.log('ERROR:', error);
    return null;
  } finally {
    await client.end();
  }
}


export const addProducto = async ({concepto, precio}: IDataAddProduct):Promise<number> => {
  const client = await getClientDB();
  await client.connect();
  try {
    const query = `SELECT ${fn_insertProduct.name}('${concepto}', ${precio}) AS id;`;
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

export const updateProducto = async (producto: IDataUpdateProduct):Promise<number> => {
  const client = await getClientDB();
  await client.connect();
  try {
    const {concepto, precio} = producto.product;
    const query = `SELECT ${fn_updateProduct.name}(${producto.id}, '${concepto}', ${precio}) AS id;`;
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


export const deleteProducto = async (id: number):Promise<number> => {
  const client = await getClientDB();
  await client.connect();
  try {
    const query = `SELECT ${fn_deleteProduct.name}(${id}) AS id;`;
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

