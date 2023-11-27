
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Thunk } from '../../store';
import { IClient, IDirection, IPrecioProductoCliente, IVenta } from '../../../../main/interfaces';
import { IDataAddVenta } from '../../../../main/interfaces/IVentas';
// import { findAllProducts } from '../../../../main/database/database';

interface IVentaSlice {
  selectVenta: IVenta | null;
  ventasArray: Array<IVenta>;
  ventasArrayByClient: Array<IVenta>;
  handleAddVenta: boolean;
  addVenta: IDataAddVenta | null;
  addVentaListPricesProduct: Array<IPrecioProductoCliente>
}

const initialState: IVentaSlice =
{
  selectVenta: null,
  ventasArray: [],
  ventasArrayByClient: [],
  handleAddVenta: false,
  addVenta: null,
  addVentaListPricesProduct: []
}

const ventaSlice = createSlice({
    name: 'ventas',
    initialState,
    reducers: {
      setAddVenta: (state, action: PayloadAction<IDataAddVenta>) =>{
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
      },
      setAddListPricesProductArray: (state, action: PayloadAction<Array<IPrecioProductoCliente>>) => {
        console.log('Entro en setAddListPricesProductArray: ', action.payload);
        state.addVentaListPricesProduct = action.payload;
      },
      setAddItemVentasArray: (state, action: PayloadAction<IVenta>) => {
        console.log('Entro en setAddItemVentasArray: ', action.payload);
        state.ventasArray = [...state.ventasArray, action.payload];
      },
      setVentasArrayByClient: (state, action: PayloadAction<Array<IVenta>>) => {
        console.log('Entro en setVentasArrayByClient: ', action.payload);
        state.ventasArrayByClient = action.payload;
      },
    }
});

export const {
  setAddVenta,
  setHandleAddVenta,
  setSelectVenta,
  setVentasArray,
  setAddItemVentasArray,
  setAddListPricesProductArray,
  setVentasArrayByClient,
} = ventaSlice.actions;

export default ventaSlice.reducer;

export const GetAllVentas = (): Thunk => async (dispatch): Promise<Array<IVenta>> => {
  const ventas = await window.electron.ipcRenderer.GetAllVentas();
  console.log('ventas: ', ventas);
  dispatch(setVentasArray(ventas));
  return [];
}

export const GetAllVentasByClient = (id: number): Thunk => async (dispatch): Promise<Array<IVenta>> => {
  const ventas = await window.electron.ipcRenderer.GetAllVentasByCliente(id);
  console.log('ventas del cliente: ', ventas);
  dispatch(setVentasArrayByClient(ventas));
  return [];
}

export const GetVentaByID = (id: number): Thunk => async (dispatch): Promise<void> => {
  const venta = await window.electron.ipcRenderer.GetVentaByID(id);
  console.log('venta: ', venta);
  dispatch(setSelectVenta(venta));
}

export const AddVenta = (venta: IDataAddVenta): Thunk => async (dispatch): Promise<void> => {
  const id = await window.electron.ipcRenderer.AddVenta(venta);
  const productos = await window.electron.ipcRenderer.GetProductosFromVenta(id);
  // const newVenta:IVenta = {
  //   ...venta,
  //   productos,
  //   id,
  // }
  // dispatch(setAddItemVentasArray(newVenta))
}
