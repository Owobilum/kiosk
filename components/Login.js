import React from "react"
import {
    Box, Button, TextField, Typography, FormControl, Input, InputAdornment,
    InputLabel, IconButton, OutlinedInput
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";



const Login = () => {

    const schema = yup.object().shape({
        email: yup.string().email("must be valid email").required("required"),
        password: yup.string().required("required")
            .min(8, 'must be at least 8 characters long')
        // .matches(/^.*(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/,
        //     'Password must contain at least one letter,number and special character.')
    })

    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema)
    });


    const [showPassword, setShowPassword] = React.useState(false)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onSubmit = data => console.log(data);

    // React.useEffect(() => {
    //     setValue('email', 'lawrenceikpebe@gmail.com')
    // }, [])

    return (
        <Box>
            <Typography variant="h6" component="h6" sx={{ mb: 3 }}>
                Login
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ mb: 2 }}>
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
                                value={field.value || ""}
                            />
                        )}
                    />
                    <span style={{ fontSize: 12, color: 'red' }}>
                        {errors.email?.message}
                    </span>
                </Box>

                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <>
                            <FormControl sx={{ width: '100%' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password1">Password</InputLabel>
                                <OutlinedInput
                                    {...field}
                                    id="outlined-adornment-password1"
                                    type={showPassword ? 'text' : 'password'}
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
                                    value={field.value || ""}
                                />
                            </FormControl>
                            <span style={{ fontSize: 12, color: 'red' }}>
                                {errors.password?.message}
                            </span>
                        </>
                    )}
                />

                <Box
                    sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}
                >
                    <Button
                        sx={{ textTransform: 'none' }}
                        onClick={e => e.preventDefault()}
                    >
                        Forgot Password
                    </Button>
                </Box>
                <Button variant="contained" sx={{ width: '100%', color: '#fff', mt: 3 }} type="submit">
                    Login
                </Button>
            </form>

            <Button variant="outlined" sx={{ width: '100%', textTransform: 'none', my: 2 }}>
                Login With Google
            </Button>
        </Box>
    )
}

export default Login