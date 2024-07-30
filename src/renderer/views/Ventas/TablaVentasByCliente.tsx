import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { LabelInfoCard } from '../../components/LabelInfoCard';
import { ItemClientTabla } from '../../components/ItemClientTabla';
import { IClient, IVenta } from '../../../main/interfaces';
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux';
import { GetAllVentasByClient, setVentasArrayByClient } from '../../redux/slice/ventas';
import { ItemVentaTabla } from '../../components/ItemVentaTabla';

interface IDataProps {
  cliente: IClient;
}

export const TablaVentasByCliente = ({cliente}:IDataProps):JSX.Element => {
  const {ventasArrayByClient} = useCustomSelector((state) => state.ventaSlice);
  const dispatch = useCustomDispatch();

  useEffect(() => {
    // Cargar los datos de las ventas
    dispatch(setVentasArrayByClient([]));
    dispatch(GetAllVentasByClient(cliente.id));
  }, []);

  console.log(`cliente:`, cliente);


  return (
    <div className="card">
        <div className="card-body">
          <div className="table-responsive small">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Cliente</th>
                {/* <th scope="col">Dirección</th> */}
                <th scope="col">Fecha</th>
                <th scope="col">Total</th>
                <th scope="col">Para liquidar</th>
                <th scope="col">Estatus</th>
                <th scope="col">Acción</th>
              </tr>
            </thead>
            <tbody>
              {
                ventasArrayByClient.map( (venta, index) => {
                  return <ItemVentaTabla key={`${index}-${venta.id}-${cliente.id}-item-venta-by-client-tabla`} venta={venta} />
                })
              }
            </tbody>
          </Table>
          </div>
        </div>
      </div>
  );
}
