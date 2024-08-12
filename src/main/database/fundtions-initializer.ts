import {
  type_address, type_datos_clientes, type_datos_direcciones, type_datos_productos, type_datos_ventas,
  type_pago, type_product_venta, type_venta_productos, type_ventas,
  fn_FindAddressById, fn_FindClientById, fn_FindPagoById, fn_FindPagosByVenta, fn_FindProductById,
  fn_FindVentaById, fn_deleteAddress, fn_deleteClient, fn_deleteProduct, fn_findMatchClients,
  fn_findMatchProducts, fn_getAllAddress, fn_getAllAddressByClient, fn_getAllClients,
  fn_getAllProducts, fn_getAllProductsByVenta, fn_getAllVentas, fn_getAllVentasByClient,
  fn_insertAddress, fn_insertClient, fn_insertProduct, fn_insertVenta, fn_updateAddress,
  fn_updateClient, fn_updateProduct
} from './querysDatabase';
import { IQueryDB } from '../interfaces';

dotnev.config();

export const getClientDB = ():Client =>
{
  return new Client({
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT ?? '5432'),
    database: process.env.DATABASE_DATABASE,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  });
}

export const getClientPostgres = ():Client =>
  {
    return new Client({
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT ?? '5432'),
      database: 'postgres',
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
    });
  }

export const initializer = async ():Promise<Array<string>> =>
{
  console.log(`Entro en initializer`);
  try {
    const validateDB = await checkDatabaseIfExist();
    let errors: Array<string> = [];
    if(!validateDB) errors = await createDatabaseIfNotExist();

    // tblClientes, tblDirecciones, tblPagos, tblProductos, tblTiempoPago, tblVentaProductos, tblVentas,
    const validateTblClientes = await checkTableIfExists(tblClientes.name);
    if(!validateTblClientes)
    {
      const getErrors = await createTable(tblClientes);
      errors = [...errors, ...getErrors]
    }

    const validateTblDirecciones = await checkTableIfExists(tblDirecciones.name);
    if(!validateTblDirecciones)
    {
      const getErrors = await createTable(tblDirecciones);
      errors = [...errors, ...getErrors]
    }

    const validateTblPagos = await checkTableIfExists(tblPagos.name);
    if(!validateTblPagos)
    {
      const getErrors = await createTable(tblPagos);
      errors = [...errors, ...getErrors]
    }

    const validateTblProductos = await checkTableIfExists(tblProductos.name);
    if(!validateTblProductos)
    {
      const getErrors = await createTable(tblProductos);
      errors = [...errors, ...getErrors]
    }

    const validateTblTiempoPago = await checkTableIfExists(tblTiempoPago.name);
    if(!validateTblTiempoPago)
    {
      const getErrors = await createTable(tblTiempoPago);
      errors = [...errors, ...getErrors]
    }

    const validateTblVentaProductos = await checkTableIfExists(tblVentaProductos.name);
    if(!validateTblVentaProductos)
    {
      const getErrors = await createTable(tblVentaProductos);
      errors = [...errors, ...getErrors]
    }

    const validateTblVentas = await checkTableIfExists(tblVentas.name);
    if(!validateTblVentas)
    {
      const getErrors = await createTable(tblVentas);
      errors = [...errors, ...getErrors]
    }

    return errors;
  } catch (error) {
      return ["Ocurrio un error en el initializer"];
  }
}

const checkDatabaseIfExist = async(): Promise<boolean> => {
  const client = getClientPostgres();

  try {
    await client.connect();
    const res = await client.query(`
        SELECT 1 FROM pg_database WHERE datname = $1
    `, [process.env.DATABASE_DATABASE ?? "gestion-ventas"]);
    return true;
  } catch (err) {
      console.error('Error checking database existence:', err);
      return false;
  } finally {
      await client.end();
  }
}

const createDatabaseIfNotExist = async(): Promise<Array<string>> => {
  const client = getClientPostgres();
  let errors:Array<string> = [];
  try {
    await client.connect();
    console.log(`Conectado con éxito`);

    const dbName = process.env.DATABASE_DATABASE ?? 'gestion-ventas';
    console.log(`Intentando crear la base de datos: ${dbName}`);

    const query = `CREATE DATABASE "${dbName}"`;

    const res = await client.query(query);
    console.log(`Database created res: ${JSON.stringify(res)}`);
  } catch (err) {
    console.error('Error creating database:', err);
    errors = [...errors, 'Error creating database:', JSON.stringify(err)];
  } finally {
    console.log(`Cerrando la conexión con la base de datos`);
    await client.end();
  }

  return errors;
}

