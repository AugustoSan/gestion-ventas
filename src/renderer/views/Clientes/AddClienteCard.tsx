import React, { useState } from 'react';
import { LabelInfoCard } from '../../components/LabelInfoCard';
import { useCustomDispatch } from '../../hooks/redux';
import { setCliente } from '../../redux/slice/clientes';
// import { appendLogFile } from '../../main/util';

export const AddClienteCard = ():JSX.Element => {
  const [inputName, setInputName] = useState<string>('');
  const [inputApp, setInputApp] = useState<string>('');
  const [inputApm, setInputApm] = useState<string>('');
  const [inputTelefono, setInputTelefono] = useState<string>('');
  const dispatch = useCustomDispatch();
  return (
      <div className="card">
        <div className="card-body">
            <div className="form-group row mb-2">
              <label className="col-sm-3 col-form-label">Nombre:</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  value={inputName}
                  placeholder="Nombre"
                  onChange={
                    (event) => {
                      // console.log(event.target.value);
                      setInputName(event.target.value);
                    }
                  }
                />
              </div>
            </div>
            <div className="form-group row mb-2">
              <label className="col-sm-3 col-form-label">Apellido Paterno:</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Apellido Paterno"
                  value={inputApp}
                  onChange={
                    (event) => {
                      // console.log(event.target.value);
                      setInputApp(event.target.value);
                    }
                  }
                />
              </div>
            </div>
            <div className="form-group row mb-2">
              <label className="col-sm-3 col-form-label">Apellido Materno:</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Apellido Materno"
                  value={inputApm}
                  onChange={
                    (event) => {
                      // console.log(event.target.value);
                      setInputApm(event.target.value);
                    }
                  }
                />
              </div>
            </div>
            <div className="form-group row mb-2">
              <label className="col-sm-3 col-form-label">Teléfono:</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Teléfono"
                  value={inputTelefono}
                  onChange={
                    (event) => {
                      // console.log(event.target.value);
                      setInputTelefono(event.target.value);
                    }
                  }
                />
              </div>
            </div>
            <div className="form-group row mb-2">
              <div className="col-sm-3"></div>
              <div className="col-sm-3">
                <button className="btn btn-primary" onClick={() => {
                  console.log('Agregar Cliente');
                  // validar que todos los campos estan completos
                  dispatch(setCliente({
                    id: 10,
                    nombre: 'Augusto',
                    app: 'Sanchez',
                    apm: 'Julian',
                    saldo: 0,
                    telefono: '-',
                    direcciones: []
                  }))
                }}>
                  Agregar
                </button>
              </div>
              <div className="col-sm-3">
                <button
                  className="btn btn-primary"
                  onClick={
                    () => {
                      console.log('Editar Cliente');
                      // appendLogFile({text: 'Pruebas de log'});
                    }
                  }
                  disabled={false}
                >
                  Editar
                </button>
              </div>
              <div className="col-sm-3">
                <button className="btn btn-danger" onClick={() => console.log('Eliminar Cliente')}>
                  Eliminar
                </button>
              </div>
            </div>
          {/* </form> */}
        </div>
      </div>
  );
}
