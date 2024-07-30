import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux';
import { ItemProductoTabla } from '../../components/ItemProductTabla';
import { PaginationComponent } from '../../components/PaginationComponent';
import { GetAllProducts } from '../../redux/slice/productos';
import { useEffect } from 'react';

export const TablaProductos = ():JSX.Element => {
  // Aqui hay que obtener todos los clientes
  const {productosArray, searchProducto, pagination} = useCustomSelector((state) => state.productSlice);
  const dispatch = useCustomDispatch();
  const {
    currentPage, sizePage, totalPages, totalCount, 
    hasPreviousPage, hasNextPage, nextPageNumber, previousPageNumber
  } = pagination;

  useEffect(() => {
    dispatch(GetAllProducts(currentPage, sizePage));
  }, []);

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
        <Table striped bordered hover size="sm" responsive>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Concepto</th>
              <th scope="col">Precio</th>
              <th scope="col">Información</th>
            </tr>
          </thead>
          <tbody>
            {
              searchProducto !== null && searchProducto.length > 0
              ? searchProducto.map((producto, index) => {
                return <ItemProductoTabla key={`${index}-${producto.id}-item-producto-search`} producto={producto} />
              })
              : productosArray.map( (producto, index) => {
                return <ItemProductoTabla key={`${index}-${producto.id}-item-producto`} producto={producto} />
              })
            }
          </tbody>
        </Table>
      </div>
        </div>
      </div>
  );
}
