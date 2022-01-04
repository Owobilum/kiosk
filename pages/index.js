import { Grid, Typography } from "@mui/material"
import { makeStyles } from '@mui/styles';

import ImageCarousel from "../components/ImageCarousel"
import CategoryList from "../components/CategoryList";
import ProductCard from "../components/ProductCard"
import CategoryCard from "../components/CategoryCard";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      paddingBottom: 32,
    },
  },
  paper: {
    width: '100%'
  },
}));

const Home = () => {
  const classes = useStyles()
  return (
    <div
      className={classes.root}
      style={{
        paddingRight: '5%',
        paddingLeft: '5%',
        // border: 'solid red',
      }}
    >

      {/* CAROUSEL ROW */}
      <Grid
        container
        justifyContent={"space-between"}
        style={{
          // border: 'solid yellow', 
          maxHeight: 400
        }}
      >
        <Grid
          item
          md={3}
          sx={{
            display: { xs: 'none', md: 'flex' }
          }}
        >
          <CategoryList />
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
        >
          <ImageCarousel />
        </Grid>

      </Grid>

      {/* TOP DEALS ROW */}
      <Grid
        container
        style={{ marginTop: 32 }}
      >
        <Grid item xs={12}>
          <ProductCard />
        </Grid>

      </Grid>

      {/* CATEGORIES ROW */}
      <Grid
        container
      >
        <Grid item xs={6}>
          <CategoryCard />
        </Grid>
      </Grid>
    </div>
  )
}

export default Home