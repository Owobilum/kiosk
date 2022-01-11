import React from "react"
import {
    Box, Button, TextField, Typography, FormControl, Input, InputAdornment,
    InputLabel, IconButton, OutlinedInput
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff'

const Login = () => {

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
        <Box>
            <Typography variant="h6" component="h6" sx={{ mb: 3 }}>
                Login
            </Typography>
            <Box sx={{ mb: 2 }}>
                <TextField
                    label="Email"
                    variant="outlined"
                    sx={{ width: '100%' }}
                />
            </Box>

            <FormControl sx={{ width: '100%' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password1"
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

            <Box
                sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}
            >
                <Button
                    sx={{ textTransform: 'none' }}
                >
                    Forgot Password
                </Button>
            </Box>
            <Button variant="contained" sx={{ width: '100%', color: '#fff', mt: 3 }}>
                Login
            </Button>
            <Button variant="outlined" sx={{ width: '100%', textTransform: 'none', my: 2 }}>
                Login With Google
            </Button>
        </Box>
    )
}

export default Login