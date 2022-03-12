import { useRouter } from "next/router";
import { Typography, Rating, Button, Grid, Box } from "@mui/material";
import { useDispatch } from "react-redux"

import { formatMoney } from '../utils/helpers';
import { addToCart } from '../redux/actions/cart';

export default function ProductCardAlternate({ img, title, price, ratings, productId }) {
    const router = useRouter()
    const dispatch = useDispatch()

    const handleAddToCart = product => dispatch(addToCart(product))

    return (
        <div>
            <Grid
                container
                style={{ marginBottom: 0 }}
            >
                <Grid
                    item
                    xs={3}
                    onClick={() => router.push(`/products/${productId}`)}
                    sx={{ cursor: 'pointer', height: '150px' }}
                >
                    <img
                        src={img}
                        width="100%"
                        alt={title}
                        style={{
                            height: '100%',
                            width: '100%',
                            objectFit: 'cover',
                            objectPosition: 'top center'
                        }}
                    />
                </Grid>
                <Grid
                    item
                    xs={6}
                    sx={{ px: 1, cursor: 'pointer' }}
                    onClick={() => router.push(`/products/${productId}`)}
                >
                    <Typography variant="body2" component="p" style={{ marginBottom: 12 }}>
                        {title}
                    </Typography>
                    <Rating
                        name="disabled"
                        size="small"
                        value={ratings}
                        readOnly
                    />
                </Grid>
                <Grid
                    item
                    container
                    direction="column"
                    justifyContent="space-between"
                    xs={3}
                >
                    <Grid item>
                        <Typography
                            variant="body2"
                            component="p"
                        >
                            {formatMoney(price)}
                        </Typography>
                        <Typography
                            variant="body2"
                            component="p"
                            sx={{ textDecoration: "line-through" }}
                        >
                            {formatMoney(price + ((45 * price / 100)))}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            sx={{
                                display: { xs: 'none', md: 'flex' }
                            }}
                            style={{ width: '100%', color: '#fff' }}
                            onClick={() => handleAddToCart({ img, title, price, ratings, productId, quantity: 1 })}
                        >
                            Add To Cart
                        </Button>
                    </Grid>
                </Grid>

            </Grid>
            <Box
                sx={{
                    display: { xs: 'block', md: 'none' }
                }}
                style={{ marginTop: 0 }}
            >
                <Button
                    variant="contained"
                    style={{ width: '100%', color: '#fff' }}
                    onClick={() => handleAddToCart({ img, title, price, ratings, productId, quantity: 1 })}
                >
                    Add To Cart
                </Button>
            </Box>
        </div>
    )
}