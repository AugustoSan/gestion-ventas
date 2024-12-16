import {Client} from 'pg';
import dotnev from 'dotenv';
import { IQueryDB } from '../interfaces';
import { initializerTables } from './tables.initializer';
import { initializerTypes } from './types.initializer';
import { initializerFunctions } from './functions.initializer';

dotnev.config();

export const getClientDB = ():Client =>
{
  try {
    return new Client({
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT ?? '5432'),
      database: process.env.DATABASE_DATABASE,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error.message;
    } else {
      throw JSON.stringify(error); // Captura valores no estándar
    }
  }
}

export const getClientPostgres = ():Client =>
  {
    try {
      return new Client({
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT ?? '5432'),
        database: 'postgres',
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error.message;
      } else {
        throw JSON.stringify(error); // Captura valores no estándar
      }
    }
  }

export const initializer = async ():Promise<Array<string>> =>
{
  console.log(`Entro en initializer`);
  try {
    const validateDB = await checkDatabaseIfExist();
    let errors: Array<string> = [];
    if(!validateDB) errors = await createDatabaseIfNotExist();

    if(errors.length > 0) return errors;
    const getErrorsTables = await initializerTables();
    errors = [...errors, ...getErrorsTables];

    const getErrorsTypes = await initializerTypes();
    errors = [...errors, ...getErrorsTypes];

    const getErrorsFunctions = await initializerFunctions();
    errors = [...errors, ...getErrorsFunctions];

    return errors;
  } catch (error) {
    if (error instanceof Error) {
      return ["Ocurrio un error en el initializer", error.message];
    } else if (typeof error === 'string') {
      return ["Ocurrió un error en el initializer", error];
    } else {
      return ["Ocurrio un error en el initializer", JSON.stringify(error)];
    }
  }
}

const checkDatabaseIfExist = async(): Promise<boolean> => {
  const client = getClientPostgres();

  try {
    await client.connect();
    const query = `SELECT 1 FROM pg_database WHERE datname = '${process.env.DATABASE_DATABASE ?? "gestion-ventas"}'`;
    // console.log('query: ', query);
    const res = await client.query(query);
    if(res.rows.length > 0)return true;
    else return false;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error.message;
    } else {
      throw JSON.stringify(error); // Captura valores no estándar
    }
  } finally {
      await client.end();
  }
}

const createDatabaseIfNotExist = async(): Promise<Array<string>> => {
  const client = getClientPostgres();
  let errors:Array<string> = [];
  try {
    await client.connect();
    // console.log(`Conectado con éxito`);

    const dbName = process.env.DATABASE_DATABASE ?? 'gestion-ventas';
    // console.log(`Intentando crear la base de datos: ${dbName}`);

    const query = `CREATE DATABASE "${dbName}"`;

    const res = await client.query(query);
    // console.log(`Database created res: ${JSON.stringify(res)}`);
  } catch (err) {
    // console.error('Error creating database:', err);
    errors = [...errors, 'Error creating database:', JSON.stringify(err)];
  } finally {
    // console.log(`Cerrando la conexión con la base de datos`);
    await client.end();
  }

  return errors;
}
