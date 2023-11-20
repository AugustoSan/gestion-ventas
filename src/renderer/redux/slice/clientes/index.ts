
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IClient } from '../../../../main/interfaces';
import { Thunk } from '../../store';
import { IDataAddClient, IDataUpdateClient } from '../../../../main/interfaces/IClients';
// import { findAllClients } from '../../../../main/database/database';

interface IClientSlice {
  searchCliente: Array<IClient>;
  selectClient: IClient | null;
  clientesArray: Array<IClient>;
  handleAddClient: boolean;
  handleUpdateClient: boolean;
}

const initialState: IClientSlice =
{
  searchCliente: [],
  selectClient: null,
  clientesArray: [],
  handleAddClient: false,
  handleUpdateClient: false
}

const clientSlice = createSlice({
    name: 'cliente',
    initialState,
    reducers: {
        setSelectClient: (state, action: PayloadAction<IClient | null>) => {
            console.log('Entro en setSelectClient: ', action.payload);
            state.selectClient = action.payload;
        },
        setHandleUpdateClient: (state, action: PayloadAction<boolean>) => {
          console.log('Entro en setHandleUpdateClient: ', action.payload);
          state.handleUpdateClient = action.payload;
        },
        setHandleAddClient: (state, action: PayloadAction<boolean>) => {
          console.log('Entro en setHandleUpdateClient: ', action.payload);
          state.handleAddClient = action.payload;
        },
        setSearchClientes: (state, action: PayloadAction<Array<IClient>>) => {
          console.log('Entro en setSearchClientes: ', action.payload);
          state.searchCliente = action.payload;
        },
        setClientesArray: (state, action: PayloadAction<Array<IClient>>) => {
          console.log('Entro en setClientesArray: ', action.payload);
          state.clientesArray = action.payload;
        },
        setAddClienteArray: (state, action: PayloadAction<IClient>) => {
          console.log('Entro en setAddClienteArray: ', action.payload);
          state.clientesArray = [...state.clientesArray,action.payload];
        },
        updateClienteArray: (state, action: PayloadAction<IDataUpdateClient>) => {
          console.log('Entro en setClientesArray: ', action.payload);
          const newArray = state.clientesArray.map((client, index) => {
            if(client.id === action.payload.id){
              client.name = action.payload.client.name;
              client.app = action.payload.client.app;
              client.apm = action.payload.client.apm;
              client.tel = action.payload.client.tel;
            }
            return client;
          });
          state.clientesArray = newArray;
        },
        deleteClienteArray: (state, action: PayloadAction<number>) => {
          console.log('Entro en setClientesArray: ', action.payload);
          const newArray = state.clientesArray.filter((client) => client.id !== action.payload);
          state.clientesArray = newArray;
        },
    }
});

export const {
    setSelectClient,
    setHandleAddClient,
    setHandleUpdateClient,
    setClientesArray,
    setSearchClientes,
    setAddClienteArray,
    updateClienteArray,
    deleteClienteArray
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

export const FindClient = (texto: string): Thunk => async (dispatch): Promise<Array<IClient>> => {
  // const filePath = await window.electron.getAllProducts();
  const cliente = await window.electron.ipcRenderer.FindCliente(texto);
  console.log('FindCliente: ', cliente);
  dispatch(setSearchClientes(cliente));
  return cliente;
}

export const AddClient = (client: IDataAddClient): Thunk => async (dispatch): Promise<number> => {
  // const filePath = await window.electron.getAllClients();
  const result = await window.electron.ipcRenderer.AddClient(client);
  console.log('result: ', result);
  if(result !== 0){
    const newClient:IClient = {
      id: result,
      name: client.name,
      app: client.app,
      apm: client.apm,
      saldo: 0,
      tel: client.tel,
      direcciones: []
    }
    dispatch(setAddClienteArray(newClient));
    dispatch(setHandleAddClient(false));
  }
  return 0;
}

export const UpdateClient = (client: IDataUpdateClient): Thunk => async (dispatch): Promise<number> => {
  // const filePath = await window.electron.getAllClients();
  const result = await window.electron.ipcRenderer.UpdateClient(client);
  if(result !== 0){
    dispatch(updateClienteArray(client));
    dispatch(setSelectClient(null));
  }
  console.log('result: ', result);

  return 0;
}

export const DeleteClient = (id: number): Thunk => async (dispatch): Promise<number> => {
  // const filePath = await window.electron.getAllClients();
  const result = await window.electron.ipcRenderer.DeleteClient(id);
  if(result !== 0){
    dispatch(deleteClienteArray(id));
    dispatch(setSelectClient(null));
  }
  console.log('result: ', result);

  return 0;
}
