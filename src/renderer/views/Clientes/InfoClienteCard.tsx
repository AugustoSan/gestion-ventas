import React, { useState } from 'react';
import { LabelInfoCard } from '../../components/LabelInfoCard';
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux';
import { setSelectClient } from '../../redux/slice/clientes';
// import { appendLogFile } from '../../main/util';


export const InfoClienteCard = ():JSX.Element => {
  const { selectClient } = useCustomSelector((state) => state.clientSlice);
  const dispatch = useCustomDispatch();
  console.log('selectClient', selectClient);
  const {id = 0, nombre = '', app = '', apm = '', telefono = '', direcciones = [], saldo = 0} = selectClient ?? {};
  console.log('cliente: - ', selectClient);

  return (
    <div className="card p-2">
      <div className="row">
        <div className="card-body col-9">
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
        <div className="card-body col-3 pl-2">
          <div className="form-group row pr-2">
            <button
              type="button"
              className="btn btn-primary"
              disabled={selectClient === null ? true : false}
              onClick={
                () => {
                  console.log(`se editara el cliente con id ${id}`);
                }
              }
            >
              Editar
            </button>
          </div>
          <div className="form-group row mt-2 pr-2">
            <button
              type="button"
              className="btn btn-danger"
              disabled={selectClient === null ? true : false}
              onClick={
                () => {
                  console.log(`se eliminara el cliente con id ${id}`);
                }
              }
            >
              Eliminar
            </button>
          </div>
          <div className="form-group row mt-2 pr-2">
            <button
              type="button"
              className="btn btn-primary"
              disabled={selectClient === null ? true : false}
              onClick={
                () => {
                  console.log(`se deseleccionara el cliente con id ${id}`);
                  dispatch(setSelectClient(null));
                }
              }
            >
              Deseleccionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
