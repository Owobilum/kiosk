import { CircularProgress, Grid, Box } from '@mui/material';
import { useSelector } from 'react-redux';

import SignIn from '../../components/SignIn';
import CreateAccount from '../../components/CreateAccount';

export default function AuthPage() {
  const { isLoading } = useSelector((state) => state.auth);
  return (
    <Box
      sx={{
        padding: { xs: '2%', md: '5%' },
      }}
    >
      {isLoading && (
        <Box sx={{ textAlign: 'center', my: 1 }}>
          <CircularProgress />
        </Box>
      )}
      <Grid container spacing={5}>
        <Grid item xs={12} md={6} sx={{ px: { md: 4 } }}>
          <SignIn />
        </Grid>
        <Grid item xs={12} md={6} sx={{ px: { md: 4 } }}>
          <CreateAccount />
        </Grid>
      </Grid>
    </Box>
  );
}
