import { Grid, Box, Typography } from '@mui/material';
import Image from 'next/image';
import { makeStyles } from '@mui/styles';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const useStyles = makeStyles((theme) => ({
  root: {
    color: '#fff',
    backgroundColor: theme.palette.primary.dark,
    marginTop: 48,
    padding: '5%',
  },
  social: {
    cursor: 'pointer',
    marginRight: 8,
  },
  heading: {
    marginBottom: 24,
    [theme.breakpoints.down('sm')]: {
      marginTop: 16,
    },
  },
  item: {
    marginBottom: 10,
    cursor: 'pointer',
  },
  item2: {
    marginBottom: 10,
  },
  copyrightBox: {
    borderTop: 'solid 1px #c4c4c4',
    marginTop: 48,
    marginBottom: 8,
    paddingTop: 8,
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <Box
      className={classes.root}
      sx={{
        '@media print': {
          display: 'none',
        },
      }}
    >
      <Grid container justifyContent="space-between">
        <Grid item xs={12} md={4}>
          <Box className={classes.heading}>
            <Image
              src="/kiosk-light.png"
              height="20px"
              width="20px"
              alt="kiosk logo"
            />
            <Typography variant="h6" component="span" sx={{ ml: 1 }}>
              KIOSK
            </Typography>
          </Box>
          <Typography variant="body2" component="p" className={classes.item2}>
            (+234) 8055445102
          </Typography>
          <Typography variant="body2" component="p" className={classes.item2}>
            support@kiosk.com.ng
          </Typography>
          <Typography variant="body2" component="p" className={classes.item2}>
            No. 22 Romford Street, Wuse 2, Abuja
          </Typography>
          <Box>
            <FacebookIcon fontSize="small" className={classes.social} />
            <InstagramIcon fontSize="small" className={classes.social} />
            <TwitterIcon fontSize="small" className={classes.social} />
            <LinkedInIcon fontSize="small" className={classes.social} />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" component="h6" className={classes.heading}>
            Quick Links
          </Typography>
          <Typography variant="body2" component="p" className={classes.item}>
            About KIOSK
          </Typography>
          <Typography variant="body2" component="p" className={classes.item}>
            Sell on KIOSK
          </Typography>
          <Typography variant="body2" component="p" className={classes.item}>
            Become a Logistics Service Partner
          </Typography>
          <Typography variant="body2" component="p" className={classes.item}>
            Terms and Conditions
          </Typography>
          <Typography variant="body2" component="p" className={classes.item}>
            Privacy Policy
          </Typography>
        </Grid>
      </Grid>
      <Box className={classes.copyrightBox}>
        <Typography variant="caption">
          © 2022 Kiosk E-markets Limited. All rights reserved
        </Typography>
      </Box>
    </Box>
  );
}
