import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Badge from '@mui/material/Badge';
// import MenuItem from '@mui/material/MenuItem';
// import Menu from '@mui/material/Menu';
import { Grid, Toolbar, IconButton, Typography, Badge, MenuItem, Menu } from '@mui/material'
import { makeStyles } from '@mui/styles';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector, useDispatch } from 'react-redux';
// import SearchIcon from '@mui/icons-material/Search';
// import MailIcon from '@mui/icons-material/Mail';
// import NotificationsIcon from '@mui/icons-material/Notifications';


import NavDrawer from './NavDrawer';
import Search from './Search'
import SearchMobile from './SearchMobile';
import { signOutUser, setCurrentPath } from "../redux/actions/auth";

const useStyles = makeStyles((theme) => ({
    appbar: {
        backgroundColor: '#ffffff'
    },
    btn: {
        color: "#fff"
    }
}));

export default function Header() {
    const classes = useStyles()
    const router = useRouter()
    const dispatch = useDispatch()
    const { cart } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.auth)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const productsInCart = cart.reduce((accumulator, { quantity }) => accumulator + quantity, 0)

    const isMenuOpen = Boolean(anchorEl);

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

    const handleViewSavedItems = () => {
        handleMenuClose()
        router.push('/saved-items')
    }

    const handleViewOrders = () => {
        handleMenuClose()
        if (!user) {
            dispatch(setCurrentPath('/my-orders'))
            return router.push('/signin')
        }
        router.push('/my-orders')
    }

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsopen(open)
    };

    const handleSignIn = () => {
        router.push('/signin')
        handleMenuClose()
    }

    const handleSignOut = () => dispatch(signOutUser())

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
            {!user && <MenuItem onClick={handleSignIn}><AccountCircle />Sign In</MenuItem>}
            {user && <MenuItem onClick={handleSignOut}><AccountCircle />Sign Out</MenuItem>}
            <MenuItem onClick={handleViewOrders}><ShoppingBagIcon /> My Orders</MenuItem>
            <MenuItem onClick={handleViewSavedItems}><FavoriteIcon />Saved Items</MenuItem>
        </Menu>
    );

    return (
        <Box
            sx={{
                mb: { xs: 20, md: 16 } //bottom margin for header
            }}
        >
            <AppBar
                position="fixed"
                className={classes.appbar}
                sx={{
                    px: { xs: 1, md: 7 },
                    py: { xs: 1, md: 2 }
                }}
                elevation={0}
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
                                style={{ cursor: 'pointer' }}
                                onClick={() => router.push('/')}
                            >
                                <Box>
                                    <Image
                                        src="/kiosk.png"
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
                                <Search />
                                {/* SEARCH FIELD */}
                                {/* <Grid item xs={9}>
                                    <FormControl fullWidth variant="outlined">
                                        <OutlinedInput
                                            id="outlined-adornment-search2"
                                            placeholder={"Search Product or Category"}
                                            size="small"
                                            startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
                                        />
                                    </FormControl>
                                </Grid> */}
                                {/* SEARCH BUTTON */}
                                {/* <Grid item xs={3}>
                                    <Button
                                        variant="contained"
                                        className={classes.btn}
                                    >
                                        Search
                                    </Button>
                                </Grid> */}

                            </Grid>
                        </Grid>

                        {/* RIGHT COLUMN */}
                        <Grid
                            item
                            container
                            xs={4}
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
                                        {user?.displayName ? `Hi, ${user.displayName}` : 'Account'}
                                    </Typography>
                                </Box>
                                <Box
                                    style={{ maxWidth: '100%', cursor: 'pointer' }}
                                    onClick={() => router.push('/cart')}
                                >
                                    <IconButton
                                        size="large"
                                        edge="end"
                                        aria-label="cart"
                                        aria-controls={'primary-cart-page-navigation'}
                                        aria-haspopup="false"
                                        color="inherit"
                                    >
                                        <Badge badgeContent={productsInCart} color="error">
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
                    <SearchMobile />
                    {/* <Grid container spacing={1}>
                        <Grid item xs={8}>
                            <FormControl fullWidth variant="outlined">
                                <OutlinedInput
                                    id="outlined-adornment-search"
                                    placeholder={"Search Product or Category"}
                                    size="small"
                                    startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <Button
                                variant="contained"
                                className={classes.btn}
                            >
                                Search
                            </Button>
                        </Grid>

                    </Grid> */}
                </Toolbar>
            </AppBar>
            <NavDrawer isOpen={isOpen} toggleDrawer={toggleDrawer} />
            {renderMenu}
        </Box>
    );
}
