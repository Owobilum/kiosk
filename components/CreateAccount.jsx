import { useRouter } from 'next/router';
import { Typography, Button, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { signInWithGoogle } from '../redux/actions/auth';

function CreateAccount() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      <Box>
        <Typography variant="h6" component="h6" sx={{ mb: 1 }}>
          Create your Kiosk Account
        </Typography>
        <Typography variant="body1" component="p">
          Create your Kiosk Account via just a few clicks! You can register
          either through your e-mail or using your Google account
        </Typography>
      </Box>

      <Box>
        <Button
          variant="contained"
          sx={{ width: '100%', color: '#fff', mt: 3 }}
          onClick={() => router.push('/signup')}
        >
          Create an Account
        </Button>
        <Button
          variant="outlined"
          sx={{ width: '100%', textTransform: 'none', my: 2 }}
          onClick={() => dispatch(signInWithGoogle(() => router.push('/')))}
          disabled={isLoading}
        >
          Sign Up With Google
        </Button>
      </Box>
    </Box>
  );
}

export default CreateAccount;
