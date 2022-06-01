import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Typography,
  Grid,
  Paper,
  Box,
  Stack,
  CircularProgress,
} from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import { makeStyles } from '@mui/styles';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useDispatch, useSelector } from 'react-redux';

import CategoryList from '../../components/CategoryList';
import ProductCard from '../../components/ProductCard';
import ProductCardAlternate from '../../components/ProductCardAlternate';
import ProductFilter from '../../components/ProductFilter';
import {
  clearProductsInCategory,
  getProductsInCategory,
} from '../../redux/actions/product';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 100,
    [theme.breakpoints.up('md')]: {
      padding: '0px 5%',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0px 1%',
    },
  },
  paper: {
    width: '100%',
    padding: '5%',
    paddingTop: '2%',
  },
  flexParent: {
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: 'solid 1px #c4c4c4',
    borderBottom: 'solid 1px #c4c4c4',
    marginBottom: 16,
    paddingTop: 8,
  },
  productItem: {
    [theme.breakpoints.down('sm')]: {
      margin: '8px 0px',
    },
  },
  icon: {
    color: 'darkgrey',
    cursor: 'pointer',
  },
  activeIcon: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },
  loaderBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default function CategoryPage() {
  const router = useRouter();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { category } = router.query;
  const products = useSelector((state) => state.products.categoryProducts);
  const [isGridView, setIsGridView] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  const handleFilter = (minimum, maximum) => {
    let filteredProducts;
    if (minimum && !maximum) {
      filteredProducts = products.filter((product) => product.price >= minimum);
    } else if (maximum && !minimum) {
      filteredProducts = products.filter((product) => product.price <= maximum);
    } else {
      filteredProducts = products.filter(
        (product) => product.price >= minimum && product.price <= maximum
      );
    }
    setCategoryProducts(filteredProducts);
  };

  const handleResetFilter = () => {
    setMin(0);
    setMax(0);
    setCategoryProducts(products);
  };

  useEffect(() => {
    if (products) {
      setCategoryProducts(products);
    }
  }, [products]);

  useEffect(() => {
    const path = `/category/${category}`;
    if (category) {
      setIsLoading(true);
      dispatch(getProductsInCategory(path, () => setIsLoading(false)));
    }
  }, [category]);

  useEffect(
    () => () => {
      dispatch(clearProductsInCategory());
    },
    []
  );

  return (
    <div className={classes.root}>
      <Grid container justifyContent="space-between" spacing={2}>
        <Grid
          item
          md={3}
          sx={{
            display: { xs: 'none', md: 'block' },
          }}
        >
          <Box style={{ width: '100%', marginBottom: 16 }}>
            <CategoryList />
          </Box>
          <Box style={{ width: '100%' }}>
            <ProductFilter
              handleFilter={handleFilter}
              handleResetFilter={handleResetFilter}
              setMin={setMin}
              setMax={setMax}
              min={min}
              max={max}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={9}>
          <Paper className={classes.paper}>
            <Typography variant="h6" component="h6">
              {category?.toUpperCase()}
            </Typography>
            <Box className={classes.flexParent}>
              <Box>
                {!isLoading && categoryProducts !== undefined && (
                  <Typography variant="body2">
                    {`${categoryProducts?.length} products found`}
                    <span style={{ marginLeft: 8 }}>
                      <FilterListIcon
                        sx={{
                          display: { xs: 'inline', md: 'none' },
                        }}
                        className={isFilter ? classes.activeIcon : classes.icon}
                        onClick={() => setIsFilter(!isFilter)}
                      />
                    </span>
                  </Typography>
                )}
              </Box>
              <Box>
                <ViewListIcon
                  className={isGridView ? classes.icon : classes.activeIcon}
                  onClick={() => setIsGridView(false)}
                />
                <GridViewIcon
                  sx={{ ml: 2 }}
                  className={!isGridView ? classes.icon : classes.activeIcon}
                  onClick={() => setIsGridView(true)}
                />
              </Box>
            </Box>
            {/* MOBILE VIEW FILTER */}
            {isFilter && (
              <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 2 }}>
                <ProductFilter
                  handleFilter={handleFilter}
                  handleResetFilter={handleResetFilter}
                  setMin={setMin}
                  setMax={setMax}
                  min={min}
                  max={max}
                />
              </Box>
            )}
            {isGridView && !isLoading && (
              <Grid container spacing={2}>
                {categoryProducts &&
                  categoryProducts.map((product) => (
                    <Grid
                      key={product.title}
                      item
                      xs={12}
                      md={4}
                      className={classes.productItem}
                    >
                      <ProductCard
                        img={product.image}
                        title={product.title}
                        price={product.price}
                        ratings={product.rating.rate}
                        productId={product.id}
                      />
                    </Grid>
                  ))}
              </Grid>
            )}
            {!isGridView && !isLoading && (
              <Stack spacing={3} style={{}}>
                {categoryProducts &&
                  categoryProducts.map((product) => (
                    <ProductCardAlternate
                      key={product.title}
                      img={product.image}
                      title={product.title}
                      price={product.price}
                      ratings={product.rating.rate}
                      productId={product.id}
                    />
                  ))}
              </Stack>
            )}
            {isLoading && (
              <Box className={classes.loaderBox}>
                <CircularProgress color="primary" />
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
