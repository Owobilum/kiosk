import { Typography, Grid, Paper, Button, TextField } from '@mui/material'

export default function ProductFilter() {
    return (
        <Paper style={{ padding: '5%' }}>
            <Grid container justifyContent={"space-between"}>
                <Grid item>
                    <Typography variant="body2">
                        Price (₦)
                    </Typography>
                </Grid>
                <Grid item>
                    <Button>
                        Apply
                    </Button>
                </Grid>
            </Grid>
            <Grid container justifyContent={"space-between"}>
                <Grid item xs={5}>
                    <TextField
                        placeholder='Min'
                        size='small'
                    />
                </Grid>
                <Grid item xs={2} style={{ textAlign: 'center' }}>
                    <Typography variant='body1'>
                        -
                    </Typography>
                </Grid>
                <Grid item xs={5}>
                    <TextField
                        placeholder='Max'
                        size='small'
                    />
                </Grid>
            </Grid>
        </Paper>
    )
}