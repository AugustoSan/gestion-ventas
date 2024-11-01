
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IItemMenu } from '../../../../main/interfaces';
import { menuItems } from '../../../utils/menuItems';

interface IMenuSlice {
  selectOption: string;
  id: number | null;
}

const initialState: IMenuSlice =
{
  selectOption: menuItems.home.href,
  id: 0,
}

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
      setSelectMenu: (state, action: PayloadAction<string>) => {
        console.log('entro en setSelectMenu');
        state.selectOption = action.payload;
      },
      setIdMenu: (state, action: PayloadAction<number | null>) => {
        console.log('entro en setIdMenu');
        state.id = action.payload;
      },
    }
});

export const {
  setSelectMenu,
  setIdMenu
} = menuSlice.actions;

export default menuSlice.reducer;
