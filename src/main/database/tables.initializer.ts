import {
  tblClientes,
  tblDirecciones,
  tblPagos,
  tblProductos,
  tblTiempoPago,
  tblVentaProductos,
  tblVentas
} from './querysDatabase';
import { IQueryDB } from '../interfaces';
import { getClientDB } from './database-pg';


export const initializerTables = async ():Promise<Array<string>> =>
{
  console.log(`Entro en initializerTables`);
  try {
    let errors: Array<string> = [];

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

const checkTableIfExists = async (tableName: string): Promise<boolean> => {
  const client = getClientDB();

  try {
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
      // console.error('Error al verificar la tabla:', JSON.stringify(err));
      return false;
    } finally {
      await client.end();
      // console.log('Conexión a la base de datos cerrada.');
    }
  };


const createTable = async (entity: IQueryDB): Promise<Array<string>> => {
  const client = getClientDB();
  const { name, query } = entity;
  let errors:Array<string> = [];

  try {
    await client.connect();
    // console.log('query: ', query);
    await client.query(query);
    return [];
  } catch (err) {
    // console.error('Error al crear la tabla:', JSON.stringify(err));
    errors = [...errors, 'Error al crear la tabla:', JSON.stringify(err)];
  } finally {
    await client.end();
    // console.log('Conexión a la base de datos cerrada.');
  }
  return errors;
};
