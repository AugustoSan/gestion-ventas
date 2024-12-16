/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import { BrowserWindow } from 'electron';

export const createErrorWindow = (errorWindow: BrowserWindow | null,errorMessages: string[]) => {
  errorWindow = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Load error page with the error messages passed as query parameters or send via IPC
  errorWindow.loadURL(
    `data:text/html;charset=utf-8,
    <html>
      <head><title>Error</title></head>
      <body>
        <h1>Initialization Errors</h1>
        <ul>
          ${errorMessages.map((msg) => `<li>${msg}</li>`).join('')}
        </ul>
      </body>
    </html>`
  );

  errorWindow.on('closed', () => {
    errorWindow = null;
  });
};
