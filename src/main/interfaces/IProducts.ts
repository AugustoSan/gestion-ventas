export interface IDataAddProduct {
  concepto: string;
}

export interface IDataUpdateProduct {
  id: number;
  product: IDataAddProduct;
}
