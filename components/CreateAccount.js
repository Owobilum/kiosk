import { useRouter } from "next/router"
import { Typography, Button, Box } from "@mui/material"
import { useDispatch } from "react-redux"

import { signInWithGoogle } from "../redux/actions/auth"

const CreateAccount = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%'
            }}
        >
            <Box>
                <Typography variant="h6" component="h6" sx={{ mb: 1 }}>
                    Create your Kiosk Account
                </Typography>
                <Typography variant="body1" component="p">
                    Create your Kiosk Account via just a few clicks! You can
                    register either through your e-mail or using your Google account
                </Typography>
            </Box>


            <Box>
                <Button
                    variant="contained"
                    sx={{ width: '100%', color: '#fff', mt: 3 }}
                    onClick={() => router.push('/signup')}
                >
                    Create an Account Via Email
                </Button>
                <Button
                    variant="outlined"
                    sx={{ width: '100%', textTransform: 'none', my: 2 }}
                    onClick={() => dispatch(signInWithGoogle(() => router.push('/')))}
                >
                    Sign Up With Google
                </Button>
            </Box>

        </Box>
    )
}

export default CreateAccount