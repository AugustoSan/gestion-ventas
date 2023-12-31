
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IClient, IDirection } from '../../../../main/interfaces';
import { Thunk } from '../../store';
import { IDataAddAddress, IDataAddClient, IDataUpdateClient } from '../../../../main/interfaces/IClients';
// import { findAllClients } from '../../../../main/database/database';

interface IClientSlice {
  searchCliente: Array<IClient>;
  selectClient: IClient | null;
  clientesArray: Array<IClient>;
  handleAddClient: boolean;
  handleWatchAddress: boolean;
  handleUpdateClient: boolean;
}

const initialState: IClientSlice =
{
  searchCliente: [],
  selectClient: null,
  clientesArray: [],
  handleAddClient: false,
  handleWatchAddress: false,
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
          console.log('Entro en setHandleAddClient: ', action.payload);
          state.handleAddClient = action.payload;
        },
        setHandleWatchAddress: (state, action: PayloadAction<boolean>) => {
          console.log('Entro en setHandleWatchAddress: ', action.payload);
          state.handleWatchAddress = action.payload;
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
        setAddAddressToClient: (state, action: PayloadAction<IDirection>) => {
          console.log('Entro en setAddAddressToClient: ', action.payload);
          const newArray = state.clientesArray.map((client) => {
            if(client.id === action.payload.id_client){
              client.direcciones = [...client.direcciones, action.payload];
            }
            return client;
          });
          state.clientesArray = newArray;
          if(state.selectClient !== null){
            state.selectClient.direcciones = [...state.selectClient.direcciones, action.payload]
          }
        },
    }
});

export const {
    setSelectClient,
    setHandleAddClient,
    setHandleWatchAddress,
    setHandleUpdateClient,
    setClientesArray,
    setSearchClientes,
    setAddClienteArray,
    updateClienteArray,
    deleteClienteArray,
    setAddAddressToClient,
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

// const AddClient = async(): Promise<>
// export const GetAllAddressFromClient = (id: number): Thunk => async (dispatch): Promise<Array<IDirection>> => {
//   // const filePath = await window.electron.getAllClients();
//   const address = await window.electron.ipcRenderer.FindAllAddressByClient(id);
//   console.log('GetAlladdress: ', address);
//   dispatch(setClientesArray(address));
//   return address;
// }

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


export const AddAddres = (address: IDataAddAddress): Thunk => async (dispatch): Promise<number> => {
  console.log('AddAddress');
  const result = await window.electron.ipcRenderer.AddAddress(address);
  console.log('result: ', result);
  if(result !== 0){
    const newAddress:IDirection = {
      id: result,
      id_client: address.id_client,
      direccion: address.direccion
    }
    dispatch(setAddAddressToClient(newAddress));
  }
  return 0;
}

export const UpdateAddress = (client: IDataUpdateClient): Thunk => async (dispatch): Promise<number> => {
  // const filePath = await window.electron.getAllClients();
  const result = await window.electron.ipcRenderer.UpdateClient(client);
  if(result !== 0){
    dispatch(updateClienteArray(client));
    dispatch(setSelectClient(null));
  }
  console.log('result: ', result);

  return 0;
}

export const DeleteAddress = (id: number): Thunk => async (dispatch): Promise<number> => {
  // const filePath = await window.electron.getAllClients();
  const result = await window.electron.ipcRenderer.DeleteClient(id);
  if(result !== 0){
    dispatch(deleteClienteArray(id));
    dispatch(setSelectClient(null));
  }
  console.log('result: ', result);

  return 0;
}
