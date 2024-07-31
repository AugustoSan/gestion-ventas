
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Thunk } from '../../store';
import { IClient, IDirection, IPrecioProductoCliente, IVenta } from '../../../../main/interfaces';
import { IDataAddVenta, IDataAddVentaProductos } from '../../../../main/interfaces/IVentas';
import { IDataPagination } from '../../../../main/interfaces/IProducts';
import { createPaginationForSlides } from '../../../utils/pagination';
// import { findAllProducts } from '../../../../main/database/database';

interface IVentaSlice {
  selectVenta: IVenta | null;
  selectClientSearchVentas: number | null;
  ventasArray: Array<IVenta>;
  handleAddVenta: boolean;
  addVenta: IDataAddVenta | null;
  addVentaListPricesProduct: Array<IPrecioProductoCliente>;
  selectClient: IClient | null;
  selectAddress: IDirection | null;
  selectFecha: string | null;
  selectProductos: Array<IDataAddVentaProductos>;
  totalAddVenta: number;
  selectView: "all"  | "addCliente" | "addProducts" | "infoVenta";
  pagination: IPaginationForSlides;
}

const initialState: IVentaSlice =
{
  selectVenta: null,
  selectClientSearchVentas: null,
  ventasArray: [],
  handleAddVenta: false,
  addVenta: null,
  addVentaListPricesProduct: [],
  selectView: "all",
  selectClient: null,
  selectAddress: null,
  selectFecha: null,
  totalAddVenta: 0,
  selectProductos: [],

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
  }
}

const ventaSlice = createSlice({
    name: 'ventas',
    initialState,
    reducers: {
      setSelectClienteSearch: (state, action: PayloadAction<number | null>) =>{
        state.selectClientSearchVentas = action.payload;
      },
      setSelectView: (state, action: PayloadAction<"all"  | "addCliente" | "addProducts" | "infoVenta">) =>{
        if(action.payload === "all"){
          state.addVenta = null;
          state.handleAddVenta = false;
          state.selectAddress = null;
          state.selectClient = null;
          state.selectFecha = null;
          state.selectProductos = [];
          state.selectVenta = null;
        }
        state.selectView = action.payload;
      },
      setAddVenta: (state, action: PayloadAction<IDataAddVenta | null>) =>{
        state.addVenta = action.payload;
      },
      setHandleAddVenta: (state, action: PayloadAction<boolean>) =>{
        state.handleAddVenta = action.payload;
      },
      setSelectVenta: (state, action: PayloadAction<IVenta | null>) =>{
        state.selectVenta = action.payload;
      },
      setVentasArray: (state, action: PayloadAction<Array<IVenta>>) => {
        console.log('Entro en setVentasArray: ', action.payload);
        state.ventasArray = action.payload;
        // state.ventasArray = action.payload.map(venta => ({
        //   ...venta,
        //   fecha: new Date(venta.fecha), // Convertir la fecha a una cadena ISO
        // }));      
      },
      setAddListPricesProductArray: (state, action: PayloadAction<Array<IPrecioProductoCliente>>) => {
        console.log('Entro en setAddListPricesProductArray: ', action.payload);
        state.addVentaListPricesProduct = action.payload;
      },
      setAddItemVentasArray: (state, action: PayloadAction<IVenta>) => {
        console.log('Entro en setAddItemVentasArray: ', action.payload);
        state.ventasArray = [...state.ventasArray, action.payload];
      },
      setAddClienteInAddVenta: (state, action: PayloadAction<IClient | null>) => {
        state.selectClient = action.payload;
      },
      setAddAddressInAddVenta: (state, action: PayloadAction<IDirection | null>) => {
        state.selectAddress = action.payload;
      },
      setAddDateInAddVenta: (state, action: PayloadAction<string | null>) => {
        state.selectFecha = action.payload;
      },
      setAddProductAddVenta: (state, action: PayloadAction<IDataAddVentaProductos>) => {
        state.selectProductos = [action.payload, ...state.selectProductos];
        let total = 0;
        state.selectProductos.map((producto) => {
          total = total + (producto.precio * producto.cantidad);
        })
        state.totalAddVenta = total;
        console.log('totalAddVenta: ', state.totalAddVenta);
      },
      deleteAddProductAddVenta: (state, action: PayloadAction<IDataAddVentaProductos>) => {
        const products = state.selectProductos.filter((producto) => producto.id_producto !== action.payload.id_producto);
        if(products.length !== state.selectProductos.length) {
          state.totalAddVenta = state.totalAddVenta - (action.payload.cantidad * action.payload.precio);
        }
        state.selectProductos = products;
        console.log('totalAddVenta: ', state.totalAddVenta);
      },
      setPagination: (state, action: PayloadAction<IPaginationForSlides>) => {
        console.log('Entro en setPagination: ', action.payload);
        state.pagination = action.payload;
      },
    }
});

export const {
  setSelectClienteSearch,
  setSelectView,
  setAddVenta,
  setHandleAddVenta,
  setSelectVenta,
  setVentasArray,
  setAddItemVentasArray,
  setAddListPricesProductArray,
  setAddClienteInAddVenta,
  setAddAddressInAddVenta,
  setAddDateInAddVenta,
  setAddProductAddVenta,
  deleteAddProductAddVenta,
  setPagination,
} = ventaSlice.actions;

export default ventaSlice.reducer;

export const GetAllVentas = (page: number, sizePage: number): Thunk => async (dispatch): Promise<Array<IVenta>> => {
  const ventas = await window.electron.ipcRenderer.GetAllVentas({page, sizePage});
  console.log('ventas: ', ventas);
  const pagination:IPaginationForSlides = createPaginationForSlides(ventas);
  dispatch(setVentasArray(ventas.items));
  dispatch(setPagination(pagination));
  return [];
}

export const GetAllVentasByClient = (id: number, page: number, sizePage: number ): Thunk => async (dispatch): Promise<Array<IVenta>> => {
  const ventas = await window.electron.ipcRenderer.GetAllVentasByCliente(id, {page, sizePage});
  console.log('ventas: ', ventas);
  const pagination:IPaginationForSlides = createPaginationForSlides(ventas);
  dispatch(setVentasArray(ventas.items));
  dispatch(setPagination(pagination));
  return [];
}

// export const GetVentaByID = (id: number): Thunk => async (dispatch): Promise<void> => {
//   const venta = await window.electron.ipcRenderer.GetVentaByID(id);
//   console.log('venta: ', venta);
//   dispatch(setSelectVenta(venta));
// }

export const AddNewVenta = (venta: IDataAddVenta): Thunk => async (dispatch): Promise<void> => {
  const id = await window.electron.ipcRenderer.AddVenta(venta);
  console.log('id: ', id);
  const productos = await window.electron.ipcRenderer.GetProductosFromVenta(id);
  // const newVenta:IVenta = {
  //   ...venta,
  //   productos,
  //   id,
  // }
  // dispatch(setAddItemVentasArray(newVenta))
}
