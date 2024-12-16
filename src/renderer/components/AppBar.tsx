import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

export const AppBarCustom = ():JSX.Element => {
  const [open, setOpen] = useState(false);
  return (
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Gestión de ventas
          </Typography>
        </Toolbar>
      </AppBar>
    );
}
