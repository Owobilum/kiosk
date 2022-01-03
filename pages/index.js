import { Grid, Typography } from "@mui/material"
import { makeStyles } from '@mui/styles';

import ImageCarousel from "../components/ImageCarousel"
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
          <CategoryCard />
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
        >
          <ImageCarousel />
        </Grid>

      </Grid>
    </div>
  )
}

export default Home