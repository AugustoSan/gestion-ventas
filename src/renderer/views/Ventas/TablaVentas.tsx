import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { LabelInfoCard } from '../../components/LabelInfoCard';
import { ItemClientTabla } from '../../components/ItemClientTabla';
import { IClient } from '../../../main/interfaces';
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux';
import { ItemVentaTabla } from '../../components/ItemVentaTabla';
import { PaginationComponent } from '../../components/PaginationComponent';
import { GetAllProducts } from '../../redux/slice/productos';

export const TablaVentas = ():JSX.Element => {
  const { ventasArray, pagination } = useCustomSelector((state) => state.ventaSlice)
  const dispatch = useCustomDispatch();

  const {
    currentPage, sizePage, totalPages, totalCount, 
    hasPreviousPage, hasNextPage, nextPageNumber, previousPageNumber
  } = pagination;

  useEffect(() => {
    dispatch(GetAllProducts(currentPage, sizePage));
  }, []);

  console.log('ventasArray: ', ventasArray);

  return (
      <div className="card">
        <div className="card-body">
          <div className="table-responsive small">
          <PaginationComponent 
            currentPage={currentPage} 
            sizePage={sizePage}
            totalPages={totalPages} 
            totalCount={totalCount} 
            hasPreviousPage={hasPreviousPage} 
            hasNextPage={hasNextPage} 
            nextPageNumber={nextPageNumber} 
            previousPageNumber={previousPageNumber}
            actionGoToPage={(page: number) => { dispatch(GetAllProducts(page, sizePage));}} 
          />
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
                ventasArray.map( (venta, index) => {
                  console.log('item: ', venta);

                  return <ItemVentaTabla key={`${index}-${venta.id}-item-venta-tabla`} venta={venta} />
                })
              }
            </tbody>
          </Table>
          </div>
        </div>
      </div>
  );
}
