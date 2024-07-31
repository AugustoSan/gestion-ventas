import { SetStateAction, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useCustomDispatch, useCustomSelector } from '../hooks/redux';
import { IClient, IPriceProduct, IProducto } from '../../main/interfaces';
import { InputNumberCard } from './InputNumberCard';
import { InputFormSelectProduct } from './InputFormSelectProduct';
import { InputFormSelectPriceProduct } from './InputFormSelectPriceProduct';
import { setAddProductAddVenta } from '../redux/slice/ventas';
import { IDataAddVentaProductos } from '../../main/interfaces/IVentas';
import { LabelInfoCard } from './LabelInfoCard';
import { InputCard } from './InputCard';

interface IDataProps {
  producto: IProducto | null;
  cliente: IClient;
  onChangeProduct: React.Dispatch<React.SetStateAction<IProducto | null>>;
}

export const InputProductItem = ({producto, cliente, onChangeProduct}:IDataProps):JSX.Element => {
  const dispatch = useCustomDispatch();
  const [inputCantidad, setInputCantidad] = useState<number>(0);
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const productDefault: IProducto = {
    id: 0,
    concepto: '',
    precio: 0,
    list_prices: []
  };

  const [inputProduct, setInputProduct] = useState<IProducto>(productDefault);

  useEffect(() => {
    if(producto === null) {
      setInputProduct(productDefault);
      setIsEnabled(false);
    }
    else {
      setInputProduct(producto)
      setIsEnabled(true);
    }
  }, [producto]);

  const validate = (): boolean => {
    if(inputProduct === productDefault){
      setError('Seleccione un producto');
      return false;
    }
    if(inputCantidad === 0){
      setError('Ingrese una cantidad mayor a cero.');
      return false;
    }
    setError('');
    return true;
  }

  return (
    <>
      <InputFormSelectProduct onChange={onChangeProduct} />
      <InputCard
          title={'Precio'}
          value={`$ ${inputProduct.precio.toLocaleString("es-ES", {style:"currency", currency:"MXN"})}`}
          onChange={() =>{}}
          disabled={true}
        />
      <InputNumberCard title={'Cantidad'} value={inputCantidad} onChange={setInputCantidad} />
      <div className="card mb-2">
        <Button variant="outline-primary" size="lg" onClick={() => {
          if(validate()){
            const newProduct: IDataAddVentaProductos = {
              id_producto: inputProduct.id,
              precio: inputProduct.precio,
              cantidad: inputCantidad
            }
            dispatch(setAddProductAddVenta(newProduct));
            setInputProduct(productDefault);
            setInputCantidad(0);
          }
        }}>
          {'Agregar producto'}
        </Button>
      </div>
      {
        error.length !== 0
        ? (<Alert variant={'danger'}>{error}</Alert>)
        : <></>
      }
    </>
  );
}
