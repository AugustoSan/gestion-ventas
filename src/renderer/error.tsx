import { createRoot } from 'react-dom/client';

import './public/css/error.css'

const App: React.FC = () => {
  return (
  <div className='error-container'>
    <h1>An Error Occurred</h1>
    <p id='error-message'>An unexpected error has occurred. Please try again later.</p>
  </div>

  );
}


const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log('arg: ', arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);


