import { IFiltersGraphics, ITypeVenta, IVenta, IVentasProductos } from "../../interfaces";
import { IDataPagination } from "../../interfaces/IProducts";
import { IDataAddVenta, IDataAddVentaProductos } from "../../interfaces/IVentas";
import { formatDate } from "../../utils/DateTime";
import { PagedList } from "../../utils/Pagination";
import { getClientDB } from "../database-pg";
import { fn_FindVentaById, fn_getAllProductsByVenta, fn_getAllVentas, fn_getAllVentasByClient, fn_insertVenta, type_product_venta } from "../querysDatabase";

const getAllVentas = async ():Promise<Array<IVenta>> => {
  const client = await getClientDB();
  await client.connect();
  try {
    const temp = await client.query(`SELECT * FROM ${fn_getAllVentas.name}()`);
    const result:Array<ITypeVenta> = temp.rows;
    let response:Array<IVenta> = [];
    for (let i = 0; i < result.length; i++) {
      const element:IVenta = {
        id: result[i].id,
        id_client: result[i].id_client,
        id_direccion: result[i].id_direccion,
        fecha: result[i].fecha.toISOString(),
        total: result[i].total,
        por_pagar: result[i].por_pagar,
        status: result[i].estatus,
        productos: []
      };
      response = [element, ...response];
    }
    return response;
  } catch (error) {
    console.log('ERROR:', error);
    return [];
  } finally {
    await client.end();
  }
}

const getVentasByIDClient = async (id: number): Promise<Array<IVenta>> => {
  const client = await getClientDB();
  await client.connect();
  try {
    const temp = await client.query(`SELECT * FROM ${fn_getAllVentasByClient.name}(${id})`);
    const result:Array<ITypeVenta> = temp.rows;
    console.log('result: ', result);
    const response:Array<IVenta> = await Promise.all(
      result.map(async (venta) => {
        const element:IVenta = {
          id: venta.id,
          id_client: id,
          id_direccion: venta.id_direccion,
          fecha: venta.fecha.toISOString(),
          total: venta.total,
          por_pagar: venta.por_pagar,
          status: venta.estatus,
          productos: await findProductFromVenta(venta.id)
        };
        return element;
      })
    );

    return response;
  } catch (error) {
    console.log('ERROR:', error);
    return [];
  } finally {
    await client.end();
  }
}

export const findProductFromVenta = async (id: number): Promise<Array<IVentasProductos>> => {
  const client = await getClientDB();
  await client.connect();
  try {
    const temp= await client.query(`SELECT * FROM ${fn_getAllProductsByVenta.name}(${id}) AS id;`);
    const result:Array<IVentasProductos> = temp.rows;
    return result;
  } catch (error) {
    console.log('ERROR:', error);
    return [];
  } finally {
    await client.end();
  }
}

export const findVentasByIDClientWithPagination = async (id: number, {page, sizePage}: IDataPagination): Promise<PagedList<IVenta>> => {
  try {
    const response:Array<IVenta> = await getVentasByIDClient(id);
    const pagedList:PagedList<IVenta> = PagedList.create(response, page, sizePage);
    return pagedList;

  } catch (error) {
    console.log('ERROR:', error);
    return PagedList.create([], 1, 10);
  }
}

export const findVentasByIDClient = async (id: number): Promise<Array<IVenta>> => {
  try {
    const response:Array<IVenta> = await getVentasByIDClient(id);
    return response;

  } catch (error) {
    console.log('ERROR:', error);
    return [];
  }
}

export const findAllVentas = async ():Promise<Array<IVenta>> => {
  try {
    let response:Array<IVenta> = await getAllVentas();
    return response;
  } catch (error) {
    console.log('ERROR:', error);
    return [];
  }
}

export const findAllVentasWithPagination = async ({page, sizePage}: IDataPagination):Promise<PagedList<IVenta>> => {
  try {
    let response:Array<IVenta> = await getAllVentas();
    const pagedList:PagedList<IVenta> = PagedList.create(response, page, sizePage);
    return pagedList;
  } catch (error) {
    console.log('ERROR:', error);
    return PagedList.create([], 1, 10);
  }
}

export const findVentaById = async (id: number):Promise<IVenta | null> => {
  const client = await getClientDB();
  await client.connect();
  try {
    const temp = await client.query(`SELECT * FROM ${fn_FindVentaById.name}(${id})`);
    const result:Array<ITypeVenta> = temp.rows;
    console.log('result ventas:', result);
    let response:Array<IVenta> = [];
    for (let i = 0; i < result.length; i++) {
      const element:IVenta = {
        id: result[i].id,
        id_client: result[i].id_client,
        id_direccion: result[i].id_direccion,
        fecha: result[i].fecha.toISOString(),
        total: result[i].total,
        por_pagar: result[i].por_pagar,
        status: result[i].estatus,
        productos: []
      };
      response = [element, ...response];
    }
    return response[0] ?? null;
  } catch (error) {
    console.log('ERROR:', error);
    return null;
  } finally {
    await client.end();
  }
}

export const addVenta = async ({id_client, id_direccion, fecha, total, pagado, productos}: IDataAddVenta):Promise<number> => {
  const client = await getClientDB();
  await client.connect();
  try {
    const {name} = type_product_venta;
    const productosArray = productos.length > 0 ? `ARRAY[${productos.map(prod => `(${prod.id_producto}, ${prod.precio}, ${prod.cantidad})::${name}`).join(",")}]` : `ARRAY[]::${name}[]`;
    const query = `SELECT ${fn_insertVenta.name}(${id_client}, ${id_direccion}, ${total}, ${pagado},'${fecha}'::TIMESTAMP, ${productosArray} ) AS id;`;
    console.log(`query: ${query}`);
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

