import { IConfig } from "../../interfaces";

export const getConfigHandler = async (event: Electron.IpcMainInvokeEvent, data: []):Promise<IConfig> => {
  const config:IConfig = {
    host: process.env.DATABASE_HOST ?? 'Sin valor',
    port: process.env.DATABASE_PORT ?? 'Sin valor',
    database: process.env.DATABASE_DATABASE ?? 'Sin valor',
    user: process.env.DATABASE_USER ?? 'Sin valor'
  }
  // const host:ISetting = {
  //   title: "Host",
  //   value: process.env.DATABASE_HOST ?? 'Sin valor'
  // };
  // const port:ISetting = {
  //   title: "Puerto",
  //   value: process.env.DATABASE_PORT ?? 'Sin valor'
  // };
  // const database:ISetting = {
  //   title: "Base de datos",
  //   value: process.env.DATABASE_PASSWORD ?? 'Sin valor'
  // };
  // const user:ISetting = {
  //   title: "Usuario",
  //   value: process.env.DATABASE_USER ?? 'Sin valor'
  // };
  return config;
}
