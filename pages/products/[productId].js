import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Grid, Box, Paper, Typography, Rating, Button, IconButton, CircularProgress } from '@mui/material'
import { makeStyles } from '@mui/styles'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux'

import { getProduct } from '../../redux/actions/product'

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: 100,
        marginBottom: 100,
        [theme.breakpoints.up('md')]: {
            padding: '0px 5%'
        },
        [theme.breakpoints.down('sm')]: {
            padding: '0px 2%'
        },
    },
    bold: {
        fontWeight: 700
    },
    loaderBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}))
export default function ProductPage() {
    const router = useRouter()
    const classes = useStyles()
    const dispatch = useDispatch()
    const { productId } = router.query
    const { product } = useSelector(state => state.products)
    const [isFavourite, setIsFavourite] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (productId) {
            setIsLoading(true)
            dispatch(getProduct(productId, () => setIsLoading(false)))
        }
    }, [productId])

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                {/* COLUMN ONE */}
                <Grid item xs={12} md={9}>
                    <Paper sx={{ px: 2, py: 2, pb: 8 }}>
                        {!isLoading &&
                            <Grid
                                item
                                xs={12}
                                container
                                spacing={2}
                            >
                                <Grid
                                    item
                                    xs={5}
                                >
                                    <Box>
                                        {product &&
                                            <img
                                                src={product?.image}
                                                // height="200px"
                                                width="100%"
                                                alt={product?.title}
                                            />
                                        }
                                    </Box>
                                </Grid>
                                <Grid
                                    item
                                    xs={5}
                                    md={6}
                                >
                                    <Typography
                                        variant="body1"
                                        component="p"
                                        className={classes.bold}
                                    >
                                        {product.title}
                                    </Typography>
                                    <Rating
                                        size="small"
                                        value={product?.rating?.rate || ""}
                                        readOnly
                                        sx={{ mb: 4, mt: 1 }}
                                    />
                                    <Typography
                                        variant="body1"
                                        component="p"
                                        className={classes.bold}
                                    >
                                        ₦{product.price}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        component="p"
                                        sx={{ textDecoration: "line-through" }}
                                    >
                                        ₦{product.price}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        sx={{ mt: 2, width: '100%', color: '#fff' }}
                                    >
                                        Add to Cart
                                    </Button>

                                </Grid>
                                <Grid
                                    item
                                    xs={2}
                                    md={1}
                                >
                                    <IconButton
                                        size="small"
                                        onClick={() => setIsFavourite(!isFavourite)}
                                    >
                                        <FavoriteIcon color={isFavourite ? "primary" : ""} />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        }
                        {
                            isLoading &&
                            <Box className={classes.loaderBox}>
                                <CircularProgress color='primary' />
                            </Box>
                        }
                    </Paper>
                </Grid>

                {/* COLUMN TWO */}
                <Grid item xs={12} md={3}>
                    <Paper sx={{ mb: 3, px: 2, py: 2 }}>
                        <Typography variant='h6' component="p">
                            Delivery and Returns
                        </Typography>
                        <Typography variant='body2' component="p">
                            Free shipping for all orders across Nigeria
                        </Typography>
                    </Paper>
                    <Paper sx={{ px: 2, py: 2 }}>
                        <Typography variant='h6' component="p">
                            Seller Information
                        </Typography>
                        <Typography variant='body2' component="p">
                            All products sold by Kiosk e-markets
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
            {/* PRODUCT DETAILS SECTION */}
            <Grid container sx={{ mt: 3 }}>
                <Grid item xs={12} md={9}>
                    {!isLoading &&
                        <Paper sx={{ px: 2, py: 2 }}>
                            <Typography variant="h6" component="p">
                                Product Details
                            </Typography>
                            <Typography variant='body1'>
                                {product.description}
                            </Typography>
                        </Paper>
                    }
                </Grid>
            </Grid>
        </div>
    )
}