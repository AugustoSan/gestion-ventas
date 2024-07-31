
import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { IPriceProduct, IProducto } from '../../../../main/interfaces';
import { Thunk } from '../../store';
import { IDataAddProduct, IDataUpdateProduct } from '../../../../main/interfaces/IProducts';
import { createPaginationForSlides } from '../../../utils/pagination';
// import { findAllProducts } from '../../../../main/database/database';

interface IProductSlice {
  selectProducto: IProducto | null;
  productosArray: Array<IProducto>;
  handleAddProducto: boolean;
  handleUpdateProducto: boolean;
  handleSearchProducto: boolean;
  //Pagination
  pagination: IPaginationForSlides;
}

const initialState: IProductSlice =
{
    selectProducto: null,
    productosArray: [],
    handleAddProducto: false,
    handleUpdateProducto: false,
    handleSearchProducto: false,

    // Pagination
    pagination: {
      currentPage: 0,
      sizePage: 10,
      totalPages: 0,
      totalCount: 0,
      hasPreviousPage: false,
      hasNextPage: false,
      nextPageNumber: null,
      previousPageNumber: null
    },
}

const productSlice = createSlice({
    name: 'producto',
    initialState,
    reducers: {
        // setSearchProducto: (state, action: PayloadAction<Array<IProducto> | null>) => {
        //   console.log('Entro en setSearchProducto: ', action.payload);
        //   state.searchProducto = action.payload;
        // },
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
          const items = [...state.productosArray,action.payload];
          state.productosArray = items;
        },
        updateProductoArray: (state, action: PayloadAction<IDataUpdateProduct>) => {
          console.log('Entro en updateProductoArray: ', action.payload);
          const items = state.productosArray;
          const newArray = items.map((product, index) => {
            if(product.id === action.payload.id){
              product.concepto = action.payload.product.concepto;
              product.precio = action.payload.product.precio;
            }
            return product;
          });
          state.productosArray = items;
        },
        deleteProductoArray: (state, action: PayloadAction<number>) => {
          console.log('Entro en deleteProducteArray: ', action.payload);
          const items = state.productosArray;
          const newArray = items.filter((product) => product.id !== action.payload);
          state.productosArray = items;
        },
        setPagination: (state, action: PayloadAction<IPaginationForSlides>) => {
          console.log('Entro en setPagination: ', action.payload);
          state.pagination = action.payload;
        },
        // setPaginationSearch: (state, action: PayloadAction<IPaginationForSlides>) => {
        //   console.log('Entro en setPagination: ', action.payload);
        //   state.paginationSearch = action.payload;
        // },
    }
});

export const {
  // setSearchProducto,
  setSelectProduct,
  setHandleAddProduct,
  setHandleUpdateProduct,
  setHandleSearchProduct,
  setProductosArray,
  setAddProductoArray,
  updateProductoArray,
  deleteProductoArray,
  setPagination,
  // setPaginationSearch,
} = productSlice.actions;

export default productSlice.reducer;

// const AddProduct = async(): Promise<>
export const GetAllProducts = (page: number, sizePage: number): Thunk => async (dispatch): Promise<Array<IProducto>> => {
  // const filePath = await window.electron.getAllProducts();
  const Products = await window.electron.ipcRenderer.GetAllProducts({page, sizePage});
  console.log('GetAllProducts: ', Products);
  const pagination:IPaginationForSlides = createPaginationForSlides(Products);
  console.log('pagination', pagination);
  dispatch(setProductosArray(Products.items));
  dispatch(setPagination(pagination));
  return Products.items;
}

export const FindProduct = (concepto: string, page: number, sizePage: number): Thunk => async (dispatch): Promise<Array<IProducto>> => {
  // const filePath = await window.electron.getAllProducts();
  const products = await window.electron.ipcRenderer.FindProducto(concepto, {page, sizePage});
  console.log('FindProduct: ', products);
  const pagination:IPaginationForSlides = createPaginationForSlides(products);
  dispatch(setProductosArray(products.items));
  dispatch(setPagination(pagination));
  dispatch(setHandleSearchProduct(false));
  return products.items;
}

// export const FindPricesProduct = (data: IDataFindPricesProduct): Thunk => async (dispatch): Promise<Array<IPriceProduct>> => {
//   // const filePath = await window.electron.getAllProducts();
//   const prices = await window.electron.ipcRenderer.FindPricesProducto(data);
//   console.log('FindProduct: ', prices);
//   // dispatch(setSearchProducto(product));
//   dispatch(setAddListPricesProductArray(prices));
//   return prices;
// }

export const AddProduct = (product: IDataAddProduct): Thunk => async (dispatch): Promise<number> => {
  // const filePath = await window.electron.getAllProducts();
  const result = await window.electron.ipcRenderer.AddProduct(product);
  console.log('result: ', result);
  if(result !== 0){
    const newProduct:IProducto = {
      id: result,
      concepto: product.concepto,
      precio: product.precio,
      list_prices: []
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
