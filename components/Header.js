import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Grid, Button, FormControl, OutlinedInput, InputAdornment } from '@mui/material'
import Image from 'next/image';
// import { makeStyles } from '@mui/material/styles';

import NavDrawer from './NavDrawer';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         position: 'fixed',
//         bottom: theme.spacing(2),
//         right: theme.spacing(2),
//     },
// }));

export default function Header() {
    // const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const [isOpen, setIsopen] = React.useState(false)

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsopen(open)
    };

    // const handleMobileMenuOpen = (event) => {
    //     setMobileMoreAnchorEl(event.currentTarget);
    // };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box
            // style={{ maxWidth: '100%'}}
            sx={{
                mb: { xs: 11, md: 7 } //bottom margin for header
            }}
        >
            <AppBar
                // position="static"
                position="fixed"
                style={{
                    backgroundColor: '#ffffff',
                    // maxWidth: '100%'
                }}
                sx={{
                    px: { xs: 1, md: 7 },
                    py: { xs: 1, md: 2 }
                }}
            >
                <Toolbar>
                    <Grid
                        container
                        justifyContent="space-between"
                    >
                        {/* LEFT COLUMN */}
                        <Grid
                            item
                            container
                            xs={8}
                            md={10}
                            sx={{ pt: 2 }}
                            alignItems={"flex-end"}
                        >
                            {/* HAMBURGER MENU */}
                            <Grid
                                item
                                xs={2}
                                sx={{ display: { md: 'none' } }}
                            >
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={toggleDrawer(true)}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Grid>
                            {/* SITE NAME AND LOGO */}
                            <Grid
                                item
                                container
                                xs={10}
                                md={2}
                            >
                                <Box>
                                    <Image
                                        src="/kiosklogo.png"
                                        alt="kiosk logo"
                                        height={30}
                                        width={30}
                                    />
                                </Box>
                                <Box>
                                    <Typography variant="h6" component="span">
                                        KIOSK
                                    </ Typography>
                                </Box>
                            </Grid>
                            {/* SEARCH AREA */}
                            <Grid
                                item
                                container
                                xs={6}
                                md={10}
                                spacing={1}
                                style={{ maxWidth: 500 }}
                                sx={{
                                    display: { xs: 'none', md: 'flex' },
                                }}
                            >
                                {/* SEARCH FIELD */}
                                <Grid item xs={9}>
                                    <FormControl fullWidth variant="outlined">
                                        <OutlinedInput
                                            id="outlined-adornment-search"
                                            placeholder={"Search"}
                                            size="small"
                                            startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
                                        />
                                    </FormControl>
                                </Grid>
                                {/* SEARCH BUTTON */}
                                <Grid item xs={3}>
                                    <Button
                                        variant="contained"
                                        style={{ color: '#fff' }}
                                    >
                                        Search
                                    </Button>
                                </Grid>

                            </Grid>
                        </Grid>

                        {/* RIGHT COLUMN */}
                        <Grid
                            item
                            container
                            xs={4}
                            md={2}
                            justifyContent={"flex-end"}
                            alignItems={"flex-end"}
                        >
                            <Box
                                sx={{ display: { xs: 'flex' } }}
                                style={{ maxWidth: '100%' }}
                            >
                                <Box
                                    style={{ maxWidth: '100%' }}

                                >
                                    <IconButton
                                        size="large"
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        onClick={handleProfileMenuOpen}
                                        color="inherit"
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                    <Typography
                                        variant="body2"
                                        component="span"
                                        sx={{ display: { xs: 'none', md: 'inline' } }}
                                    >
                                        Account
                                    </Typography>
                                </Box>
                                <Box
                                    style={{ maxWidth: '100%' }}
                                >
                                    <IconButton
                                        size="large"
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        onClick={handleProfileMenuOpen}
                                        color="inherit"
                                    >
                                        <Badge badgeContent={1} color="error">
                                            <ShoppingCartIcon />
                                        </Badge>
                                    </IconButton>
                                    <Typography
                                        variant="body2"
                                        component="span"
                                        sx={{ display: { xs: 'none', md: 'inline' } }}
                                    >
                                        Cart
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Toolbar>
                {/* MOBILE SEARCH */}
                <Toolbar
                    sx={{ display: { md: 'none' } }}
                >
                    <Grid container spacing={1}>
                        {/* SEARCH FIELD */}
                        <Grid item xs={8}>
                            <FormControl fullWidth variant="outlined">
                                <OutlinedInput
                                    id="outlined-adornment-search"
                                    placeholder={"Search"}
                                    size="small"
                                    startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
                                />
                            </FormControl>
                        </Grid>
                        {/* SEARCH BUTTON */}
                        <Grid item xs={3}>
                            <Button
                                variant="contained"
                                style={{ color: '#fff' }}
                            >
                                Search
                            </Button>
                        </Grid>

                    </Grid>
                </Toolbar>
            </AppBar>
            <NavDrawer isOpen={isOpen} toggleDrawer={toggleDrawer} />
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}
