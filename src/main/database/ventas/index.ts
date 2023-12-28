import { IVenta, IVentasProductos } from "../../interfaces";
import { IDataAddVenta, IDataAddVentaProductos } from "../../interfaces/IVentas";
import { openDBPostgres } from "../database-pg";

export const findProductFromVenta = async (id: number): Promise<Array<IVentasProductos>> => {
  const client = await openDBPostgres();
  await client.connect();
  try {
    const temp= await client.query(`SELECT * FROM tblVentaProductos WHERE id_venta=${id}`);
    const result:Array<IVentasProductos> = temp.rows;
    return result;
  } catch (error) {
    console.log('ERROR:', error);
    return [];
  } finally {
    await client.end();
  }
}

export const findVentasByIDClient = async (id: number): Promise<Array<IVenta>> => {
  const client = await openDBPostgres();
  await client.connect();
  try {
    const temp = await client.query(`SELECT * FROM tblVentas WHERE id_client=${id}`);
    const result:Array<IVenta> = temp.rows;
    const arrayVentas:Array<IVenta> = await Promise.all(
      result.map(async (venta) => {
        venta.productos = await findProductFromVenta(venta.id);
        return venta;
      })
    );
    // console.log(`arrayVentas: ${arrayVentas}`);
    return arrayVentas;
  } catch (error) {
    console.log('ERROR:', error);
    return [];
  } finally {
    await client.end();
  }
}

export const findVentaByID = async (id: number): Promise<IVenta> => {
  const client = await openDBPostgres();
  await client.connect();
  const _response:IVenta = {
    id: 0,
    id_client: 0,
    id_direccion: 0,
    fecha: "",
    total: 0,
    por_pagar: 0,
    status: 0,
    productos: []
  }
  try {
    const temp = await client.query(`SELECT * FROM tblVentas WHERE id_client=${id}`);
    const result: IVenta | undefined = temp.rows[0];
    if(result === undefined) return _response;
    result.productos = await findProductFromVenta(result.id);
    return result;
  } catch (error) {
    console.log('ERROR:', error);
    throw Error("Ocurrio un error en la sentencia SQL");
  } finally {
    await client.end();
  }
}

export const findAllVentas = async ():Promise<Array<IVenta>> => {
  const client = await openDBPostgres();
  await client.connect();
  try {
    const temp = await client.query('SELECT * FROM tblVentas');
    const result:Array<IVenta> = temp.rows;
    console.log('result ventas:', result);

    return result;
  } catch (error) {
    console.log('ERROR:', error);
    return [];
  } finally {
    await client.end();
  }
}

// export const findCliente = async (texto: string):Promise<Array<IClient>> => {
//   try {
//     if(!(await createTables())){
//       return [];
//     }
//     const db = await openDb();
//     const query = `SELECT * FROM clientes WHERE name LIKE '%${texto}%' OR app LIKE '%${texto}%' OR apm LIKE '%${texto}%' OR tel LIKE '%${texto}%'`;
//     console.log('query:', query);
//     const result:Array<IClient> = await db.all(query);
//     const allClients:Array<IClient> = await Promise.all(
//       result.map(async (cliente) => {
//         cliente.direcciones = await findAddressByIDClient(cliente.id);
//         return cliente;
//       })
//     );
//     console.log('allClients: ', allClients);
//     return allClients;
//   } catch (error) {
//     console.log('ERROR:', error);
//     return [];
//   }
// }

export const addVenta = async (venta: IDataAddVenta):Promise<number> => {
  const client = await openDBPostgres();
  await client.connect();
  try {
    const query = 'INSERT INTO tblVentas(id_client, id_direccion, fecha, total, por_pagar, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [venta.client.id, venta.direccion.id, venta.fecha, venta.total, venta.por_pagar, venta.status];
    const result = await client.query(query, values);
    // console.log(`changes: ${result.changes}`);
    // console.log(`lastID: ${result.lastID}`);
    // console.log(`addVenta: ${result.stmt}`);
    await Promise.all(
      venta.productos.map(async (producto) => {
        const id_venta = result.oid ?? 0;
        return await addVentaProducto(producto, id_venta);
      })
    )
    return result.oid ?? 0;
  } catch (error) {
    console.log('ERROR:', error);
    return -1;
  } finally {
    await client.end();
  }
}

