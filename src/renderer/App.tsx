import { BrowserRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { RouterComponent } from './router/RouterComponent';
import './public/css/bootstrap.min.css'
import { Menu } from './components/Menu';
import { Header } from './components/Header';
import { Provider } from 'react-redux';
import store from './redux/store';

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <div className="container-fluid">
          <div className="row">
            <Menu />
            <RouterComponent></RouterComponent>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
}
