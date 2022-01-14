import React, { useState } from 'react'
import { useRouter } from "next/router"
import { Typography, Grid, Paper, Box, Stack, IconButton, Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@mui/styles'
import { useDispatch, useSelector } from 'react-redux'

import CategoryList from '../../components/CategoryList'
import ProductCardAlternate from '../../components/ProductCardAlternate';
import { removeSavedItem } from '../../redux/actions/product'

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: 100,
        [theme.breakpoints.up('md')]: {
            padding: '0px 5%'
        },
        [theme.breakpoints.down('sm')]: {
            padding: '0px 1%'
        },
    },
    paper: {
        width: '100%',
        padding: '5%',
        paddingTop: '2%'
    },
    flexParent: {
        display: 'flex',
        justifyContent: 'space-between',
        borderTop: 'solid 1px #c4c4c4',
        borderBottom: 'solid 1px #c4c4c4',
        marginBottom: 16,
        paddingTop: 8
    },
    productItem: {
        [theme.breakpoints.down('sm')]: {
            margin: '8px 0px'
        },
    },
    icon: {
        color: 'darkgrey',
        cursor: 'pointer',
    },
    activeIcon: {
        color: theme.palette.primary.main,
        cursor: 'pointer',
    },
    loaderBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}))

export default function CategoryPage() {
    const router = useRouter()
    const classes = useStyles()
    const dispatch = useDispatch()
    const { savedItems } = useSelector(state => state.products)
    const [isLoading, setIsLoading] = useState(false)

    const handleRemoveItem = id => dispatch(removeSavedItem(id))

    return (
        <div className={classes.root}>
            <Grid
                container
                justifyContent={"space-between"}
            >
                <Grid
                    item
                    md={3}
                    sx={{
                        display: { xs: 'none', md: 'block' }
                    }}
                >
                    <Box style={{ width: '100%', marginBottom: 32 }}>
                        <CategoryList />
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={8}
                >
                    <Paper
                        className={classes.paper}
                    >
                        <Typography
                            variant="h6"
                            component="h6"
                        >
                            {"Your Wishlist"}
                        </Typography>
                        <Box className={classes.flexParent}>
                            <Box>
                                {!isLoading && savedItems &&
                                    <Typography
                                        variant="body2"
                                    >
                                        {`${savedItems?.length} product(s) found`}
                                    </Typography>

                                }
                            </Box>
                        </Box>
                        {!isLoading &&
                            <Stack spacing={3} style={{}}>
                                {savedItems && savedItems.map(product => (
                                    <React.Fragment key={product.title}>
                                        <ProductCardAlternate
                                            img={product.img}
                                            title={product.title}
                                            price={product.price}
                                            ratings={product.ratings}
                                            productId={product.productId}
                                        />
                                        <IconButton
                                            size="small"
                                            sx={{
                                                maxWidth: 100,
                                                fontsize: 10,
                                                color: '#000'
                                            }}
                                            onClick={() => handleRemoveItem(product.productId)}
                                        >
                                            <DeleteIcon fontSize="small" sx={{ color: 'red' }} />Remove
                                        </IconButton>
                                    </React.Fragment>
                                ))}
                            </Stack>
                        }
                        {
                            savedItems.length === 0 &&
                            <Button variant="outlined" onClick={() => router.push('/')}>
                                Continue Shopping
                            </Button>
                        }
                        {/* {
                            isLoading &&
                            <Box className={classes.loaderBox}>
                                <CircularProgress color="primary" />
                            </Box>
                        } */}

                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}