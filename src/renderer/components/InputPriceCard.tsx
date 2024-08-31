import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { numberToPrice } from '../utils/price';

interface IDataProps {
  title: string;
  value: number;
  onChange: React.Dispatch<React.SetStateAction<number>>;
  disabled?: boolean;
}

export const InputPriceCard = ({title, value, onChange, disabled = false}:IDataProps):JSX.Element => {
  return (
    <InputGroup className="mb-3">
      <Container>
        <Row>
          <Col xs={4}><InputGroup.Text>{title}</InputGroup.Text></Col>
          <Col xs={8}>
          <Form.Control
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              value={numberToPrice(value)} // Asegúrate de que `value` esté definido
              onChange={(event) => {
                try {
                  const valueWithSymbol = event.target.value;

                  // Si el valor contiene un símbolo `$`, limpia el valor
                  if (valueWithSymbol.includes('$')) {
                    const getNumber = valueWithSymbol.replace(/[$,.]/g, '');
                    /* console.log(`Nuevo valor: ${getNumber}`); */
                    const newNumberWithPoint: string = `${getNumber.substring(0, getNumber.length - 2)}.${getNumber.substring(getNumber.length - 2, getNumber.length)}`
                    const newValue = Number(newNumberWithPoint);

                    // Verifica que el nuevo valor sea un número válido
                    if (!isNaN(newValue)) {
                      onChange(newValue);
                    } else {
                      onChange(value); // Usa el valor original si el nuevo valor no es válido
                    }
                  } else {
                    // Si no contiene `$`, intenta convertir el valor directamente
                    const newValue = Number(valueWithSymbol.replace(/[$,]/g, ''));
                    if (!isNaN(newValue)) {
                      onChange(newValue);
                    } else {
                      onChange(value); // Usa el valor original si el nuevo valor no es válido
                    }
                  }
                } catch (error) {
                  console.log('Entró en catch', error);
                  onChange(value); // Usa el valor original en caso de error
                  alert(`Ocurrió un error: ${error}`);
                }
              }}
              disabled={disabled}
              placeholder={title}
            />

          </Col>
        </Row>
      </Container>
      </InputGroup>
  );
}
