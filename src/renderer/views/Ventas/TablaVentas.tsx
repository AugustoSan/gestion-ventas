import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { LabelInfoCard } from '../../components/LabelInfoCard';
import { ItemClientTabla } from '../../components/ItemClientTabla';
import { IClient } from '../../../main/interfaces';
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux';
import { ItemVentaTabla } from '../../components/ItemVentaTabla';
import { GetAllVentas, GetAllVentasByClient } from '../../redux/slice/ventas';

export const TablaVentas = ():JSX.Element => {
  const { ventasArray, ventasArrayByClient, selectClientSearchVentas } = useCustomSelector((state) => state.ventaSlice)
  const dispatch = useCustomDispatch();

  console.log('ventasArray: ', ventasArray)

  useEffect(() => {
    if(selectClientSearchVentas === null){
      dispatch(GetAllVentas());
    }
    else{
      dispatch(GetAllVentasByClient(selectClientSearchVentas));
    }
  }, [selectClientSearchVentas]);


  return (
      <div className="card">
        <div className="card-body">
          <div className="table-responsive small">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Cliente</th>
                <th scope="col">Dirección</th>
                <th scope="col">Fecha</th>
                <th scope="col">Total</th>
                <th scope="col">Para liquidar</th>
                <th scope="col">Estatus</th>
                <th scope="col">Acción</th>
              </tr>
            </thead>
            <tbody>
              {
                selectClientSearchVentas === null
                ? ventasArray.map( (venta, index) => {
                  return <ItemVentaTabla key={`${index}-${venta.id}-item-venta-tabla`} venta={venta} />
                })
                : ventasArrayByClient.map( (venta, index) => {
                  return <ItemVentaTabla key={`${index}-${venta.id}-client-item-venta-tabla`} venta={venta} />
                })
              }
            </tbody>
          </Table>
          </div>
        </div>
      </div>
  );
}
