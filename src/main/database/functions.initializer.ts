import {
  fn_FindAddressById, fn_FindClientById, fn_FindPagoById, fn_FindPagosByVenta, fn_FindProductById,
  fn_FindVentaById, fn_deleteAddress, fn_deleteClient, fn_deleteProduct, fn_findMatchClients,
  fn_findMatchProducts, fn_getAllAddress, fn_getAllAddressByClient, fn_getAllClients,
  fn_getAllProducts, fn_getAllProductsByVenta, fn_getAllVentas, fn_getAllVentasByClient,
  fn_insertAddress, fn_insertClient, fn_insertProduct, fn_insertVenta, fn_updateAddress,
  fn_updateClient, fn_updateProduct, fn_GetAllPagos, fn_FindPagosByCliente, fn_FindDeudaByCliente,
  fn_InsertPagos, fn_DeletePagoById,
} from './querysDatabase';
import { IQueryDB } from '../interfaces';
import { getClientDB } from './database-pg';


export const initializerFunctions = async ():Promise<Array<string>> =>
{
  console.log(`Entro en initializerFunctions`);
  try {
    let errors: Array<string> = [];

    // fn_FindAddressById, fn_FindClientById, fn_FindPagoById, fn_FindPagosByVenta, fn_FindProductById
    const validateFnFindAddressById = await checkIfFunctionExists(fn_FindAddressById.name);
    if(!validateFnFindAddressById)
    {
      const getErrors = await createFunction(fn_FindAddressById);
      errors = [...errors, ...getErrors]
    }

    const validateFnFindClientById = await checkIfFunctionExists(fn_FindClientById.name);
    if(!validateFnFindClientById)
    {
      const getErrors = await createFunction(fn_FindClientById);
      errors = [...errors, ...getErrors]
    }

    const validateFnFindPagoById = await checkIfFunctionExists(fn_FindPagoById.name);
    if(!validateFnFindPagoById)
    {
      const getErrors = await createFunction(fn_FindPagoById);
      errors = [...errors, ...getErrors]
    }

    const validateFnFindPagosByVenta = await checkIfFunctionExists(fn_FindPagosByVenta.name);
    if(!validateFnFindPagosByVenta)
    {
      const getErrors = await createFunction(fn_FindPagosByVenta);
      errors = [...errors, ...getErrors]
    }

    const validatefn_InsertPagos = await checkIfFunctionExists(fn_InsertPagos.name);
    if(!validatefn_InsertPagos)
    {
      const getErrors = await createFunction(fn_InsertPagos);
      errors = [...errors, ...getErrors]
    }

    const validatefn_DeletePagoById = await checkIfFunctionExists(fn_DeletePagoById.name);
    if(!validatefn_DeletePagoById)
    {
      const getErrors = await createFunction(fn_DeletePagoById);
      errors = [...errors, ...getErrors]
    }

    const validatefn_GetAllPagos = await checkIfFunctionExists(fn_GetAllPagos.name);
    if(!validatefn_GetAllPagos)
    {
      const getErrors = await createFunction(fn_GetAllPagos);
      errors = [...errors, ...getErrors]
    }

    const validatefn_FindPagosByCliente = await checkIfFunctionExists(fn_FindPagosByCliente.name);
    if(!validatefn_FindPagosByCliente)
    {
      const getErrors = await createFunction(fn_FindPagosByCliente);
      errors = [...errors, ...getErrors]
    }

    const validatefn_FindDeudaByCliente = await checkIfFunctionExists(fn_FindDeudaByCliente.name);
    if(!validatefn_FindDeudaByCliente)
    {
      const getErrors = await createFunction(fn_FindDeudaByCliente);
      errors = [...errors, ...getErrors]
    }

    const validateFnFindProductById = await checkIfFunctionExists(fn_FindProductById.name);
    if(!validateFnFindProductById)
    {
      const getErrors = await createFunction(fn_FindProductById);
      errors = [...errors, ...getErrors]
    }

    // fn_FindVentaById, fn_deleteAddress, fn_deleteClient, fn_deleteProduct, fn_findMatchClients,
    const validateFnFindVentaById = await checkIfFunctionExists(fn_FindVentaById.name);
    if(!validateFnFindVentaById)
    {
      const getErrors = await createFunction(fn_FindVentaById);
      errors = [...errors, ...getErrors]
    }

    const validateFnDeleteAddress = await checkIfFunctionExists(fn_deleteAddress.name);
    if(!validateFnDeleteAddress)
    {
      const getErrors = await createFunction(fn_deleteAddress);
      errors = [...errors, ...getErrors]
    }

    const validateFnDeleteClient = await checkIfFunctionExists(fn_deleteClient.name);
    if(!validateFnDeleteClient)
    {
      const getErrors = await createFunction(fn_deleteClient);
      errors = [...errors, ...getErrors]
    }

    const validateFnDeleteProduct = await checkIfFunctionExists(fn_deleteProduct.name);
    if(!validateFnDeleteProduct)
    {
      const getErrors = await createFunction(fn_deleteProduct);
      errors = [...errors, ...getErrors]
    }

    const validateFnFindMatchClients = await checkIfFunctionExists(fn_findMatchClients.name);
    if(!validateFnFindMatchClients)
    {
      const getErrors = await createFunction(fn_findMatchClients);
      errors = [...errors, ...getErrors]
    }

    // fn_findMatchProducts, fn_getAllAddress, fn_getAllAddressByClient, fn_getAllClients,
    const validateFnFindMatchProducts = await checkIfFunctionExists(fn_findMatchProducts.name);
    if(!validateFnFindMatchProducts)
    {
      const getErrors = await createFunction(fn_findMatchProducts);
      errors = [...errors, ...getErrors]
    }

    const validateFnGetAllAddress = await checkIfFunctionExists(fn_getAllAddress.name);
    if(!validateFnGetAllAddress)
    {
      const getErrors = await createFunction(fn_getAllAddress);
      errors = [...errors, ...getErrors]
    }

    const validateFnGetAllAddressByClient = await checkIfFunctionExists(fn_getAllAddressByClient.name);
    if(!validateFnGetAllAddressByClient)
    {
      const getErrors = await createFunction(fn_getAllAddressByClient);
      errors = [...errors, ...getErrors]
    }

    const validateFnGetAllClients = await checkIfFunctionExists(fn_getAllClients.name);
    if(!validateFnGetAllClients)
    {
      const getErrors = await createFunction(fn_getAllClients);
      errors = [...errors, ...getErrors]
    }

    // fn_getAllProducts, fn_getAllProductsByVenta, fn_getAllVentas, fn_getAllVentasByClient,
    const validateFnGetAllProducts = await checkIfFunctionExists(fn_getAllProducts.name);
    if(!validateFnGetAllProducts)
    {
      const getErrors = await createFunction(fn_getAllProducts);
      errors = [...errors, ...getErrors]
    }

    const validateFnGetAllProductsByVenta = await checkIfFunctionExists(fn_getAllProductsByVenta.name);
    if(!validateFnGetAllProductsByVenta)
    {
      const getErrors = await createFunction(fn_getAllProductsByVenta);
      errors = [...errors, ...getErrors]
    }

    const validateFnGetAllVentas = await checkIfFunctionExists(fn_getAllVentas.name);
    if(!validateFnGetAllVentas)
    {
      const getErrors = await createFunction(fn_getAllVentas);
      errors = [...errors, ...getErrors]
    }

    const validateFnGetAllVentasByClient = await checkIfFunctionExists(fn_getAllVentasByClient.name);
    if(!validateFnGetAllVentasByClient)
    {
      const getErrors = await createFunction(fn_getAllVentasByClient);
      errors = [...errors, ...getErrors]
    }

    // fn_insertAddress, fn_insertClient, fn_insertProduct, fn_insertVenta, fn_updateAddress,
    const validateFnInsertAddress = await checkIfFunctionExists(fn_insertAddress.name);
    if(!validateFnInsertAddress)
    {
      const getErrors = await createFunction(fn_insertAddress);
      errors = [...errors, ...getErrors]
    }

    const validateFnInsertClient = await checkIfFunctionExists(fn_insertClient.name);
    if(!validateFnInsertClient)
    {
      const getErrors = await createFunction(fn_insertClient);
      errors = [...errors, ...getErrors]
    }

    const validateFnInsertProduct = await checkIfFunctionExists(fn_insertProduct.name);
    if(!validateFnInsertProduct)
    {
      const getErrors = await createFunction(fn_insertProduct);
      errors = [...errors, ...getErrors]
    }

    const validateFnInsertVenta = await checkIfFunctionExists(fn_insertVenta.name);
    if(!validateFnInsertVenta)
    {
      const getErrors = await createFunction(fn_insertVenta);
      errors = [...errors, ...getErrors]
    }

    const validateFnUpdateAddress = await checkIfFunctionExists(fn_updateAddress.name);
    if(!validateFnUpdateAddress)
    {
      const getErrors = await createFunction(fn_updateAddress);
      errors = [...errors, ...getErrors]
    }

    // fn_updateClient, fn_updateProduct
    const validateFnUpdateClient = await checkIfFunctionExists(fn_updateClient.name);
    if(!validateFnUpdateClient)
    {
      const getErrors = await createFunction(fn_updateClient);
      errors = [...errors, ...getErrors]
    }

    const validateFnUpdateProduct = await checkIfFunctionExists(fn_updateProduct.name);
    if(!validateFnUpdateProduct)
    {
      const getErrors = await createFunction(fn_updateProduct);
      errors = [...errors, ...getErrors]
    }

    return errors;
  } catch (error) {
      return ["Ocurrio un error en el initializer"];
  }
}

const checkIfFunctionExists = async (functionName: string): Promise<boolean> => {
  const client = getClientDB();
  const schemaName: string = 'public'

  try {
      await client.connect();
      // console.log(`Conectado a la base de datos: ${process.env.DATABASE_DATABASE}`);

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
      // console.log('Conexión a la base de datos cerrada.');
  }
};

const createFunction = async (entity: IQueryDB): Promise<Array<string>> => {
  const client = getClientDB();
  const {query, name} = entity;
  let errors:Array<string> = [];

  try {
      await client.connect();
      // console.log(`Conectado a la base de datos: ${process.env.DATABASE_DATABASE}`);

      // console.log(`Creando función: ${query}`);

      // Ejecutar la consulta para crear la función
      await client.query(query);

      // console.log(`Función creada con éxito.`);
  } catch (err) {
      // console.error('Error al crear la función:', err);
      errors = [...errors, `Error al crear la función: ${name}`, JSON.stringify(err)];
  } finally {
      await client.end();
      // console.log('Conexión a la base de datos cerrada.');
  }
  return errors;
};
