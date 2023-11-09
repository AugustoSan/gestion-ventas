
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IClient } from '../../../interfaces';

const initialState: IClient = {
    id: 0,
    nombre: '',
    app: '',
    apm: '',
    saldo: 0,
    telefono: '',
    direcciones: []
}

const clientSlice = createSlice({
    name: 'cliente',
    initialState,
    reducers: {
        setCliente: (state, action: PayloadAction<IClient>) => {
            console.log('Entro en setCliente: ', action.payload);
            
            state.id = action.payload.id;
            state.nombre = action.payload.nombre;
            state.app = action.payload.app;
            state.apm = action.payload.apm;
            state.telefono = action.payload.telefono;
            state.saldo = action.payload.saldo;
            state.direcciones = action.payload.direcciones;
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
    setCliente
} = clientSlice.actions;

export default clientSlice.reducer;