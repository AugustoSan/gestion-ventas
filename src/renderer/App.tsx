import { BrowserRouter } from 'react-router-dom';
import { RouterComponent } from './router/RouterComponent';
import './public/css/bootstrap.min.css'
import { Menu } from './components/Menu';
import { Header } from './components/Header';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Menu />
          <RouterComponent></RouterComponent>
        </div>
      </div>
    </BrowserRouter>
  );
}
