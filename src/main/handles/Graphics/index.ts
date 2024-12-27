import { getGraphics } from "../../database/graphics";
import { IFiltersGraphics, IGraphicResponse } from "../../interfaces/IGraphics";

export const getGraphicsHandler = async (event: Electron.IpcMainInvokeEvent, data: IFiltersGraphics):Promise<IGraphicResponse> => {
  console.log(`id_cliente: ${data.id_client}`);
  return await getGraphics(data);
}

