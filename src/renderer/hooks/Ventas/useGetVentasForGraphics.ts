import { useEffect, useState } from 'react';
import { IVenta } from '../../../main/interfaces';
import { PagedList } from '../../../main/utils/Pagination';

interface IDataResponseAllVentas {
  result: PagedList<IVenta> | null;
  isLoading: boolean;
  isSuccess: boolean;
  status: string;
  error: Error | null;
}

export const useGetVentasForGraphics = ({ isValid, id }: IDataRequestFindById): IDataResponseAllVentas => {
const [result, setResult] = useState<PagedList<IVenta> | null>(null);
const [isLoading, setIsLoading] = useState<boolean>(false);
const [isSuccess, setIsSuccess] = useState<boolean>(false);
const [status, setStatus] = useState<string>('');
const [error, setError] = useState<Error | null>(null);
const [calls, setCalls] = useState<number>(0);
const page = 1;
const sizePage = 1000;

useEffect(() => {
  if (isValid && calls === 0) {
    setCalls(1);
    const callContractFunction = async (): Promise<void> => {
      setIsLoading(true);
      try {
        if(id <= 0)
        {
          const response = await window.electron.ipcRenderer.GetAllVentas({page, sizePage});
          setResult(response);
        }
        else
        {
          const response = await window.electron.ipcRenderer.GetAllVentasByCliente(id, {page, sizePage});
          setResult(response);
        }
          setIsSuccess(true);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
          setStatus('error');
        } else {
          setError(new Error('Se produjo un error desconocido'));
          setStatus('error');
        }
      } finally {
        setIsLoading(false);
        setCalls(0);
      }
    };
    callContractFunction();
  }
}, [isValid, calls]);

return {result, isLoading, isSuccess, status, error};
}
