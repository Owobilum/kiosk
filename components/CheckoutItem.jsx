import { Grid, Typography } from '@mui/material';

import { formatMoney } from '../utils/helpers';

function CheckoutItem({ img, title, price, quantity }) {
  return (
    <Grid container sx={{ px: 1, mb: 1 }}>
      <Grid item xs={4}>
        <img src={img} width="100%" alt={title} />
      </Grid>
      <Grid item xs={8} sx={{ px: 1 }}>
        <Typography variant="body2" component="p" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Typography variant="body" component="p" color="primary">
          {formatMoney(price)}
        </Typography>
        <Typography variant="body2" component="p">
          <span style={{ color: 'grey' }}>Quantity: </span> {quantity}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default CheckoutItem;
