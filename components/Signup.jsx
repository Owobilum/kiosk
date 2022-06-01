import { Box, Button, TextField, Typography } from '@mui/material';

function Signup() {
  return (
    <Box>
      <Typography variant="h6" component="h6" sx={{ mb: 3 }}>
        Create An Account
      </Typography>
      <Box>
        <TextField
          fullwidth
          label="Email"
          variant="standard"
          sx={{ width: '100%', mb: 2 }}
        />
      </Box>
      <Box>
        <TextField
          fullwidth
          label="Password"
          variant="standard"
          sx={{ width: '100%' }}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
        <Button sx={{ textTransform: 'none' }}>Forgot Password</Button>
      </Box>
      <Button variant="contained" sx={{ width: '100%', color: '#fff', mt: 3 }}>
        Sign Up
      </Button>
      <Button
        variant="outlined"
        sx={{ width: '100%', textTransform: 'none', my: 2 }}
      >
        Sign Up With Google
      </Button>
    </Box>
  );
}

export default Signup;
