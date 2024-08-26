import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { ItemAddVentaTabla } from '../../components/ItemAddVentaTabla';
import { numberToPrice } from '../../utils/price';
import { useGetAllPagosByVenta } from '../../hooks';
import { ItemPagoTabla } from '../../components/ItemPagoTabla';

interface IDataProps{
  id: number;
}

export const TablaPagosVenta = ({id}: IDataProps):JSX.Element => {
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const {
    result: arrayPagos,
    isLoading: isLoadingPagos,
    isSuccess: isSuccessPagos,
    error: errorPagos,
    status: statusPagos
  } = useGetAllPagosByVenta({isValid: isEnabled, id: id});

  return (
      <div className="card">
        <div className="card-body">
          <div className="table-responsive small">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Monto</th>
                <th scope="col">Fecha</th>
                <th scope="col">Ver</th>
              </tr>
            </thead>
            <tbody>
              {
                arrayPagos === null
                ? null
                : arrayPagos.map( (item, index) => {
                    return <ItemPagoTabla key={`${index}-${item.id}-item-pago-tabla`} pago={item}  />
                  })
              }
              {/* <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>Total: </td>
                <td>{numberToPrice(totalAddVenta)}</td>
                <td></td>
              </tr> */}
            </tbody>
          </Table>
          </div>
        </div>
      </div>
  );
}
