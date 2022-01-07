import React from 'react'
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Toolbar } from '@mui/material';

const Header = () => {
    return (
        <div>
            <Box sx={{width: '100%'}}>
                <AppBar position="static">
                <Toolbar>
                    <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{ mr: 2 }}
                    >
                    <MenuIcon />
                    </IconButton>
                </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}

export default Header
