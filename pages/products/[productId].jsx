import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Grid,
  Box,
  Paper,
  Typography,
  Rating,
  Button,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux';

import { addSavedItem, getProduct } from '../../redux/actions/product';
import { addToCart } from '../../redux/actions/cart';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 100,
    marginBottom: 100,
    [theme.breakpoints.up('md')]: {
      padding: '0px 5%',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0px 2%',
    },
  },
  bold: {
    fontWeight: 700,
  },
  loaderBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgBox: {
    height: 250,
  },
  img: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    objectPosition: 'top center',
  },
}));
export default function ProductPage() {
  const router = useRouter();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { productId } = router.query;
  const { product } = useSelector((state) => state.products);
  const [isFavourite, setIsFavourite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const savedItems = useSelector((state) => state.auth?.user?.savedItems);
  const { user } = useSelector((state) => state.auth);

  const handleSaveItem = () => {
    const item = {
      img: product?.image,
      title: product?.title,
      price: product?.price,
      ratings: product?.rating.rate,
      productId: product?.id,
    };
    if (user) {
      setIsFavourite(true);
      setTimeout(() => setIsFavourite(false), 250);
      dispatch(addSavedItem(item, savedItems, user.id));
    } else {
      router.push('/signin');
    }
  };

  const handleAddToCart = () => {
    const item = {
      img: product?.image,
      title: product?.title,
      price: product?.price,
      ratings: product?.rating.rate,
      productId: product?.id,
      quantity: 1,
    };
    dispatch(addToCart(item));
  };

  useEffect(() => {
    if (productId) {
      setIsLoading(true);
      dispatch(getProduct(productId, () => setIsLoading(false)));
    }
  }, [productId]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {/* COLUMN ONE */}
        <Grid item xs={12} md={9}>
          <Paper sx={{ px: 2, py: 2, pb: 8 }}>
            {!isLoading && product && (
              <Grid item xs={12} container spacing={2}>
                <Grid item xs={12} md={5}>
                  <Box className={classes.imgBox}>
                    <img
                      src={product.image}
                      width="100%"
                      alt={product.title}
                      className={classes.img}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="body1"
                    component="p"
                    className={classes.bold}
                  >
                    {product.title}
                  </Typography>
                  <Rating
                    size="small"
                    value={product?.rating?.rate || 0}
                    readOnly
                    sx={{ mb: 4, mt: 1 }}
                  />
                  <Typography
                    variant="body1"
                    component="p"
                    className={classes.bold}
                  >
                    ₦{product.price}
                  </Typography>
                  <Typography
                    variant="body2"
                    component="p"
                    sx={{ textDecoration: 'line-through' }}
                  >
                    ₦{product.price}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ mt: 2, width: '100%', color: '#fff' }}
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                </Grid>
                <Grid item xs={2} md={1}>
                  <IconButton size="small" onClick={() => handleSaveItem()}>
                    <FavoriteIcon color={isFavourite ? 'primary' : ''} />
                  </IconButton>
                </Grid>
              </Grid>
            )}
            {isLoading && (
              <Box className={classes.loaderBox}>
                <CircularProgress color="primary" />
              </Box>
            )}
          </Paper>
        </Grid>

        {/* COLUMN TWO */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ mb: 3, px: 2, py: 2 }}>
            <Typography variant="h6" component="p">
              Delivery and Returns
            </Typography>
            <Typography variant="body2" component="p">
              Free shipping for all orders across Nigeria
            </Typography>
          </Paper>
          <Paper sx={{ px: 2, py: 2 }}>
            <Typography variant="h6" component="p">
              Seller Information
            </Typography>
            <Typography variant="body2" component="p">
              All products sold by Kiosk e-markets
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      {/* PRODUCT DETAILS SECTION */}
      <Grid container sx={{ mt: 3 }}>
        <Grid item xs={12} md={9}>
          {!isLoading && product && (
            <Paper sx={{ px: 2, py: 2 }}>
              <Typography variant="h6" component="p">
                Product Details
              </Typography>
              <Typography variant="body1">{product.description}</Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
