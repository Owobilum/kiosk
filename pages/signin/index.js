import { Grid } from '@mui/material'

import SignIn from '../../components/SignIn'
import CreateAccount from '../../components/CreateAccount'

export default function AuthPage() {
    return (
        <Grid
            container
            spacing={5}
            sx={{
                padding: { xs: '2%', md: '5%' },
            }}
        >
            <Grid
                item
                xs={12}
                md={6}
                sx={{ px: { md: 4 } }}
            >
                <SignIn />
            </Grid>
            <Grid
                item
                xs={12}
                md={6}
                sx={{ px: { md: 4 } }}
            >
                <CreateAccount />
            </Grid>
        </Grid>
    )
}