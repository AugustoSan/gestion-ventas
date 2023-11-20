import React, { useEffect } from 'react';
import { useCustomDispatch } from '../hooks/redux';
import { GetAllClients } from '../redux/slice/clientes';
import { GetAllProducts } from '../redux/slice/productos';

export const Header = ():JSX.Element => {
  const dispatch = useCustomDispatch();

  useEffect(() => {
    dispatch(GetAllClients());
    dispatch(GetAllProducts());
  }, []);
  return (
  <header className="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow" data-bs-theme="dark">
  <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white" href="#">Gestión de ventas</a>

  <ul className="navbar-nav flex-row d-md-none">
    <li className="nav-item text-nowrap">
      <button className="nav-link px-3 text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSearch" aria-controls="navbarSearch" aria-expanded="false" aria-label="Toggle search">
        <svg className="bi"><use href="#search"/></svg>
      </button>
    </li>
    <li className="nav-item text-nowrap">
      <button className="nav-link px-3 text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
        <svg className="bi"><use href="#list"/></svg>
      </button>
    </li>
  </ul>

  <div id="navbarSearch" className="navbar-search w-100 collapse">
    <input className="form-control w-100 rounded-0 border-0" type="text" placeholder="Search" aria-label="Search" />
  </div>
</header>);
}
