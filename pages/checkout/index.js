import { Grid, Box, Typography, Button } from '@mui/material'

import { formatMoney } from '../../utils/helpers'
import CheckoutItem from '../../components/CheckoutItem'

export default function CheckoutPage() {
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
                        <Button color="primary">
                            Change
                        </Button>
                    </Box>
                    <Typography variant="body2" component="p" sx={{ mb: 5 }}>
                        No. 45 Somplace, Soomwire
                    </Typography>
                    <Typography variant="h6" component="h6">
                        Delivery Method
                    </Typography>
                    <Typography variant="caption" component="p">
                        Free shipping across Nigeria!
                    </Typography>
                    <Button variant="contained" sx={{ width: '100%', color: '#fff', my: 2 }}>
                        Proceed To Make Payment
                    </Button>
                    <Typography variant="h6" component="h6">
                        Payment Method
                    </Typography>
                    <Typography variant="caption" component="p" sx={{ color: 'red' }}>
                        This uses paystack TEST keys. It is not a 'real' transaction.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant="h6" component="h6" sx={{ px: 1, mb: 1 }}>
                        YOUR ORDER (1 ITEM)
                    </Typography>
                    {/* CHEKOUTITEM COMPONENT */}
                    <CheckoutItem />
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
                            {formatMoney(50000)}
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
                            {formatMoney(50000)}
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
        </Box >
    )
}