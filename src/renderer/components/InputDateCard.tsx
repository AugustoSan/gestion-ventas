import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface IDataProps {
  value: Date;
  onChange: React.Dispatch<React.SetStateAction<Date>>;
  disabled: boolean;
}

export const InputDateCard = ({value, onChange, disabled = false}:IDataProps):JSX.Element => {
  return (
    <InputGroup className="mb-3">
      <Container>
        <Row>
          <Col xs={4}><InputGroup.Text>Fecha</InputGroup.Text></Col>
          <Col xs={8}>
            <Form.Control
              value={`${value.toISOString().slice(0, 10)}`}
              type={'date'}
              min="2000-01-01"
              max="2100-12-31"
              onChange={(event) => {
                console.log('event:', event.target.value);
                console.log(`${value.getFullYear()}-${value.getMonth()}-${value.getDay()}`);
                console.log(`${value.toISOString().slice(0, 10)}`);
                onChange(new Date(event.target.value));
              }}
              disabled={disabled}
            />
          </Col>
        </Row>
      </Container>
      </InputGroup>
  );
}
