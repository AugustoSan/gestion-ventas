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
  onChange: React.Dispatch<React.SetStateAction<IProducto | null>>;
  disabled?: boolean;
}

interface OptionType {
  label: string;
  value: IProducto;
}

export const InputFormSelectProduct = ({onChange, disabled = false}:IDataProps):JSX.Element => {
  // const {productosArray} = useCustomSelector((state) => state.productSlice);
  const [isValid, setIsValid] = useState<boolean>(true);
  const {result, isLoading, isSuccess, error, status} = useGetAllProducts(isValid);

  const options:OptionType[] = result === null ? [] : result.map((producto) => {
    const newOption: OptionType = {
      label: producto.concepto,
      value: producto
    }
    return newOption;
  } );

  const productDefault:IProducto = {
    id: 0,
    concepto: 'Selecciona un producto',
    precio: 0,
    list_prices: []
  }

  useEffect(() => {
    if(isSuccess) setIsValid(false);
  }, [isSuccess])


  return (
    <InputGroup className="mb-3">
      <Container>
        <Row>
          <Col xs={4}><InputGroup.Text>{"Seleccionar producto"}</InputGroup.Text></Col>
          <Col xs={8}>
            <Select
              options={options}
              onChange={(prod) => {
                console.log(prod);
                if(prod === null) return;
                onChange(prod.value);
              }}
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
