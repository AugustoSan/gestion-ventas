export interface IDataAddProduct {
  concepto: string;
  precio: number;
}

export interface IDataUpdateProduct {
  id: number;
  product: IDataAddProduct;
}
