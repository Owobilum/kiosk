import { Grid, Box, Typography } from '@mui/material'

const Order = ({ order }) => {
    return (
        <Grid
            container
            item
            sx={{ height: { xs: '200px', md: '200px' }, overflow: 'hidden' }}
            spacing={1}
        >
            <Grid item xs={4} >
                <img src={order.data.items[0].img} alt="" width="100%" />
            </Grid>
            <Grid
                item
                xs={8}
                sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', maxHeight: '100%' }}
            >
                <Typography
                    variant="body2"
                    component="p"
                    sx={{ fontSize: { xs: '14px', md: '16px' }, fontWeight: 700 }}
                >
                    {`Order #${order.id}`}
                </Typography>
                <Box>
                    {
                        order?.data?.items && order.data.items.map(item => (
                            <Typography key={item.title} variant="body2" component="span">
                                {`${item.title}, `}
                            </Typography>
                        ))
                    }
                </Box>

                <Box>
                    <Typography
                        variant="body2"
                        component="p"
                        sx={{ maxWidth: '100px', textAlign: 'center' }}
                    >
                        {order.data.status === "Pending" && <span style={{ backgroundColor: 'yellow', padding: 2 }}>Order Placed</span>}
                        {order.data.status !== "Pending" && <span style={{ backgroundColor: 'green', padding: 2 }}>Delivered</span>}
                    </Typography>
                    <Typography>{order?.data?.date}</Typography>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Order