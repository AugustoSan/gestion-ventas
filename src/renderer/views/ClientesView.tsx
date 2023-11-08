import React, { useState } from 'react';

export const ClientesView = ():JSX.Element => {
  const [inputName, setInputName] = useState<string>('');
  const [inputApp, setInputApp] = useState<string>('');
  const [inputApm, setInputApm] = useState<string>('');
  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Clientes</h1>
        {/* <form className="form-inline my-2 my-lg-0"> */}
        <div className="col-9 row">
          <div className="col-10">
            <input className="form-control" type="search" placeholder="Buscar cliente" aria-label="Search" />
          </div>
          <div className="col-2">
            <button className="btn btn-outline-success" type="submit">Buscar</button>
          </div>
        </div>
        {/* </form> */}
      </div>
      <div className="card">
        <div className="card-body">
          {/* <h5 className="card-title">Agregar Cliente</h5> */}
          {/* <form> */}
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
              <div className="col-sm-3"></div>
              <div className="col-sm-3">
                <button className="btn btn-primary" onClick={() => console.log('Agregar Cliente')}>
                  Agregar
                </button>
              </div>
              <div className="col-sm-3">
                <button className="btn btn-primary" onClick={() => console.log('Editar Cliente')} disabled={false}>
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
    </main>
  );
}
