import React, { SetStateAction } from 'react';
import { useLocation } from 'react-router-dom';
import { InputPriceCard } from '../components/InputPriceCard';
import { useState } from 'react';

export const IngresoView = ():JSX.Element => {
  const [price, setPrice] = useState<number>(0);
  const location = useLocation();
  console.log(`location: ${location.key}`);
  console.log(`location: ${location.hash}`);
  console.log(`location: ${location.pathname}`);
  console.log(`location: ${location.search}`);
  console.log(`location: ${location.state}`);
  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Ingreso</h1>
        <InputPriceCard title={'Precio'} value={price} onChange={setPrice} />
      </div>
    </main>
  );
}
