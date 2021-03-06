import React, { useEffect } from 'react';
import { Grid, Typography, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';

import ImageCarousel from '../components/ImageCarousel';
import CategoryList from '../components/CategoryList';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import categories from '../utils/categories';
import callApi from '../utils/callApi';
import { saveProducts } from '../redux/actions/product';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      paddingBottom: 32,
    },
  },
  paper: {
    width: '100%',
  },
  productItem: {
    [theme.breakpoints.down('sm')]: {
      margin: '8px 0px',
    },
  },
}));

export default function Home({ topDeals, bestsellers, products }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (products) {
      dispatch(saveProducts(products));
    }
  }, [dispatch]);

  return (
    <div
      className={classes.root}
      style={{
        paddingRight: '5%',
        paddingLeft: '5%',
      }}
    >
      {/* CAROUSEL ROW */}
      <Grid
        container
        justifyContent="space-between"
        sx={{
          height: { xs: 300, md: 400 },
        }}
        spacing={2}
      >
        <Grid
          item
          md={3}
          sx={{
            display: { xs: 'none', md: 'flex' },
            maxHeight: '100%',
          }}
        >
          <CategoryList />
        </Grid>
        <Grid
          item
          xs={12}
          md={9}
          sx={{
            maxHeight: '100%',
          }}
        >
          <ImageCarousel />
        </Grid>
      </Grid>

      {/* TOP DEALS ROW */}
      <Paper
        sx={{
          py: 5,
          px: 2,
          mt: { xs: 1, md: 6 },
        }}
      >
        <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
          TOP DEALS
        </Typography>
        <Grid container spacing={1}>
          {topDeals.map((deal) => (
            <Grid
              key={deal.title}
              item
              xs={12}
              md={3}
              className={classes.productItem}
            >
              <ProductCard
                img={deal.image}
                title={deal.title}
                price={deal.price}
                ratings={deal.rating.rate}
                productId={deal.id}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* CATEGORIES ROW */}
      <Grid container spacing={3} sx={{ mt: 6 }}>
        {categories.map((category) => (
          <Grid key={category.name} item xs={12} md={6}>
            <CategoryCard
              img={category.img}
              name={category.name}
              path={category.path}
            />
          </Grid>
        ))}
      </Grid>

      {/* BESTSELLERS ROW */}
      <Paper
        sx={{
          py: 5,
          px: 2,
          mt: 6,
        }}
      >
        <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
          BEST SELLERS
        </Typography>
        <Grid container spacing={1}>
          {bestsellers.map((deal) => (
            <Grid
              key={deal.title}
              item
              xs={12}
              md={3}
              className={classes.productItem}
            >
              <ProductCard
                img={deal.image}
                title={deal.title}
                price={deal.price}
                ratings={deal.rating.rate}
                productId={deal.id}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </div>
  );
}

export async function getStaticProps() {
  const res = await callApi('/');
  const products = res.data;
  const topDeals = [products[0], products[5], products[10], products[15]];
  const bestsellers = [products[1], products[6], products[11], products[16]];

  return {
    props: {
      topDeals,
      bestsellers,
      products,
    },
  };
}
