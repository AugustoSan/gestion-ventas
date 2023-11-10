
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IClient } from '../../../interfaces';

interface IClientSlice {
    cliente: IClient;
    selectClient: IClient | null;
}

const initialState: IClientSlice =
{
    cliente :
    {
        id: 0,
        nombre: '',
        app: '',
        apm: '',
        saldo: 0,
        telefono: '',
        direcciones: []
    },
    selectClient: null
}

const clientSlice = createSlice({
    name: 'cliente',
    initialState,
    reducers: {
        setCliente: (state, action: PayloadAction<IClient>) => {
            console.log('Entro en setCliente: ', action.payload);

            // state.cliente.id = action.payload.id;
            // state.cliente.nombre = action.payload.nombre;
            // state.cliente.app = action.payload.app;
            // state.cliente.apm = action.payload.apm;
            // state.cliente.telefono = action.payload.telefono;
            // state.cliente.saldo = action.payload.saldo;
            // state.cliente.direcciones = action.payload.direcciones;
            state.cliente = action.payload;
        },
        setSelectClient: (state, action: PayloadAction<IClient | null>) => {
            console.log('Entro en setSelectClient: ', action.payload);

            // state.cliente.id = action.payload.id;
            // state.cliente.nombre = action.payload.nombre;
            // state.cliente.app = action.payload.app;
            // state.cliente.apm = action.payload.apm;
            // state.cliente.telefono = action.payload.telefono;
            // state.cliente.saldo = action.payload.saldo;
            // state.cliente.direcciones = action.payload.direcciones;
            state.selectClient = action.payload;
        },
        // increment: (state) => {
        //     state.value += 1
        //   },
        //   decrement: (state) => {
        //     state.value -= 1
        //   },
        //   // Use the PayloadAction type to declare the contents of `action.payload`
        //   incrementByAmount: (state, action: PayloadAction<number>) => {
        //     state.value += action.payload
        //   },
    }
});

export const {
    setCliente,
    setSelectClient
} = clientSlice.actions;

export default clientSlice.reducer;
