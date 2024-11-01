import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
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
        <Box sx={{ overflow: 'auto' }}>
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
        </Box>
      </Drawer>
  );
}
