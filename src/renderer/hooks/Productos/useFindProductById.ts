import { useEffect, useState } from 'react';
import { IClient, IProducto, IDataRequestFindById } from '../../../main/interfaces';

interface IDataResponse {
    result: IProducto | null;
    isLoading: boolean;
    isSuccess: boolean;
    status: string;
    error: Error | null;
}

export const useFindProductById = ({ isValid, id }: IDataRequestFindById
): IDataResponse => {
  const [result, setResult] = useState<IProducto | null>(null);
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
            const response = await window.electron.ipcRenderer.FindProductoById(id);
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
