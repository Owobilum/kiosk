import { Typography, Grid, Stack, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
    root: {
        border: 'solid 1px #c4c4c4'
    },
    textMorph: {
        fontWeight: 700,
        [theme.breakpoints.up('md')]: {
            fontSize: 24
        }
    },
    unit: {
        [theme.breakpoints.up('md')]: {
            fontSize: 24
        },
    },
    icon: {
        color: 'grey'
    },
    deleteIcon: {
        [theme.breakpoints.down('sm')]: {
            fontSize: 12
        }
    }
}))

const CartItem = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Grid container sx={{ backgroundColor: '#fff' }}>
                {/* COLUMN ONE */}
                <Grid item container xs={5}>
                    <Grid item xs={4} sx={{ px: 1, py: 1 }}>
                        <img
                            src="/suits.jpg"
                            width="100%"
                            alt="product"
                        />
                    </Grid>
                    <Grid item xs={8} sx={{ px: 1, py: 1 }}>
                        <Stack justifyContent="space-between" sx={{ height: '100%' }}>
                            <Typography variant="body2" component="p" sx={{ fontWeight: 'bold' }}>
                                Brown Blazer
                            </Typography>
                            <IconButton
                                sx={{
                                    color: 'red',
                                    padding: '0px 0px',
                                    borderRadius: 0,
                                    maxWidth: '90px',
                                    fontSize: { xs: '12px' }
                                }}
                                size="small"
                            >
                                <DeleteIcon className={classes.deleteIcon} />Remove
                            </IconButton>
                        </Stack>
                    </Grid>
                </Grid>
                {/* COLUMN 2 */}
                <Grid item container xs={3} alignItems="center" justifyContent="center" style={{ borderLeft: 'solid 1px #c4c4c4', borderRight: 'solid 1px #c4c4c4' }}>
                    <Grid item xs={4}>
                        <IconButton>
                            <RemoveCircleIcon className={classes.icon} />
                        </IconButton>
                    </Grid>
                    <Grid item xs={4} sx={{ textAlign: 'center' }}>
                        <Typography variant="body2" className={classes.textMorph}>
                            2
                        </Typography>
                    </Grid>
                    <Grid item xs={4} style={{ display: 'flex', justifyContent: 'center' }}>
                        <IconButton>
                            <AddCircleIcon className={classes.icon} />
                        </IconButton>
                    </Grid>
                </Grid>
                {/* COLUMN 3 */}
                <Grid item xs={2} container alignItems="center" justifyContent="center">
                    <Typography variant="body2" className={classes.unit}>
                        ₦20,000
                    </Typography>
                </Grid>
                {/* COLUMN 4 */}
                <Grid item xs={2} container alignItems="center" justifyContent="center" style={{ borderLeft: 'solid 1px #c4c4c4' }}>
                    <Typography variant="body2" className={classes.textMorph}>
                        ₦20,000
                    </Typography>
                </Grid>
            </Grid>
        </div >
    )
}

export default CartItem