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
