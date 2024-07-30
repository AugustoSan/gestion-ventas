import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { IClient, IDirection } from "../../main/interfaces";
import { useCustomDispatch } from '../hooks/redux';
import { setSelectClient } from '../redux/slice/clientes';

interface IDataProps{
  address: IDirection;
  // setShow: React.Dispatch<React.SetStateAction<boolean>>
}

export const ItemAddressTabla = ({address}: IDataProps):JSX.Element => {
  const [inputAddress, setInputAddress] = useState(address.direccion ?? '');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const dispatch = useCustomDispatch();
  return (
  <tr>
    <td>{address.id}</td>
    <td>
      <Form.Control
        aria-label="Default"
        aria-describedby="inputGroup-sizing-default"
        value={inputAddress}
        onChange={(event) => setInputAddress(event.target.value)}
        disabled={!isEdit}
        placeholder={'Agregue una dirección'}
      />
    </td>
    <td>
      <Button
        variant="danger"
        onClick={
          () => {
            console.log(`se eliminara el address con id ${address.id}`);
            // dispatch(setSelectClient(address));
          }
        }
      >
        Eliminar
      </Button>
    </td>
    <td>
      <Button
        variant="primary"
        onClick={
          () => {
            console.log(`se editara el address con id ${address.id}`);
            setIsEdit(!isEdit);
            // dispatch(setUpda)
          }
        }
      >
        {
          isEdit === true ? 'Guardar' : 'Editar'
        }
      </Button>
    </td>
  </tr>
  );
}
