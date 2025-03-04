import { useEffect, useState } from 'react';
import { IClient, IDataRequestFindById } from '../../../main/interfaces';

interface IDataResponse {
    result: IClient | null;
    isLoading: boolean;
    isSuccess: boolean;
    status: string;
    error: Error | null;
}

export const useGetClientById = (id: number): IDataResponse => {
  const [result, setResult] = useState<IClient | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('');
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (id > 0) {
      console.log(`entro en useGetClientById: ${id}`);
      const callContractFunction = async (): Promise<void> => {
        setIsLoading(true);
        try {
            const response = await window.electron.ipcRenderer.FindClienteById(id);
            setIsSuccess(true);
            console.log(response)
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
  }, [id]);

  return {result, isLoading, isSuccess, status, error};
}
