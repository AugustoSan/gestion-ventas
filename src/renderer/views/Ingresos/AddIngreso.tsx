import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux';
import { IClient } from '../../../main/interfaces';
import { GetAllVentas, setHandleAddVenta, setSelectClienteSearch, setSelectView } from '../../redux/slice/ventas';
import { Table } from 'react-bootstrap';

export const AddIngreso = ():JSX.Element => {
  const {clientesArray} = useCustomSelector((state) => state.clientSlice);
  const {handleAddVenta, selectView, addVenta, pagination, selectVenta} = useCustomSelector((state) => state.ventaSlice);
  const [client, setClient] = useState<IClient | null>(null);
  const [dropdownSelect, setDropdownSelect] = useState<string>(client === null ? 'Seleccionar cliente' : `${client.nombre} ${client.apellidopaterno}`);
  const {
    currentPage, sizePage, totalPages, totalCount,
    hasPreviousPage, hasNextPage, nextPageNumber, previousPageNumber
  } = pagination;

  const dispatch = useCustomDispatch();

  useEffect(() => {
    dispatch(GetAllVentas(currentPage, sizePage));
  }, []);


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
              {/* {
                arrayPagos === null
                ? null
                : arrayPagos.map( (item, index) => {
                    return <ItemPagoTabla key={`${index}-${item.id}-item-pago-tabla`} pago={item}  />
                  })
              } */}
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
