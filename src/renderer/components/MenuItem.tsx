import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

interface IDataProps {
  title: string;
  href: string;
  href_svg: string;
}

export const MenuItem = ({title, href}: IDataProps):JSX.Element => {
  return (
    <li className="nav-item">
      <a className="nav-link d-flex align-items-center gap-2 active" aria-current="page" href={href}>
        <svg className="bi"><use href="#house-fill"/></svg>
        Inicio
      </a>
    </li>
    );
}
