import { WriteFileSQLBackup } from "../../files/log";
import { IPriceProduct, IProducto } from "../../interfaces";
import { IDataAddProduct, IDataFindPricesProduct, IDataUpdateProduct } from "../../interfaces/IProducts";
import { createTables, openDb } from "../database";

export const findAllProductos = async ():Promise<Array<IProducto>> => {
  try {
    if(!(await createTables())){
      return [];
    }
    const db = await openDb();
    const result:Array<IProducto> = await db.all('SELECT * FROM productos');
    return result;
  } catch (error) {
    console.log('ERROR:', error);
    return [];
  }
}

export const findProducto = async (concepto: string):Promise<Array<IProducto>> => {
  try {
    if(!(await createTables())){
      return [];
    }
    const db = await openDb();
    const query = `SELECT * FROM productos WHERE concepto LIKE '%${concepto}%'`;
    const result:Array<IProducto> = await db.all(query);
    return result;
  } catch (error) {
    console.log('ERROR:', error);
    return [];
  }
}


export const addProducto = async ({concepto, precio}: IDataAddProduct):Promise<number> => {
  try {
    if(!(await createTables())){
      return -2;
    }
    const db = await openDb();
    const query = `INSERT INTO productos(concepto, precio) VALUES ('${concepto}', ${precio})`;
    const result = await db.run('INSERT INTO productos(concepto, precio) VALUES (:concepto, :precio)', {
      ':concepto': concepto,
      ':precio': precio
    });
    WriteFileSQLBackup(query);
    return result.lastID ?? 0;
  } catch (error) {
    console.log('ERROR:', error);
    return -1;
  }
}

export const updateProducto = async (producto: IDataUpdateProduct):Promise<number> => {
  try {
    if(!(await createTables())){
      return -2;
    }
    const db = await openDb();
    const result = await db.run('UPDATE productos SET concepto=:concepto, precio=:precio WHERE id=:id', {
      ':id': producto.id,
      ':concepto': producto.product.concepto,
      ':precio': producto.product.precio,
    });
    return result.changes ?? 0;
  } catch (error) {
    console.log('ERROR:', error);
    return -1;
  }
}


export const deleteProducto = async (id: number):Promise<number> => {
  try {
    if(!(await createTables())){
      return -2;
    }
    const db = await openDb();
    const result = await db.run('DELETE FROM productos WHERE id=:id', {
      ':id': id
    });
    return result.changes ?? 0;
  } catch (error) {
    console.log('ERROR:', error);
    return -1;
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
