
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IClient } from '../../../../main/interfaces';
import { Thunk } from '../../store';
import { IDataAddClient } from '../../../../main/interfaces/IClients';
// import { findAllClients } from '../../../../main/database/database';

interface IClientSlice {
    cliente: IClient;
    selectClient: IClient | null;
    clientesArray: Array<IClient>;
    handleSelectClient: boolean;
}

const initialState: IClientSlice =
{
    cliente :
    {
        id: 0,
        name: '',
        app: '',
        apm: '',
        saldo: 0,
        tel: '',
        direcciones: []
    },
    selectClient: null,
    clientesArray: [],
    handleSelectClient: false
}

const clientSlice = createSlice({
    name: 'cliente',
    initialState,
    reducers: {
        setCliente: (state, action: PayloadAction<IClient>) => {
            console.log('Entro en setCliente: ', action.payload);
            state.cliente = action.payload;
        },
        setSelectClient: (state, action: PayloadAction<IClient | null>) => {
            console.log('Entro en setSelectClient: ', action.payload);
            state.selectClient = action.payload;
            state.handleSelectClient = action.payload === null ? false : true;
        },
        setClientesArray: (state, action: PayloadAction<Array<IClient>>) => {
          console.log('Entro en setClientesArray: ', action.payload);
          state.clientesArray = action.payload;
      },
    }
});

export const {
    setCliente,
    setSelectClient,
    setClientesArray
} = clientSlice.actions;

export default clientSlice.reducer;

// const AddClient = async(): Promise<>
export const GetAllClients = (): Thunk => async (dispatch): Promise<Array<IClient>> => {
  // const filePath = await window.electron.getAllClients();
  const clients = await window.electron.ipcRenderer.GetAllClients();
  console.log('GetAllClients: ', clients);
  dispatch(setClientesArray(clients));
  return clients;
}

export const AddClient = (client: IDataAddClient): Thunk => async (dispatch): Promise<number> => {
  // const filePath = await window.electron.getAllClients();
  const result = await window.electron.ipcRenderer.AddClient(client);
  console.log('result: ', result);

  return 0;
}
