import { Grid, Typography } from "@mui/material"

import { formatMoney } from "../utils/helpers"

const CheckoutItem = () => {
    return (
        <>
            <Grid container sx={{ px: 1, mb: 1 }}>
                <Grid item xs={4}>
                    <img
                        src="/suits.jpg"
                        width='100%'
                        alt=""
                    />
                </Grid>
                <Grid item xs={8} sx={{ px: 1 }}>
                    <Typography variant="body2" component="p" sx={{ fontWeight: 'bold' }}>
                        Nice Blazer
                    </Typography>
                    <Typography variant="body" component="p" color="primary">
                        {formatMoney(10000)}
                    </Typography>
                    <Typography variant="body2" component="p">
                        <span style={{ color: 'grey' }}>Quantity: </span> 1
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default CheckoutItem