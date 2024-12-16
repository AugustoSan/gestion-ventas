/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import path from 'path';
import fs from 'fs';

export function resolveHtmlPath(htmlFileName: string) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}

// interface IDataLog {
//   text: string
// }

// export const appendLogFile = ({text}: IDataLog): void => {
//   try {
//     const fechaActual = new Date(Date.now());
//     const rutaArchivo = `${__dirname}/logs/${fechaActual.getDay()}-${fechaActual.getMonth()}-${fechaActual.getFullYear()}-log.txt`;
//     // Escribe el contenido en el archivo
//     fs.appendFile(rutaArchivo, text, (err) => {
//       if (err) throw err;
//       console.log('Saved!');
//     });
//   } catch (error) {
//     console.log('Error al guardar en el Log: ', error);
//   }
// }
