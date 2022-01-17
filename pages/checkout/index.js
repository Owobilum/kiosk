import React, { useState } from 'react'
import { useRouter } from 'next/dist/client/router'
import {
    Grid, Box, Typography, Button, TextField, Dialog, DialogActions,
    DialogContent, DialogContentText, DialogTitle, CircularProgress
} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { usePaystackPayment } from 'react-paystack'
import swal from 'sweetalert2'

import { formatMoney } from '../../utils/helpers'
import CheckoutItem from '../../components/CheckoutItem'
import { emptyCart } from '../../redux/actions/cart'
import { setAddress } from '../../redux/actions/auth'

export default function CheckoutPage() {
    const router = useRouter()
    const dispatch = useDispatch()
    const { cart } = useSelector(state => state.cart)
    const { user, isLoading } = useSelector(state => state.auth)
    const [open, setOpen] = useState(false);
    const [newAddress, setNewAddress] = useState("")
    const numberInCart = cart.reduce((accumulator, { quantity }) => accumulator + quantity, 0)
    const totalCost = cart.reduce((accumulator, { quantity, price }) => accumulator + (quantity * price), 0)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => setOpen(false)

    const handleAddress = () => {
        if (newAddress) {
            dispatch(setAddress(newAddress, user.id, () => {
                handleClose();
            }))
        } else {
            handleClose();
        }
    };

    const handlePayment = () => {
        if (user?.address) {
            initializePayment(onSuccess, onClose)
        } else {
            swal.fire({
                icon: 'info',
                title: 'Please add a shipping address',
                confirmButtonColor: '#D48166'
            })
        }
    }


    let randomEmail = `${Math.floor(Math.random() * 11223344)}@kioskng.com`

    const config = {
        reference: (new Date()).getTime().toString(),
        email: randomEmail,
        amount: totalCost * 100,
        publicKey: `${process.env.NEXT_PUBLIC_PAYSTACK_TEST_KEY}`
    };

    const initializePayment = usePaystackPayment(config)

    const onSuccess = (reference) => {
        // Implementation for whatever you want to do with reference and after success call.
        // console.log(reference);
        swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Order placed successfully',
            confirmButtonColor: '#D48166',
            confirmButtonText: 'Proceed'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(emptyCart())
                router.push('/')
            }
        })
    };

    const onClose = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        // console.log('closed')
    }

    return (
        <Box
            sx={{
                backgroundColor: '#fff',
                padding: { xs: '2% 2%', md: '2% 5%' },
                margin: '1% 2%'
            }}
        >
            <Grid container spacing={2} sx={{ flexDirection: { xs: "column-reverse", md: "row" } }}>
                <Grid item xs={12} md={8}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="h6">
                            Address Details
                        </Typography>
                        <Button color="primary" onClick={handleClickOpen}>
                            {user?.address ? 'Change' : 'Add'}
                        </Button>
                    </Box>
                    <Typography variant="body2" component="p" sx={{ mb: 5 }}>
                        {user?.address ? user.address : 'No address found'}
                    </Typography>
                    <Typography variant="h6" component="h6">
                        Delivery Method
                    </Typography>
                    <Typography variant="caption" component="p">
                        Free shipping across Nigeria!
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{ width: '100%', color: '#fff', my: 2 }}
                        onClick={handlePayment}
                    >
                        Proceed To Make Payment
                    </Button>
                    <Typography variant="h6" component="h6">
                        Payment Method
                    </Typography>
                    <Typography variant="caption" component="p" sx={{ color: 'red' }}>
                        This uses paystack TEST keys. It is not a live transaction.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant="h6" component="h6" sx={{ px: 1, mb: 1 }}>
                        YOUR ORDER {`(${numberInCart > 0 ? numberInCart : ''} ${numberInCart > 1 ? ' items' : numberInCart === 0 ? 'Empty' : ' item'})`}
                    </Typography>
                    {/* CHEKOUTITEM COMPONENT */}
                    {
                        cart && cart.length > 0 && cart.map(product => (
                            <CheckoutItem
                                key={product.title}
                                img={product.img}
                                title={product.title}
                                price={product.price}
                                quantity={product.quantity}
                            />
                        ))
                    }
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mb: 2,
                            px: 1,
                            borderTop: '1px solid grey',
                        }}
                    >
                        <Typography variant="h6" component="h6">
                            Subtotal
                        </Typography>
                        <Typography variant="h6" component="h6">
                            {formatMoney(totalCost)}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, px: 1 }}>
                        <Typography variant="h6" component="h6">
                            Shipping (Flat rate)
                        </Typography>
                        <Typography variant="h6" component="h6">
                            {formatMoney(0)}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 5, backgroundColor: '#c4c4c4', px: 1 }}>
                        <Typography variant="h6" component="h6">
                            Total
                        </Typography>
                        <Typography variant="h6" component="h6">
                            {formatMoney(totalCost)}
                        </Typography>
                    </Box>

                    <Typography variant="h6" component="h6">
                        NEED HELP?
                    </Typography>
                    <Typography variant="caption" component="p">
                        Contact an expert to support you
                    </Typography>
                </Grid>
            </Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Address</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {/* To subscribe to this website, please enter your email address here. We
                        will send updates occasionally. */}
                        Please input the address you'd like your order delivered to. Kindly include your
                        house number, street and L.G.A
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Address"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newAddress}
                        onChange={(e) => setNewAddress(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddress}>{isLoading ? <CircularProgress /> : 'Save'}</Button>
                </DialogActions>
            </Dialog>
        </Box >
    )
}