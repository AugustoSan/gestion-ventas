
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Thunk } from '../../store';
import { IVenta } from '../../../../main/interfaces';
// import { findAllProducts } from '../../../../main/database/database';

interface IVentaSlice {
  ventasArray: Array<IVenta>;
  ventasArrayByClient: Array<IVenta>;
}

const initialState: IVentaSlice =
{
  ventasArray: [],
  ventasArrayByClient: [],
}

const ventaSlice = createSlice({
    name: 'ventas',
    initialState,
    reducers: {
      setVentasArray: (state, action: PayloadAction<Array<IVenta>>) => {
        console.log('Entro en setVentasArray: ', action.payload);
        state.ventasArray = action.payload;
      },
      setVentasArrayByClient: (state, action: PayloadAction<Array<IVenta>>) => {
        console.log('Entro en setVentasArrayByClient: ', action.payload);
        state.ventasArrayByClient = action.payload;
      },
    }
});

export const {
  setVentasArray,
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
