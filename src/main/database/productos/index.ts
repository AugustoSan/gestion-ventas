import { PagedList } from "../../utils/Pagination";
import { WriteFileSQLBackup } from "../../files/log";
import { IPriceProduct, IProducto } from "../../interfaces";
import { IDataAddProduct, IDataFindPricesProduct, IDataPagination, IDataUpdateProduct } from "../../interfaces/IProducts";
import { openDBPostgres } from "../database-pg";

export const findAllProductos = async ({page, sizePage}: IDataPagination):Promise<PagedList<IProducto>> => {
  const client = await openDBPostgres();
  await client.connect();
  try {
    const temp = await client.query(`SELECT * FROM fn_getAllProducts()`);
    const result:Array<IProducto> = temp.rows;
    console.log('result: ', result);
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

export const findProducto = async (concepto: string):Promise<Array<IProducto>> => {
  const client = await openDBPostgres();
  await client.connect();
  try {
    const query = `SELECT * FROM fn_findMatchProducts('${concepto}')`;
    const temp = await client.query(query);
    const result:Array<IProducto> = temp.rows;
    return result;
  } catch (error) {
    console.log('ERROR:', error);
    return [];
  } finally {
    await client.end();
  }
}


export const addProducto = async ({concepto, precio}: IDataAddProduct):Promise<number> => {
  const client = await openDBPostgres();
  await client.connect();
  try {
    const query = `SELECT fn_insertProduct('${concepto}', ${precio}) AS id;`;
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
  const client = await openDBPostgres();
  await client.connect();
  try {
    const {concepto, precio} = producto.product;
    const query = `SELECT fn_updateProduct(${producto.id}, '${concepto}', ${precio}) AS id;`;
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
  const client = await openDBPostgres();
  await client.connect();
  try {
    const query = `SELECT fn_deleteProduct(${id}) AS id;`;
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

// Precios Producto
// export const getAllPricesProduct = async (data: IDataFindPricesProduct):Promise<Array<IPriceProduct>> => {
//   try {
//     if(!(await createTables())){
//       return [];
//     }
//     const db = await openDb();
//     const query = `SELECT * FROM precio_producto_cliente WHERE id_producto=${data.id_product} AND id_client=${data.id_cliente}`;
//     const result:Array<IPriceProduct> = await db.all(query);
//     return result;
//   } catch (error) {
//     console.log('ERROR:', error);
//     return [];
//   }
// }
