import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useApolloClient } from '@apollo/client';


const settings = ['Logout'];

function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const client = useApolloClient();

    const navigate = useNavigate()
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleMenuNavigation = async(menu) => {
        if (menu === 'Logout') {
            localStorage.removeItem('token')
            await client.clearStore();

            setTimeout(() => {
                navigate('/login')
            }, 1000)
        }
    }

    return (
        <AppBar position="static">
            <  >
                <Stack display={'flex'} justifyContent={'space-between'} direction={'row'} width={{xs:'100%', sm:'100%',lg:'97%', md:'97%'}} p={1} mx={{ sm: 0, xs:0, md: 3, lg: 3, xl: 3 }}>
                    <Stack spacing={3} direction={'row'}>
                        <img width={36} height={36} src={`to-do-list.png`} />
                        <Typography
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            style={{ margin: 'auto 12px' }}
                            sx={{
                                fontWeight: 600,
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Task Manager
                        </Typography>
                    </Stack>

                    <Stack direction={'row'} spacing={2}>
                        <Typography fontSize={'14px'} style={{ margin: 'auto 3px' }}
                        >{dayjs().format('ddd DD-MM-YYYY')}</Typography>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <img width={36} height={36} src={`https://robohash.org/${Math.random() / 100}.png`} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '15px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={() => handleMenuNavigation(setting)}>
                                    <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Stack>
                </Stack>
            </>
        </AppBar>
    );
}
export default Navbar;
