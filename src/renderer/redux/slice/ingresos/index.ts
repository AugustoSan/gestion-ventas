
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IClient, IPago } from '../../../../main/interfaces';
import { Thunk } from '../../store';

interface IingresoSlice {
  selectView: "all" | "viewByClient" | "viewPago" | "add" | "update";
  listIngresos: Array<IPago>;
  selectClient: IClient | null;
}

const initialState: IingresoSlice =
{
  selectView: "all",
  listIngresos: [],
  selectClient: null
}

const ingresoSlice = createSlice({
    name: 'ingresos',
    initialState,
    reducers: {
      setSelectView: (state, action: PayloadAction<"all" | "viewByClient" | "viewPago" | "add" | "update">) =>{
        state.selectView = action.payload;
      },
      setListIngresos: (state, action: PayloadAction<Array<IPago>>) => {
        state.listIngresos = action.payload;
      },
      setSelectClient: (state, action: PayloadAction<IClient | null>) =>{
        state.selectClient = action.payload;
      },
    }
});

export const {
  setSelectView,
  setListIngresos,
  setSelectClient
} = ingresoSlice.actions;

export default ingresoSlice.reducer;

// export const GetAllPagos = (page: number, sizePage: number): Thunk => async (dispatch): Promise<Array<IVenta>> => {
export const GetAllPagos = (): Thunk => async (dispatch): Promise<Array<IPago>> => {
  const pagos = await window.electron.ipcRenderer.GetAllPagos();
  /* console.log('pagos: ', pagos); */
  // const pagination:IPaginationForSlides = createPaginationForSlides(ventas);
  dispatch(setListIngresos(pagos));
//  dispatch(setPagination(pagination));
  return [];
}
