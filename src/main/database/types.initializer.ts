import {
  type_address, type_datos_clientes, type_datos_direcciones, type_datos_productos, type_datos_ventas,
  type_pago, type_product_venta, type_venta_productos, type_ventas
} from './querysDatabase';
import { IQueryDB } from '../interfaces';
import { getClientDB } from './database-pg';

export const initializerTypes = async ():Promise<Array<string>> =>
{
  console.log(`Entro en initializer`);
  try {
    let errors: Array<string> = [];

    // type_address, type_datos_clientes, type_datos_direcciones, type_datos_productos, type_datos_ventas, type_pago, type_product_venta,
    const validateTypeAddress = await checkIfTypeExists(type_address.name);
    if(!validateTypeAddress)
    {
      const getErrors = await createCustomType(type_address);
      errors = [...errors, ...getErrors]
    }

    const validateTypeDatosClientes = await checkIfTypeExists(type_datos_clientes.name);
    if(!validateTypeDatosClientes)
    {
      const getErrors = await createCustomType(type_datos_clientes);
      errors = [...errors, ...getErrors]
    }

    const validateTypeDatosDirecciones = await checkIfTypeExists(type_datos_direcciones.name);
    if(!validateTypeDatosDirecciones)
    {
      const getErrors = await createCustomType(type_datos_direcciones);
      errors = [...errors, ...getErrors]
    }

    const validateTypeDatosProductos = await checkIfTypeExists(type_datos_productos.name);
    if(!validateTypeDatosProductos)
    {
      const getErrors = await createCustomType(type_datos_productos);
      errors = [...errors, ...getErrors]
    }

    const validateTypeDatosVentas = await checkIfTypeExists(type_datos_ventas.name);
    if(!validateTypeDatosVentas)
    {
      const getErrors = await createCustomType(type_datos_ventas);
      errors = [...errors, ...getErrors]
    }

    const validateTypePago = await checkIfTypeExists(type_pago.name);
    if(!validateTypePago)
    {
      const getErrors = await createCustomType(type_pago);
      errors = [...errors, ...getErrors]
    }

    const validateTypeProductVenta = await checkIfTypeExists(type_product_venta.name);
    if(!validateTypeProductVenta)
    {
      const getErrors = await createCustomType(type_product_venta);
      errors = [...errors, ...getErrors]
    }

    // type_venta_productos, type_ventas,
    const validateTypeVentaProductos = await checkIfTypeExists(type_venta_productos.name);
    if(!validateTypeVentaProductos)
    {
      const getErrors = await createCustomType(type_venta_productos);
      errors = [...errors, ...getErrors]
    }

    const validateTypeVentas = await checkIfTypeExists(type_ventas.name);
    if(!validateTypeVentas)
    {
      const getErrors = await createCustomType(type_ventas);
      errors = [...errors, ...getErrors]
    }

    return errors;
  } catch (error) {
      return ["Ocurrio un error en el initializer"];
  }
}

const checkIfTypeExists = async (typeName: string): Promise<boolean> => {
  const client = getClientDB();

  try {
      await client.connect();
      // console.log(`Conectado a la base de datos: ${process.env.DATABASE_DATABASE}`);

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
      // console.error('Error al verificar el tipo:', err);
      return false;
  } finally {
      await client.end();
      // console.log('Conexión a la base de datos cerrada.');
  }
};


const createCustomType = async (entity: IQueryDB): Promise<Array<string>> => {
  const client = getClientDB();
  const {query, name} = entity;
  let errors:Array<string> = [];

  try {

      await client.connect();
      // console.log(`Conectado a la base de datos: ${process.env.DATABASE_DATABASE}`);
      // console.log(`Creando tipo con la consulta: ${query}`);

      // Ejecutar la consulta
      await client.query(query);
      // console.log(`Type ${name} creado con éxito.`);
  } catch (err) {
      // console.error('Error al crear el type:', err);
      errors = [...errors, 'Error al crear el type:', JSON.stringify(err)];
  } finally {
      await client.end();
      // console.log('Conexión a la base de datos cerrada.');
  }
  return errors;
};

