import path from 'path';
import fs from 'fs';

export const WriteLog = (msg: string): void => {
  const fecha: Date = new Date();
  const nameLog = `${fecha.getDay()}-${fecha.getMonth()}-${fecha.getFullYear()}-log.txt`;
  const filePath = path.join(__dirname, nameLog);
  fs.writeFile(filePath, msg, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Se ha creado el archivo: ${filePath}`);
    }
  });
}

export const WriteFileSQLBackup = (sql: string): void => {
  // const fecha: Date = new Date();
  const nameLog = `backupData.sql`;
  const filePath = path.join(__dirname, nameLog);
  fs.writeFile(filePath, sql, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Se ha creado el archivo: ${filePath}`);
    }
  });
}
