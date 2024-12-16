import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { LabelInfoCard } from '../../components/LabelInfoCard';
import { InfoProductoCard } from './InfoProductoCard';
import { AddProductoCard } from './AddProductoCard';
import { TablaProductos } from './TablaProductos';
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux';
import { FindProduct, setHandleAddProduct, setHandleSearchProduct } from '../../redux/slice/productos';

// import { appendLogFile } from '../../main/util';


export const ProductosView = ():JSX.Element => {
  const { selectProducto, handleAddProducto, handleSearchProducto, pagination } = useCustomSelector((state) => state.productSlice);

  const [inputSearch, setInputSearch] = useState<string>('');

  const dispatch = useCustomDispatch();

  const {currentPage, sizePage} = pagination;

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Productos</h1>
        <div className="col-9 row">
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Buscar producto"
              aria-label="Buscar producto"
              value={inputSearch}
              onChange={(event) => {
                setInputSearch(event.target.value);
                dispatch(FindProduct(event.target.value, 0, sizePage));
              }}
            />
            <Button variant="outline-primary" onClick={() => {
              /* console.log('Se va a buscar el producto con coincidencias de ', inputSearch); */
              // dispatch(setHandleSearchProduct(true));
              dispatch(FindProduct(inputSearch, 0, sizePage));
            }}>
              Buscar
            </Button>
          </InputGroup>
        </div>
      </div>
      {
        selectProducto === null && handleAddProducto !== true
          ? (<div className="card mb-2">
              <Button variant="outline-primary" size="lg" onClick={() => dispatch(setHandleAddProduct(!handleAddProducto))}>
                {'Agregar nuevo producto'}
              </Button>
            </div>)
          : <></>
      }
      {
        selectProducto === null ? handleAddProducto === true ? <AddProductoCard /> : <TablaProductos /> : <InfoProductoCard />
      }
    </>
  );
}
