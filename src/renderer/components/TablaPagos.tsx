import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { ItemPagoTabla } from './ItemPagoTabla';
import { IPago } from '../../main/interfaces/IPagos';

interface IDataProps{
  arrayPagos: IPago[] | null
}

export const TablaPagos = ({arrayPagos}: IDataProps):JSX.Element => {
  console.log(`arrayPagos: `, arrayPagos);

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
                arrayPagos !== null
                  ? arrayPagos.map( (item, index) => {
                      return <ItemPagoTabla key={`${index}-${item.id}-item-pago-tabla`} pago={item}  />
                    })
                  : null
              }
            </tbody>
          </Table>
          </div>
        </div>
      </div>
  );
}
