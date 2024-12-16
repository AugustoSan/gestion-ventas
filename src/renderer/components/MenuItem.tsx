import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { IItemMenu } from '../../main/interfaces';

interface IDataProps {
  item: IItemMenu;
}

export const MenuItem = ({item}: IDataProps):JSX.Element => {
  const {title, href, icon} = item;
  return (
    <li className="nav-item">
      <a className="nav-link d-flex align-items-center gap-2 active" aria-current="page" href={href}>
        <svg className="bi">{icon}</svg>
        {title}
      </a>
    </li>
    );
}
