import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { IClient, IProducto } from '../../main/interfaces';
import { SetStateAction, useState, useEffect } from 'react';
import Select from 'react-select';
import { useGetAllProducts } from '../hooks';
// import { FindPricesProduct } from '../redux/slice/productos';
// import { IDataFindPricesProduct } from '../../main/interfaces/IProducts';

interface IDataProps {
  onChangeValue: React.Dispatch<React.SetStateAction<IProducto | null>>;
  reset: boolean;
  disabled?: boolean;
}

interface OptionType {
  label: string;
  value: IProducto;
}

// export const InputFormSelectProduct = ({value, disabled = false}:IDataProps):JSX.Element => {
export const InputFormSelectProduct = ({onChangeValue, reset, disabled = false}:IDataProps):JSX.Element => {
  // const {productosArray} = useCustomSelector((state) => state.productSlice);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
  const {result, isLoading, isSuccess, error, status} = useGetAllProducts(isValid);

  const options:OptionType[] = result === null ? [] : result.map((producto) => {
    const newOption: OptionType = {
      label: producto.concepto,
      value: producto
    }
    return newOption;
  } );

  useEffect(() => {
    if(isSuccess) setIsValid(false);
  }, [isSuccess]);

  useEffect(() => {
    if(reset) setSelectedOption(null);
  }, [reset]);

  const handleChange = (option: OptionType | null) => {
    // Actualizar el estado del select
    setSelectedOption(option);

    // Ejecutar la acción de cambio si hay una opción seleccionada
    if (option) {
      console.log(option);
      if(option === null) return;
      onChangeValue(option.value);

      // Después de ejecutar la acción, reiniciar el estado
    }
  };

  return (
    <InputGroup className="mb-3">
      <Container>
        <Row>
          <Col xs={4}><InputGroup.Text>{"Seleccionar producto"}</InputGroup.Text></Col>
          <Col xs={8}>
            <Select
              value={selectedOption}
              defaultInputValue='Seleccionar producto'
              options={options}
              // onChange={(prod) => {
              //   console.log(prod);
              //   if(prod === null) return;
              //   onChange(prod.value);
              // }}
              onChange={handleChange}
              placeholder="Selecciona un producto"
              isClearable
              isSearchable
            />
          </Col>
        </Row>
      </Container>
    </InputGroup>
  );
}
