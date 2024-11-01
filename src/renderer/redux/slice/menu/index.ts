
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IItemMenu } from '../../../../main/interfaces';
import { menuItems } from '../../../utils/menuItems';

interface IMenuSlice {
  selectOption: string;
}

const initialState: IMenuSlice =
{
  selectOption: menuItems.home.href,
}

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setSelectMenu: (state, action: PayloadAction<string>) => {
            state.selectOption = action.payload;
        },
    }
});

export const {
  setSelectMenu
} = menuSlice.actions;

export default menuSlice.reducer;
