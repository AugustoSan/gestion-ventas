// import { IProducto } from ".";
// import { PagedList } from "../utils/Filters";

export interface IDataGetProducts {
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
