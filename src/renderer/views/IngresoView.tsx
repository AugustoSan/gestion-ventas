import React from 'react';
import { InputPriceCard } from '../components/InputPriceCard';
import { SetStateAction } from 'react';
import { useState } from 'react';

export const IngresoView = ():JSX.Element => {
  const [price, setPrice] = useState<number>(0);
  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Ingreso</h1>
        <InputPriceCard title={'Precio'} value={price} onChange={setPrice} />
      </div>
    </main>
  );
}
