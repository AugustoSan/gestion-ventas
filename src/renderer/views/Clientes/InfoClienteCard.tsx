import React, { useState } from 'react';
import { LabelInfoCard } from '../../components/LabelInfoCard';
import { IClient } from '../../interfaces';
// import { appendLogFile } from '../../main/util';

interface IDataProps {
  cliente: IClient;
}

export const InfoClienteCard = ({cliente}:IDataProps):JSX.Element => {
  const {nombre, app, apm, telefono, direcciones, saldo} = cliente;
  console.log('cliente: - ', cliente);
  
  return (
    <div className="card">
      <div className="card-body">
        <LabelInfoCard title={'Nombre'} value={nombre} />
        <LabelInfoCard title={'Apellido Paterno'} value={app} />
        <LabelInfoCard title={'Appelido Materno'} value={apm} />
        <LabelInfoCard title={'Telefono'} value={telefono} />
        <LabelInfoCard title={'Saldo'} value={saldo.toString()} />
        {
          direcciones.map((direccion) => {
            return <LabelInfoCard key={`${direccion.id}-${direccion.idClient}-dir`} title={direccion.id.toString()} value={direccion.direccion} />
          })
        }
      </div>
    </div>
  );
}
