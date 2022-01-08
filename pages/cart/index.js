import { useRouter } from "next/router";
import { Typography, Box, Grid, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import CartItem from "../../components/CartItem";

const useStyles = makeStyles(theme => ({
    cartRoot: {
        maxWidth: '100%',
        marginTop: 100,
        [theme.breakpoints.up('md')]: {
            padding: '50px 9%'
        },
        [theme.breakpoints.down('sm')]: {
            padding: '0px 1%'
        },
    },
    head: {
        margin: "0px 4px",
    },
    tablehead: {
        marginTop: 50,
        marginBottom: 8
    },
    sectionBox: {
        marginTop: 32,
        textAlign: 'right'
    },
    textMorph: {
        [theme.breakpoints.up('md')]: {
            fontSize: 30,
        },
        [theme.breakpoints.down('sm')]: {
            fontWeight: 700
        },
    }
}))

export default function CartPage() {
    const classes = useStyles()
    const router = useRouter()
    return (
        <div className={classes.cartRoot}>
            <Typography variant="h5" component="p">
                <ShoppingCartIcon />
                <span className={classes.head}>Cart</span>
                <span>(1 Item)</span>
            </Typography>
            <Grid container className={classes.tablehead}>
                <Grid item xs={5}>
                    <Typography variant="h6">
                        Product
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant="h6">
                        Quantity
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="h6">
                        Unit Price
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="h6">
                        Sub total
                    </Typography>
                </Grid>
            </Grid>
            {/* CART ITEM */}
            <CartItem />
            <Box className={classes.sectionBox}>
                <Typography variant="h6">
                    <span style={{ marginRight: 16 }}>Total:</span>
                    <span className={classes.textMorph}>₦{10000}</span>
                </Typography>
            </Box>
            <Box className={classes.sectionBox}>
                <Button
                    variant="outlined"
                    color="primary"
                    sx={{ mr: 2 }}
                    onClick={() => router.push('/')}
                >
                    Continue Shopping
                </Button>
                <Button
                    variant="contained"
                    sx={{ color: '#fff' }}
                    onClick={() => router.push('/checkout')}
                >
                    Checkout
                </Button>
            </Box>
        </div>
    )
}