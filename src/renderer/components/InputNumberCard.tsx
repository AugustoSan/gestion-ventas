import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface IDataProps {
  title: string;
  value: number;
  onChange: React.Dispatch<React.SetStateAction<number>>;
  disabled?: boolean;
}

export const InputNumberCard = ({title, value, onChange, disabled = false}:IDataProps):JSX.Element => {
  return (
    <InputGroup className="mb-3">
      <Container>
        <Row>
          <Col xs={4}><InputGroup.Text>{title}</InputGroup.Text></Col>
          <Col xs={8}>
            <Form.Control
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              value={value}
              onChange={(event) => {
                try {
                  console.log(`nuevo valor: ${event.target.value}`);
                  const newValue:number = Number(event.target.value);
                  if (!isNaN(newValue)) { // Ensure newValue is a valid number
                    onChange(newValue);
                  } else {
                    onChange(value);
                  }
                } catch (error) {
                  console.log('Entro en catch', error);
                  onChange(value);
                  alert(`Ocurrio un error: ${error}`,)
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