export const addVentaProducto = async (product: IDataAddVentaProductos, id_venta: number):Promise<number> => {
  const client = await openDBPostgres();
  await client.connect();
  try {
    const {cantidad, producto} = product;
    const query = 'INSERT INTO tblVentaProductos(id_venta, id_producto, precio, cantidad) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [id_venta, producto.id, producto.precio, cantidad];
    const result = await client.query(query,values);
    // console.log(`changes: ${result.changes}`);
    // console.log(`lastID: ${result.lastID}`);
    console.log(`addVentaProducto: ${result.oid}`);
    return result.oid ?? 0;
  } catch (error) {
    console.log('ERROR:', error);
    return -1;
  } finally {
    await client.end();
  }
}


// export const updateCliente = async (cliente: IDataUpdateClient):Promise<number> => {
//   try {
//     if(!(await createTables())){
//       return -2;
//     }
//     const db = await openDb();
//     const result = await db.run('UPDATE clientes SET name=:name, app=:app, apm=:apm, tel=:tel WHERE id=:id', {
//       ':id': cliente.id,
//       ':name': cliente.client.name,
//       ':app': cliente.client.app,
//       ':apm': cliente.client.apm,
//       ':tel': cliente.client.tel
//     });
//     console.log(`changes: ${result.changes}`);
//     console.log(`lastID: ${result.lastID}`);

//     return result.changes ?? 0;
//   } catch (error) {
//     console.log('ERROR:', error);
//     return -1;
//   }
// }


// export const deleteCliente = async (id: number):Promise<number> => {
//   try {
//     if(!(await createTables())){
//       return -2;
//     }
//     const db = await openDb();
//     const result = await db.run('DELETE FROM clientes WHERE id=:id', {
//       ':id': id
//     });
//     console.log(`changes: ${result.changes}`);
//     console.log(`lastID: ${result.lastID}`);
//     return result.changes ?? 0;
//   } catch (error) {
//     console.log('ERROR:', error);
//     return -1;
//   }
// }

// // Direcciones
// export const findAllAddress = async ():Promise<Array<IDirection>> => {
//   try {
//     if(!(await createTables())){
//       return [];
//     }
//     const db = await openDb();
//     const result:Array<IDirection> = await db.all('SELECT * FROM direcciones');
//     return result;
//   } catch (error) {
//     console.log('ERROR:', error);
//     return [];
//   }
// }

// export const addAddress = async (direccion: IDataAddAddress):Promise<number> => {
//   try {
//     if(!(await createTables())){
//       return -2;
//     }
//     const db = await openDb();
//     const result = await db.run('INSERT INTO direcciones(id_client, direccion) VALUES (:cliente, :direccion)', {
//       ':cliente': direccion.id_client,
//       ':direccion': direccion.direccion,
//     });
//     console.log(`changes: ${result.changes}`);
//     console.log(`lastID: ${result.lastID}`);
//     return result.lastID ?? 0;
//   } catch (error) {
//     console.log('ERROR:', error);
//     return -1;
//   }
// }

// export const updateAddress = async (direccion: IDataUpdateAddress):Promise<number> => {
//   try {
//     if(!(await createTables())){
//       return -2;
//     }
//     const db = await openDb();
//     const result = await db.run('UPDATE direcciones SET direccion=:direccion WHERE id=:id', {
//       ':id': direccion.id,
//       ':direccion': direccion.direccion.direccion
//     });
//     console.log(`changes: ${result.changes}`);
//     console.log(`lastID: ${result.lastID}`);

//     return result.changes ?? 0;
//   } catch (error) {
//     console.log('ERROR:', error);
//     return -1;
//   }
// }

// export const deleteAddress = async (id: number):Promise<number> => {
//   try {
//     if(!(await createTables())){
//       return -2;
//     }
//     const db = await openDb();
//     const result = await db.run('DELETE FROM direcciones WHERE id=:id', {
//       ':id': id
//     });
//     console.log(`changes: ${result.changes}`);
//     console.log(`lastID: ${result.lastID}`);
//     return result.changes ?? 0;
//   } catch (error) {
//     console.log('ERROR:', error);
//     return -1;
//   }
// }
