import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

interface IDataProps {
  title: string;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  disabled: boolean;
}

export const InputCard = ({title, value, onChange, disabled}:IDataProps):JSX.Element => {
  return (
    <InputGroup className="mb-3">
        <InputGroup.Text>{title}</InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={disabled}
        />
      </InputGroup>
  );
}
