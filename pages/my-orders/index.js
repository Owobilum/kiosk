import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Grid, Typography, Box, CircularProgress, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import Order from '../../components/Order'
import { getOrders } from '../../redux/actions/order'
import withAuth from '../../utils/hocs/withAuth'

function OrdersPage() {
    const dispatch = useDispatch()
    const router = useRouter()
    const { user } = useSelector(state => state.auth)
    const { orders, isLoading } = useSelector(state => state.order)

    useEffect(() => {
        user && dispatch(getOrders(user.id))
    }, [dispatch,user])

    if (isLoading) {
        return (
            <Box sx={{ textAlign: 'center' }}>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <Box
            sx={{
                padding: { xs: '2% 2%', md: '2% 5%' },
                mb: 2
            }}
        >
            <Typography
                variant="h5"
                component="h6"
                sx={{ mb: 2, fontWeight: 700 }}
            >
                My Orders
            </Typography>
            <Grid
                container
                flexDirection="column"
                spacing={3}
            >
                {
                    orders && orders.length > 0 && orders.map(order => (
                        <Order key={order.id} order={order} />
                    ))
                }
                {
                    orders.length === 0 && (
                        <Box sx={{ mt: 2, px: '2%', mx: { xs: '3%', md: 0 } }}>
                            <Typography
                                variant={"body2"}
                            >
                                You have not made any orders
                            </Typography>
                            <Button
                                variant="outlined"
                                onClick={() => router.push('/')}
                                sx={{ mt: 2 }}
                            >
                                Continue Shopping
                            </Button>
                        </Box>
                    )

                }
            </Grid>
        </Box>
    )
}

export default withAuth(OrdersPage)