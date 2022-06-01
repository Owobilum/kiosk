import { useRouter } from 'next/router';
import {
  Typography,
  Button,
  Box,
  TextField,
  Card,
  CircularProgress,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { resetPassword } from '../../redux/actions/auth';

export default function PasswordResetPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoading } = useSelector((state) => state.auth);

  const schema = yup.object().shape({
    email: yup.string().email('must be valid email').required('required'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => dispatch(resetPassword(data.email));

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: { xs: '1%', md: '5%' },
      }}
    >
      <Card sx={{ maxWidth: { md: '500px' }, width: '100%', px: 1, py: 1 }}>
        <Typography
          variant="h5"
          component="h5"
          color="primary"
          sx={{ fontSize: { md: 48 }, my: 1 }}
        >
          Password Reset
        </Typography>
        <Typography
          variant="caption"
          component="p"
          sx={{
            maxWidth: '300px',
            backgroundColor: '#f5f5f5',
            px: 1,
            py: 1,
            mb: 2,
          }}
        >
          <InfoIcon color="primary" fontSize="small" />
          Please input your email address associated with Kiosk and we will send
          a password reset link to the email
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                label="Email"
                variant="outlined"
                sx={{ width: '100%' }}
                value={field.value || ''}
              />
            )}
          />
          <span style={{ fontSize: 12, color: 'red' }}>
            {errors.email?.message}
          </span>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              sx={{ width: '100%', color: '#fff' }}
              type="submit"
            >
              {isLoading ? (
                <CircularProgress sx={{ color: '#fff' }} />
              ) : (
                'Reset Password'
              )}
            </Button>
          </Box>
        </form>

        <Box sx={{ my: 3, textAlign: 'center' }}>
          <Button onClick={() => router.push('/signin')}>
            Back to Sign In
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
