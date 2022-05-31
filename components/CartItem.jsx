import { Typography, Grid, Stack, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';

import { formatMoney } from '../utils/helpers';
import {
  decreaseProductQuantity,
  removeFromCart,
  addToCart,
} from '../redux/actions/cart';

const useStyles = makeStyles((theme) => ({
  root: {
    border: 'solid 1px #c4c4c4',
  },
  textMorph: {
    fontWeight: 700,
    [theme.breakpoints.up('md')]: {
      fontSize: 24,
    },
  },
  unit: {
    [theme.breakpoints.up('md')]: {
      fontSize: 24,
    },
  },
  icon: {
    color: 'grey',
  },
  deleteIcon: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
  },
}));

function CartItem({ img, title, price, ratings, productId, quantity }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleAddToCart = (product) => dispatch(addToCart(product));

  const handleRemoveFromCart = (id) => dispatch(removeFromCart(id));

  const handleDecreaseQuantity = (id, qty) => {
    if (qty <= 1) {
      return dispatch(removeFromCart(id));
    }
    return dispatch(decreaseProductQuantity(id));
  };

  return (
    <div className={classes.root}>
      <Grid container sx={{ backgroundColor: '#fff' }}>
        {/* COLUMN ONE */}
        <Grid item container xs={5}>
          <Grid item xs={4} sx={{ px: 1, py: 1 }}>
            <img src={img} width="100%" alt={title} />
          </Grid>
          <Grid item xs={8} sx={{ px: 1, py: 1 }}>
            <Stack justifyContent="space-between" sx={{ height: '100%' }}>
              <Typography
                variant="body2"
                component="p"
                sx={{ fontWeight: 'bold' }}
              >
                {title}
              </Typography>
              <IconButton
                sx={{
                  color: 'red',
                  padding: '0px 0px',
                  borderRadius: 0,
                  maxWidth: '90px',
                  fontSize: { xs: '12px' },
                }}
                size="small"
                onClick={() => handleRemoveFromCart(productId)}
              >
                <DeleteIcon className={classes.deleteIcon} />
                Remove
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
        {/* COLUMN 2 */}
        <Grid
          item
          container
          xs={3}
          alignItems="center"
          justifyContent="center"
          style={{
            borderLeft: 'solid 1px #c4c4c4',
            borderRight: 'solid 1px #c4c4c4',
          }}
        >
          <Grid item xs={4}>
            <IconButton
              onClick={() => handleDecreaseQuantity(productId, quantity)}
            >
              <RemoveCircleIcon className={classes.icon} />
            </IconButton>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: 'center' }}>
            <Typography variant="body2" className={classes.textMorph}>
              {quantity}
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <IconButton
              onClick={() =>
                handleAddToCart({
                  img,
                  title,
                  price,
                  ratings,
                  productId,
                  quantity: 1,
                })
              }
            >
              <AddCircleIcon className={classes.icon} />
            </IconButton>
          </Grid>
        </Grid>
        {/* COLUMN 3 */}
        <Grid item xs={2} container alignItems="center" justifyContent="center">
          <Typography variant="body2" className={classes.unit}>
            {formatMoney(price)}
          </Typography>
        </Grid>
        {/* COLUMN 4 */}
        <Grid
          item
          xs={2}
          container
          alignItems="center"
          justifyContent="center"
          style={{ borderLeft: 'solid 1px #c4c4c4' }}
        >
          <Typography variant="body2" className={classes.textMorph}>
            {formatMoney(price * quantity)}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default CartItem;
