import { BrowserRouter } from 'react-router-dom';
import Box from '@mui/material/Box';
// import { RouterComponent } from './router/RouterComponent';
import './public/css/bootstrap.min.css'
import {
  Toolbar,
} from '@mui/material';
import { Provider } from 'react-redux';
import store from './redux/store';
import { AppBarCustom } from './components/AppBar';
import { DrawerCustom } from './components/DrawerCustom';
import { RouterComponent } from './router/RouterComponent';

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Box sx={{ display: 'flex' }}>
        <AppBarCustom />
        {/* <Toolbar /> */}
        <DrawerCustom />
        <RouterComponent />
        {/* <BrowserRouter>
          <RouterComponent></RouterComponent>
        </BrowserRouter> */}
      </Box>
    </Provider>
  );
}
