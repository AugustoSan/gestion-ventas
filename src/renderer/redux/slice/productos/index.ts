
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProducto } from '../../../../main/interfaces';
import { Thunk } from '../../store';
import { IDataAddProduct, IDataUpdateProduct } from '../../../../main/interfaces/IProducts';
// import { findAllProducts } from '../../../../main/database/database';

interface IProductSlice {
  searchProducto: Array<IProducto> | null;
  selectProducto: IProducto | null;
  productosArray: Array<IProducto>;
  handleAddProducto: boolean;
  handleUpdateProducto: boolean;
  handleSearchProducto: boolean;
}

const initialState: IProductSlice =
{
    searchProducto: null,
    selectProducto: null,
    productosArray: [],
    handleAddProducto: false,
    handleUpdateProducto: false,
    handleSearchProducto: false,
}

const productSlice = createSlice({
    name: 'producto',
    initialState,
    reducers: {
        setSearchProducto: (state, action: PayloadAction<Array<IProducto> | null>) => {
          console.log('Entro en setSearchProducto: ', action.payload);
          state.searchProducto = action.payload;
        },
        setSelectProduct: (state, action: PayloadAction<IProducto | null>) => {
            console.log('Entro en setSelectProduct: ', action.payload);
            state.selectProducto = action.payload;
        },
        setHandleUpdateProduct: (state, action: PayloadAction<boolean>) => {
          console.log('Entro en setHandleUpdateProduct: ', action.payload);
          state.handleUpdateProducto = action.payload;
        },
        setHandleAddProduct: (state, action: PayloadAction<boolean>) => {
          console.log('Entro en setHandleAddProduct: ', action.payload);
          state.handleAddProducto = action.payload;
        },
        setHandleSearchProduct: (state, action: PayloadAction<boolean>) => {
          console.log('Entro en setHandleAddProduct: ', action.payload);
          state.handleSearchProducto = action.payload;
        },
        setProductosArray: (state, action: PayloadAction<Array<IProducto>>) => {
          console.log('Entro en setProductesArray: ', action.payload);
          state.productosArray = action.payload;
        },
        setAddProductoArray: (state, action: PayloadAction<IProducto>) => {
          console.log('Entro en setAddProducteArray: ', action.payload);
          state.productosArray = [...state.productosArray,action.payload];
        },
        updateProductoArray: (state, action: PayloadAction<IDataUpdateProduct>) => {
          console.log('Entro en updateProductoArray: ', action.payload);
          const newArray = state.productosArray.map((product, index) => {
            if(product.id === action.payload.id){
              product.concepto = action.payload.product.concepto;
              product.precio = action.payload.product.precio;
            }
            return product;
          });
          state.productosArray = newArray;
        },
        deleteProductoArray: (state, action: PayloadAction<number>) => {
          console.log('Entro en deleteProducteArray: ', action.payload);
          const newArray = state.productosArray.filter((product) => product.id !== action.payload);
          state.productosArray = newArray;
        },
    }
});

export const {
  setSearchProducto,
  setSelectProduct,
  setHandleAddProduct,
  setHandleUpdateProduct,
  setHandleSearchProduct,
  setProductosArray,
  setAddProductoArray,
  updateProductoArray,
  deleteProductoArray
} = productSlice.actions;

export default productSlice.reducer;

// const AddProduct = async(): Promise<>
export const GetAllProducts = (): Thunk => async (dispatch): Promise<Array<IProducto>> => {
  // const filePath = await window.electron.getAllProducts();
  const Products = await window.electron.ipcRenderer.GetAllProducts();
  console.log('GetAllProducts: ', Products);
  dispatch(setProductosArray(Products));
  return Products;
}

export const FindProduct = (concepto: string): Thunk => async (dispatch): Promise<Array<IProducto>> => {
  // const filePath = await window.electron.getAllProducts();
  const product = await window.electron.ipcRenderer.FindProducto(concepto);
  console.log('FindProduct: ', product);
  dispatch(setSearchProducto(product));
  dispatch(setHandleSearchProduct(false));
  return product;
}

export const AddProduct = (product: IDataAddProduct): Thunk => async (dispatch): Promise<number> => {
  // const filePath = await window.electron.getAllProducts();
  const result = await window.electron.ipcRenderer.AddProduct(product);
  console.log('result: ', result);
  if(result !== 0){
    const newProduct:IProducto = {
      id: result,
      concepto: product.concepto,
      precio: product.precio
    }
    dispatch(setAddProductoArray(newProduct));
    dispatch(setHandleAddProduct(false));
  }
  return 0;
}

export const UpdateProduct = (Product: IDataUpdateProduct): Thunk => async (dispatch): Promise<number> => {
  // const filePath = await window.electron.getAllProducts();
  const result = await window.electron.ipcRenderer.UpdateProduct(Product);
  if(result !== 0){
    dispatch(updateProductoArray(Product));
    dispatch(setSelectProduct(null));
  }
  console.log('result: ', result);

  return 0;
}

export const DeleteProduct = (id: number): Thunk => async (dispatch): Promise<number> => {
  // const filePath = await window.electron.getAllProducts();
  const result = await window.electron.ipcRenderer.DeleteProduct(id);
  if(result !== 0){
    dispatch(deleteProductoArray(id));
    dispatch(setSelectProduct(null));
  }
  console.log('result: ', result);

  return 0;
}
