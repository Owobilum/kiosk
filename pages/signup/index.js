import React from 'react'
import { useRouter } from 'next/router';
import {
    Box, Button, TextField, Typography, FormControl, Input, InputAdornment,
    InputLabel, IconButton, OutlinedInput, Grid
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff'

export default function SignupPage() {
    const router = useRouter()

    const [values, setValues] = React.useState({
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = React.useState(false)

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Box
            sx={{
                padding: { xs: '2%', md: '5%' },
                px: { xs: '2%', md: '10%' },
            }}
        >
            <Typography variant="h6" component="h6">
                Create Account
            </Typography>
            <Grid
                container
                spacing={3}
                sx={{ mt: 3, mb: 5 }}
            >
                <Grid item xs={12} md={6}>
                    <TextField
                        label="First Name"
                        variant="outlined"
                        sx={{ width: '100%' }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Last Name"
                        variant="outlined"
                        sx={{ width: '100%' }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        sx={{ width: '100%' }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl sx={{ width: '100%' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password2"
                            type={showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Phone Number"
                        variant="outlined"
                        sx={{ width: '100%' }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Address"
                        variant="outlined"
                        sx={{ width: '100%' }}
                    />
                </Grid>
            </Grid>
            <Button
                sx={{ width: '100%', color: '#fff' }}
                variant="contained"
            >
                Create Account
            </Button>
            <Box sx={{ my: 3, textAlign: 'center' }}>
                <Typography variant="body2" component="p">
                    Already have an account?
                </Typography>
                <Button
                    onClick={() => router.push('/login')}
                >Login</Button>
            </Box>
        </Box>
    )
}