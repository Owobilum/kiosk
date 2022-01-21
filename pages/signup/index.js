import React from 'react'
import { useRouter } from 'next/router';
import {
    Box, Button, TextField, Typography, FormControl, Input, InputAdornment,
    InputLabel, IconButton, OutlinedInput, Grid, CircularProgress
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';

import { signUpWithEmail } from '../../redux/actions/auth';

export default function SignupPage() {
    const router = useRouter()
    const dispatch = useDispatch()
    const { isLoading } = useSelector(state => state.auth)

    const schema = yup.object().shape({
        email: yup.string().email("must be valid email").required("required"),
        password: yup.string().required("required")
            .min(8, 'must be at least 8 characters long'),
        // .matches(/^.*(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/,
        //     'Password must contain at least one letter,number and special character.')
        firstname: yup.string().required("required"),
        lastname: yup.string().required("required"),
        address: yup.string().required("required"),
        phone: yup.string().required("required")
            .min(11, 'must be at least 11 digits')
            .max(11, '11 digits maximum')
    })

    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = data => {
        let details = {
            displayName: `${data.firstname} ${data.lastname}`,
            address: data.address,
            phone: data.phone
        }
        dispatch(signUpWithEmail(data.email, data.password, details, () => router.push('/')))
    }

    const [showPassword, setShowPassword] = React.useState(false)

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
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid
                    container
                    spacing={3}
                    sx={{ mt: 3, mb: 5 }}
                >
                    <Grid item xs={12} md={6}>
                        <Controller
                            name="firstname"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="First Name"
                                    variant="outlined"
                                    sx={{ width: '100%' }}
                                    value={field.value || ""}
                                />
                            )}
                        />
                        <span style={{ fontSize: 12, color: 'red' }}>
                            {errors.firstname?.message}
                        </span>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Controller
                            name="lastname"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Last Name"
                                    variant="outlined"
                                    sx={{ width: '100%' }}
                                    value={field.value || ""}
                                />
                            )}
                        />
                        <span style={{ fontSize: 12, color: 'red' }}>
                            {errors.lastname?.message}
                        </span>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Email"
                                    variant="outlined"
                                    sx={{ width: '100%' }}
                                    value={field.value || ""}
                                />
                            )}
                        />
                        <span style={{ fontSize: 12, color: 'red' }}>
                            {errors.email?.message}
                        </span>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <FormControl sx={{ width: '100%' }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password2">Password</InputLabel>
                                    <OutlinedInput
                                        {...field}
                                        id="outlined-adornment-password2"
                                        type={showPassword ? 'text' : 'password'}
                                        value={field.value || ""}
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
                            )}
                        />
                        <span style={{ fontSize: 12, color: 'red' }}>
                            {errors.password?.message}
                        </span>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Controller
                            name="phone"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Phone Number"
                                    variant="outlined"
                                    sx={{ width: '100%' }}
                                    value={field.value || ""}
                                />
                            )}
                        />
                        <span style={{ fontSize: 12, color: 'red' }}>
                            {errors.phone?.message}
                        </span>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Controller
                            name="address"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Address"
                                    variant="outlined"
                                    sx={{ width: '100%' }}
                                    value={field.value || ""}
                                />
                            )}
                        />
                        <span style={{ fontSize: 12, color: 'red' }}>
                            {errors.address?.message}
                        </span>
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    sx={{ width: '100%', color: '#fff' }}
                    variant="contained"
                    disabled={isLoading}

                >
                    {isLoading ? <CircularProgress /> : 'Create Account'}
                </Button>
            </form>
            <Box sx={{ my: 3, textAlign: 'center' }}>
                <Typography variant="body2" component="p">
                    Already have an account?
                </Typography>
                <Button
                    onClick={() => router.push('/signin')}
                >Sign In</Button>
            </Box>
        </Box>
    )
}