import { useEffect, useState } from 'react';
import { IPago, IDataRequestFindById } from '../../../main/interfaces';

interface IDataResponse {
    result: Array<IPago> | null;
    isLoading: boolean;
    isSuccess: boolean;
    status: string;
    error: Error | null;
}

export const useGetAllPagosByVenta = ({ isValid, id }: IDataRequestFindById): IDataResponse => {
  const [result, setResult] = useState<Array<IPago> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('');
  const [error, setError] = useState<Error | null>(null);
  const [calls, setCalls] = useState<number>(0);

  useEffect(() => {
    if (isValid && calls === 0) {
      setCalls(1);
      const callContractFunction = async (): Promise<void> => {
        setIsLoading(true);
        try {
            const response = await window.electron.ipcRenderer.GetAllPagosByVenta(id);
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
        }
      };
      callContractFunction();
    }
  }, [isValid, calls]);

  return {result, isLoading, isSuccess, status, error};
}
