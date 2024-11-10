import Button from 'react-bootstrap/Button';
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux';
import { DropdownClientes } from '../../components/DropdownClientes';
import { TablaPagosByCliente } from '../../components/TablaPagosByCliente';
import { TablaPagosGetAllPagos } from '../../components/TablaPagosGetAllPagos';
import { setSelectView } from '../../redux/slice/ingresos';
import { IngresoWithIDView } from './IngresoWithIDView';
import { AddIngreso } from './AddIngreso';

export const IngresoView = ():JSX.Element => {
  const {selectClient} = useCustomSelector((state) => state.clientSlice);
  const {selectView} = useCustomSelector((state) => state.ingresoSlice);
  const dispatch = useCustomDispatch();

  console.log('selectClient: ', selectClient);
  console.log('selectView: ', selectView);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Abonos</h1>
        {
          selectView === 'all' || selectView === 'viewByClient'
          ? <DropdownClientes />
          : <></>
      }
      </div>
      {
          selectView === 'all' || selectView === 'viewByClient'
          ? <div className="card mb-2">
              <Button variant="outline-primary" size="lg" onClick={() => {
                dispatch(setSelectView('add'));
              }}>
                {'Agregar nuevo abono'}
              </Button>
            </div>
          : <></>
      }
      {
        selectView === 'all' || selectView === 'viewByClient'
        ? selectClient === null
          ? <TablaPagosGetAllPagos />
          : <TablaPagosByCliente />
        : selectView === "viewPago"
          ? <IngresoWithIDView />
          : selectView === "add"
            ? <AddIngreso />
            : <></>
        //         ? <AddVentaAddProductsCard />
        //         : <></>
      }
    </>
  );
}
