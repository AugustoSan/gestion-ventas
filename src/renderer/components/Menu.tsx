import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { FaHome } from "react-icons/fa";
import { MenuItem } from './MenuItem';
import { menuItems } from '../utils/menuItems';

export const Menu = ():JSX.Element => {
  const {home, clientes, ingresos, ventas, productos} = menuItems;
  return (
    <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary" >
      <div className="offcanvas-md offcanvas-end bg-body-tertiary" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
        <div className="offcanvas-header">
          {/* <h5 className="offcanvas-title" id="sidebarMenuLabel">Gestión de ventas</h5> */}
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body d-flex flex-column p-0 pt-lg-3 overflow-y-auto">
          <ul className="nav flex-column">
            <MenuItem item={home} />
            <MenuItem item={ventas} />
            <MenuItem item={ingresos} />
            <MenuItem item={productos} />
            <MenuItem item={clientes} />
          </ul>

          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
            <span>Saved reports</span>
            <a className="link-secondary" href="#" aria-label="Add a new report">
              <svg className="bi"><use href="#plus-circle"/></svg>
            </a>
          </h6>
          <ul className="nav flex-column mb-auto">
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">
                <svg className="bi"><use href="#file-earmark-text"/></svg>
                Current month
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">
                <svg className="bi"><use href="#file-earmark-text"/></svg>
                Last quarter
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">
                <svg className="bi"><use href="#file-earmark-text"/></svg>
                Social engagement
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">
                <svg className="bi"><use href="#file-earmark-text"/></svg>
                Year-end sale
              </a>
            </li>
          </ul>

          {/* <hr className="my-3"> */}

          <ul className="nav flex-column mb-auto">
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">
                <svg className="bi"><use href="#gear-wide-connected"/></svg>
                Settings
              </a>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">
                <svg className="bi"><use href="#door-closed"/></svg>
                Sign out
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
    );
}
