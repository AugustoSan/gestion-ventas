// import { IProducto } from ".";
// import { PagedList } from "../utils/Filters";

export interface IDataPagination {
  page: number;
  sizePage: number;
}

// export interface IDataGetProductsResponse {
//   pages: PagedList<IProducto>;
// }

export interface IDataAddProduct {
  concepto: string;
  precio: number;
}

export interface IDataUpdateProduct {
  id: number;
  product: IDataAddProduct;
}

export interface IDataFindPricesProduct {
  id_cliente: number;
  id_product: number;
}

export interface IPriceProduct {
  id: number;
  id_producto: number;
  id_client: number;
  precio: number;
}

export interface IProducto {
  id: number;
  concepto: string;
  precio: number;
  list_prices: Array<IPriceProduct>
}

export interface IPrecioProductoCliente {
  id: number;
  id_producto: number;
  id_client: number;
  precio: number;
}
