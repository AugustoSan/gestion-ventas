import { useEffect, useState } from 'react';
import { IDataRequestFindById, IVenta } from '../../../main/interfaces';
import { PagedList } from '../../../main/utils/Pagination';

interface IDataResponseAllVentas {
  result: number;
  isLoading: boolean;
  isSuccess: boolean;
  status: string;
  error: Error | null;
}

export const useGetDeudaByClient = (id: number): IDataResponseAllVentas => {
const [result, setResult] = useState<number>(-1);
const [isLoading, setIsLoading] = useState<boolean>(false);
const [isSuccess, setIsSuccess] = useState<boolean>(false);
const [status, setStatus] = useState<string>('');
const [error, setError] = useState<Error | null>(null);
const [calls, setCalls] = useState<number>(0);

useEffect(() => {
  console.log(`Entro en useGetDeudaByClient`);
  if (id > 0) {
    setCalls(1);
    const callContractFunction = async (): Promise<void> => {
      setIsLoading(true);
      try {
          const response = await window.electron.ipcRenderer.GetDeudaByCliente(id);
          setIsSuccess(true);
          setResult(response);
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
}, [id]);

return {result, isLoading, isSuccess, status, error};
}
