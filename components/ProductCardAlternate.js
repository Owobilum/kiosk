import { useRouter } from "next/router";
import { Typography, Rating, Button, Grid, Box } from "@mui/material";

export default function ProductCardAlternate({ img, title, price, ratings, productId }) {
    const router = useRouter()
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
                    sx={{ cursor: 'pointer' }}
                >
                    <img
                        src={img}
                        width="100%"
                        alt={title}
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
                            ₦{price}
                        </Typography>
                        <Typography
                            variant="body2"
                            component="p"
                            sx={{ textDecoration: "line-through" }}
                        >
                            ₦{price}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            sx={{
                                display: { xs: 'none', md: 'flex' }
                            }}
                            style={{ width: '100%', color: '#fff' }}
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
                >
                    Add To Cart
                </Button>
            </Box>
        </div>
    )
}