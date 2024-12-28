export {
  IFiltersGraphics, IGraphicResponse
} from "./IGraphics";

export {
  IClient, IDataAddClient, IDataAddAddress, IDataUpdateAddress,
  IDataUpdateClient, IDirection, IDataRequestSearchWithString,
  IDataRequestSearchWithStringAndPagination
} from "./IClients";

export {
  IPagination, IPaginationForSlides, IDataRequestFindById
} from "./Pagination";

export {
  IPago, IAddPago
} from "./IPagos";

export {
  IDataUpdateProduct, IDataFindPricesProduct, IPriceProduct,
  IProducto, IPrecioProductoCliente, IProductoGraphics
} from "./IProducts";

export {
  IDataAddVentaProductos, IDataAddVenta, IVentasProductos,
  ITypeVenta, IVenta
} from "./IVentas";


export interface IItemMenu {
  title: string;
  href: string;
  icon: JSX.Element;
}


export interface IDataRequestDelete
{
  isValid: boolean;
  id: number;
}

export interface IDataRequestWithPagination {
  page: number;
  sizePage: number;
  isValid: boolean;
}

export interface IQueryDB {
  name: string;
  type: 'table' | 'function' | 'type';
  query: string;
}

// export interface ISetting {
//   title: string;
//   value: string;
// }

export interface IConfig {
  host: string;
  port: string;
  database: string;
  user: string;
}