const checkTableIfExists = async (tableName: string): Promise<boolean> => {
  const client = getClientDB();

  try {
    await client.connect();

    // Consulta para verificar si la tabla existe
      await client.connect();
      const query = `
        SELECT EXISTS (
          SELECT 1
          FROM   pg_tables
          WHERE  schemaname = 'public'
          AND    tablename = $1
        );
      `;
      const res = await client.query(query, [tableName]);
      await client.end();
      return res.rows[0].exists;
    } catch (err) {
      console.error('Error al verificar o crear la tabla:', JSON.stringify(err));
      return false;
    } finally {
      await client.end();
      console.log('Conexión a la base de datos cerrada.');
    }
  };


const createTable = async (entity: IQueryDB): Promise<Array<string>> => {
  const client = getClientDB();
  const { name, query } = entity;
  let errors:Array<string> = [];

  try {
    await client.connect();
    await client.query(query);
    return [];
  } catch (err) {
    console.error('Error al verificar o crear la tabla:', JSON.stringify(err));
    errors = [...errors, 'Error al verificar o crear la tabla:', JSON.stringify(err)];
  } finally {
    await client.end();
    console.log('Conexión a la base de datos cerrada.');
  }
  return errors;
};

const checkIfTypeExists = async (typeName: string): Promise<boolean> => {
  const client = getClientDB();

  try {
      await client.connect();
      console.log(`Conectado a la base de datos: ${process.env.DATABASE_DATABASE}`);

      // Consulta para verificar si existe el tipo en la base de datos
      const query = `
          SELECT EXISTS (
              SELECT 1
              FROM pg_type
              WHERE typname = $1
          ) AS type_exists;
      `;

      const res = await client.query(query, [typeName]);
      return res.rows[0].type_exists;
  } catch (err) {
      console.error('Error al verificar el tipo:', err);
      return false;
  } finally {
      await client.end();
      console.log('Conexión a la base de datos cerrada.');
  }
};


const createCustomType = async (entity: IQueryDB): Promise<Array<string>> => {
  const client = getClientDB();
  const {query, name} = entity;
  let errors:Array<string> = [];

  try {

      await client.connect();
      console.log(`Conectado a la base de datos: ${process.env.DATABASE_DATABASE}`);
      console.log(`Creando tipo con la consulta: ${query}`);

      // Ejecutar la consulta
      await client.query(query);
      console.log(`Type ${name} creado con éxito.`);
  } catch (err) {
      console.error('Error al crear el type:', err);
      errors = [...errors, 'Error al crear el type:', JSON.stringify(err)];
  } finally {
      await client.end();
      console.log('Conexión a la base de datos cerrada.');
  }
  return errors;
};


const checkIfFunctionExists = async (functionName: string): Promise<boolean> => {
  const client = getClientDB();
  const schemaName: string = 'public'

  try {
      await client.connect();
      console.log(`Conectado a la base de datos: ${process.env.DATABASE_DATABASE}`);

      // Consulta para verificar si la función existe
      const query = `
          SELECT EXISTS (
              SELECT 1
              FROM pg_proc
              JOIN pg_namespace ON pg_proc.pronamespace = pg_namespace.oid
              WHERE pg_proc.proname = $1
              AND pg_namespace.nspname = $2
          ) AS function_exists;
      `;

      const res = await client.query(query, [functionName, schemaName]);
      return res.rows[0].function_exists;
  } catch (err) {
      console.error('Error al verificar la función:', err);
      return false;
  } finally {
      await client.end();
      console.log('Conexión a la base de datos cerrada.');
  }
};

const createFunction = async (entity: IQueryDB): Promise<Array<string>> => {
  const client = getClientDB();
  const {query, name} = entity;
  let errors:Array<string> = [];

  try {
      await client.connect();
      console.log(`Conectado a la base de datos: ${process.env.DATABASE_DATABASE}`);

      console.log(`Creando función: ${query}`);

      // Ejecutar la consulta para crear la función
      await client.query(query);

      console.log(`Función creada con éxito.`);
  } catch (err) {
      console.error('Error al crear la función:', err);
      errors = [...errors, 'Error al crear la función:', JSON.stringify(err)];
  } finally {
      await client.end();
      console.log('Conexión a la base de datos cerrada.');
  }
  return errors;
};
