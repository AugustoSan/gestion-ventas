import React from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Box,
  Toolbar,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { MenuItem } from './MenuItem';
import { menuItems, listMenuItems } from '../utils/menuItems';
import { useState } from 'react';
import { useCustomDispatch } from '../hooks/redux';
import { setSelectMenu } from '../redux/slice/menu';

const drawerWidth = 240;

export const DrawerCustom = ():JSX.Element => {
  const dispatch = useCustomDispatch();
  const {home, clientes, ingresos, ventas, productos} = menuItems;

  return (
    <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'space-between',
          }}
        >
          <List>
            {listMenuItems.map((item, index) => (
              <ListItem key={`menu-item-${item.title}`} disablePadding>
                <ListItemButton onClick={() => { dispatch(setSelectMenu(item.href)) }}>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          {/* Botón de salir */}
          <Box p={2}>
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={() => { dispatch(setSelectMenu(menuItems.settings.href)) }}>
                  <ListItemIcon>{menuItems.settings.icon}</ListItemIcon>
                  <ListItemText primary={menuItems.settings.title} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => { console.log('Salir') }}>
                  <ListItemIcon><LogoutIcon /></ListItemIcon>
                  <ListItemText primary={'Salir'} />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Box>
      </Drawer>
  );
}
