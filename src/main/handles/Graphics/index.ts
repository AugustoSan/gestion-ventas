import { getGraphics } from "../../database/graphics";
import { IFiltersGraphics, IGraphicResponse } from "../../interfaces/IGraphics";

export const getGraphicsHandler = async (event: Electron.IpcMainInvokeEvent, data: IFiltersGraphics):Promise<IGraphicResponse> => {
  return await getGraphics(data);
}

