import { WriteFileSQLBackup } from "../../files/log";
import { IPriceProduct, IProducto } from "../../interfaces";
import { IDataAddProduct, IDataFindPricesProduct, IDataUpdateProduct } from "../../interfaces/IProducts";
import { openDBPostgres } from "../database-pg";

export const findAllProductos = async ():Promise<Array<IProducto>> => {
  const client = await openDBPostgres();
  await client.connect();
  try {
    const temp = await client.query('SELECT * FROM tblProductos');
    const result:Array<IProducto> = temp.rows;
    return result;
  } catch (error) {
    console.log('ERROR:', error);
    return [];
  } finally {
    await client.end();
  }
}

export const findProducto = async (concepto: string):Promise<Array<IProducto>> => {
  const client = await openDBPostgres();
  await client.connect();
  try {
    const query = `SELECT * FROM tblProductos WHERE concepto LIKE '%${concepto}%'`;
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
    const query = `INSERT INTO tblProductos(concepto, precio) VALUES ($1, $2) RETURNING *`;
    const values = [concepto, precio];
    const result = await client.query(query, values);
    // WriteFileSQLBackup(query);
    console.log(result, result);
    
    return result.rowCount ?? 0;
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
    const query = `UPDATE tblProductos SET concepto=$1, precio=$2 WHERE id=$3`;
    const values = [concepto, precio, producto.id]
    const result = await client.query(query, values);
    console.log('result: ', result);
    
    return result.rowCount ?? 0;
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
    const result = await client.query('DELETE FROM tblProductos WHERE id=$1', [id]);
    return result.rowCount ?? 0;
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
