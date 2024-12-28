import { IFiltersGraphics, IGraphicResponse, IPago, IProductoGraphics, IVenta, IVentasProductos } from "../../interfaces";
import { getAllPagos, getAllPagosByClient } from "../pagos";
import { findProductoById } from "../productos";
import { findAllVentas, findVentasByIDClient } from "../ventas";

const getAllVentas = async ({from, to, id_client, status}: IFiltersGraphics ):Promise<Array<IVenta>> => {
  try {
    console.log(`id: ${id_client}`);
    let response:Array<IVenta> = id_client === 0 ? await findAllVentas() : await findVentasByIDClient(id_client);
    if(from != null) response = response.filter(venta => new Date(venta.fecha) >= from);
    if(to != null) response = response.filter(venta => new Date(venta.fecha) <= to);
    if(status != null && status === 3) return response;
    if(status != null) response = response.filter(venta => venta.status === status);
    return response;
  } catch (error) {
    console.log('ERROR:', error);
    return [];
  }
}

const getAllPagosGraphics = async ({from, to, id_client, status}: IFiltersGraphics ):Promise<Array<IPago>> => {
  try {
    console.log(`id: ${id_client}`);
    let response:Array<IPago> = id_client === 0 ? await getAllPagos() : await getAllPagosByClient(id_client);
    if(from != null) response = response.filter(pago => new Date(pago.fecha) >= from);
    if(to != null) response = response.filter(pago => new Date(pago.fecha) <= to);
    return response;
  } catch (error) {
    console.log('ERROR:', error);
    return [];
  }
}

const getAllProductsGraphics = async (listVentas: Array<IVenta> ): Promise<Array<IProductoGraphics>> => {
  try {
    let response: Array<IProductoGraphics> = [];
    let listProductos: Array<IVentasProductos> = [];
    listVentas.forEach(venta => {
      listProductos = [...listProductos, ...venta.productos];
    });
    response = getProducts(listProductos);
    response = await getNameProducts(response);
    return response;
  } catch (error) {
    console.log('ERROR:', error);
    return [];
  }
}

const getProducts = (listProducts: Array<IVentasProductos>): Array<IProductoGraphics> => {
  try {
    let response: Array<IProductoGraphics> = [];
    listProducts.forEach( product => {
      const pos = response.findIndex(producto => producto.id === product.id_producto);
      if (pos === -1) {
        // const prod = await findProductoById(product.id_producto);
        const newItem: IProductoGraphics = {
          id: product.id_producto,
          cantidad: product.cantidad,
          name: ''
        }
        response = [...response, newItem];
      } else {
        response[pos].cantidad = response[pos].cantidad + product.cantidad;
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
}

const getNameProducts = async (listA: Array<IProductoGraphics>): Promise<Array<IProductoGraphics>> => {
  try {
    let response: Array<IProductoGraphics> = [];

    // Usar for...of para manejar correctamente las promesas
    for (const product of listA) {
      const prod = await findProductoById(product.id);
      if (prod !== null) {
        product.name = prod.concepto;
        response.push(product);
      }
    }
    return response;
  } catch (error) {
    throw error;
  }
}

// const getLabelsX = (ventas: Array<IVenta>, pagos: Array<IPago>): Array<string> => {
//   const newVentas: Array<Date> = ventas.map(venta => new Date(venta.fecha));
//   const newPagos: Array<Date> = pagos.map(pago => new Date(pago.fecha));

//   // Combinar, eliminar duplicados y ordenar
//   let response: Array<Date> = [...newVentas, ...newPagos];
//   response = Array.from(new Set(response.map(date => date.getTime())))
//                   .map(time => new Date(time));

//   response.sort((a, b) => a.getTime() - b.getTime());

//   // Obtener la fecha mínima y máxima
//   const tam = response.length;
//   if (tam === 0) return []; // Si no hay fechas, retornar arreglo vacío

//   const minDate = response[0];
//   const maxDate = response[tam - 1];

//   // Generar rangos basados en divisiones
//   const generateRange = (start: Date, end: Date, parts: number): Array<Date> => {
//     const range: Array<Date> = [];
//     const startTime = start.getTime();
//     const endTime = end.getTime();
//     const step = (endTime - startTime) / parts;

//     for (let i = 0; i <= parts; i++) {
//       const currentTime = startTime + step * i;
//       range.push(new Date(currentTime));
//     }

//     return range;
//   };

//   const dateRange = generateRange(minDate, maxDate, 5);

//   // Convertir fechas a formato ISO
//   return dateRange.map(date => date.toISOString());
// };

// const getLabelsY = (ventas: Array<IVenta>, pagos: Array<IPago>): Array<string> => {
//   // Extraer valores numéricos
//   const newVentas: Array<number> = ventas.map(venta => venta.total);
//   const newPagos: Array<number> = pagos.map(pago => pago.monto);

//   // Combinar, eliminar duplicados y ordenar
//   let response: Array<number> = Array.from(new Set([...newVentas, ...newPagos]));
//   response.sort((a, b) => a - b);

//   // Si no hay datos, retornar arreglo vacío
//   if (response.length === 0) return [];

//   // Obtener el mínimo y el máximo
//   const minValue = response[0];
//   const maxValue = response[response.length - 1];

//   // Generar rangos basados en divisiones
//   const generateRange = (start: number, end: number, parts: number): Array<number> => {
//     const range: Array<number> = [];
//     const step = (end - start) / parts;

//     for (let i = 0; i <= parts; i++) {
//       range.push(Number((start + step * i).toFixed(2))); // Redondeo opcional a 2 decimales
//     }

//     return range;
//   };

//   const valueRange = generateRange(minValue, maxValue, 5);

//   // Convertir valores a cadenas
//   return valueRange.map(value => value.toString());
// };

export const getGraphics = async (filters: IFiltersGraphics): Promise<IGraphicResponse> => {
  const response: IGraphicResponse = {
    ventas: [],
    pagos: [],
    productos: [],
    // labelsX: [],
    // labelsY: []
  };
  try {
    const ventas = await getAllVentas(filters);
    response.ventas = ventas;
    response.pagos = await getAllPagosGraphics(filters);
    response.productos = await getAllProductsGraphics(ventas);
    // response.labelsX = getLabelsX(response.ventas, response.pagos);
    // response.labelsY = getLabelsY(response.ventas, response.pagos);
    return response;
  } catch (error) {
    console.log('ERROR:', error);
    return response;
  }
}
