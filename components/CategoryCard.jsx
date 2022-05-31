import { useRouter } from 'next/router';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'hidden',
  },
  container: {
    height: 300,
    backgroundColor: 'grey',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'transform 0.2s ease',
    '&:hover': {
      transform: 'scale(1.1)',
    },
    cursor: 'pointer',
  },
  child: {
    opacity: 0.8,
    height: '33%',
    width: '33%',
    backgroundColor: 'lightgrey',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: '5%',
    },
  },
}));

function CategoryCard({ img, name, path }) {
  const router = useRouter();
  const classes = useStyles();

  const handleRoute = () => router.push(`/categories/${path}`);

  return (
    <Box className={classes.root} onClick={handleRoute}>
      <Box className={classes.container} style={{ backgroundImage: img }}>
        <Box className={classes.child}>
          <Typography
            variant="h6"
            component="h6"
            sx={{
              fontSize: { xs: 12, sm: 14, md: 16, lg: 20 },
              textAlign: 'center',
            }}
          >
            {name}
          </Typography>
          <Typography variant="body2" component="p">
            Shop Now
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default CategoryCard;
