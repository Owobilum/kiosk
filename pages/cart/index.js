import { useRouter } from "next/router";
import { Typography, Box, Grid, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from "react-redux";

import CartItem from "../../components/CartItem";
import { formatMoney } from "../../utils/helpers"

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
    const { cart } = useSelector(state => state.cart)
    const totalCost = cart.reduce((accumulator, { quantity, price }) => accumulator + (quantity * price), 0)
    const numberInCart = cart.reduce((accumulator, { quantity }) => accumulator + quantity, 0)

    return (
        <div className={classes.cartRoot}>
            <Typography variant="h5" component="p">
                <ShoppingCartIcon />
                <span className={classes.head}>Cart</span>
                <span>{`(${numberInCart > 0 ? numberInCart : ''} ${numberInCart > 1 ? ' items' : numberInCart === 0 ? 'Empty' : ' item'})`}</span>
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
            {
                cart && cart.length > 0 && cart.map(product => (
                    <CartItem
                        key={product.title}
                        img={product.img}
                        title={product.title}
                        price={product.price}
                        ratings={product.ratings}
                        productId={product.productId}
                        quantity={product.quantity}
                    />
                ))
            }

            {
                cart.length === 0 &&
                <Typography variant="body1" component="p">No products in cart</Typography>
            }
            {cart && cart.length > 0 &&
                <Box className={classes.sectionBox}>
                    <Typography variant="h6">
                        <span style={{ marginRight: 16 }}>Total:</span>
                        <span className={classes.textMorph}>
                            {formatMoney(totalCost)}
                        </span>
                    </Typography>
                </Box>
            }
            <Box className={classes.sectionBox}>
                <Button
                    variant="outlined"
                    color="primary"
                    sx={{ mr: 2 }}
                    onClick={() => router.push('/')}
                >
                    Continue Shopping
                </Button>
                {cart && cart.length > 0 &&
                    <Button
                        variant="contained"
                        sx={{ color: '#fff' }}
                        onClick={() => router.push('/checkout')}
                    >
                        Checkout
                    </Button>
                }
            </Box>
        </div>
    )
}