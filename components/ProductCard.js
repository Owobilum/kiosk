import React from 'react';
import { useRouter } from 'next/router';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Rating, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from "react-redux"

import { formatMoney } from '../utils/helpers';
import { addToCart } from '../redux/actions/cart';
import { addSavedItem } from '../redux/actions/product';

const useStyles = makeStyles({
    titleText: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    btn: {
        color: "#fff"
    }
})

export default function ProductCard({ img, title, price, ratings, productId }) {
    const router = useRouter()
    const classes = useStyles()
    const dispatch = useDispatch()
    const [isFavourite, setIsFavourite] = React.useState(false)
    // const { savedItems } = useSelector(state => state.auth?.user)
    const savedItems = useSelector(state => state.auth?.user?.savedItems)
    const { user } = useSelector(state => state.auth)

    const handleAddToCart = product => {
        dispatch(addToCart(product))
    }

    const handleSaveItem = product => {
        if (user) {
            setIsFavourite(true)
            setTimeout(() => setIsFavourite(false), 250)
            dispatch(addSavedItem(product, savedItems, user.id))
        } else {
            router.push('/signin')
        }

    }

    return (
        <Card sx={{ maxWidth: { md: 300, height: "100%" } }} elevation={0}>
            <CardActionArea
                onClick={() => router.push(`/products/${productId}`)}
            >
                <CardMedia
                    component="img"
                    height="140"
                    image={img}
                    alt={title}
                />
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="body1"
                        component="div"
                        className={classes.titleText}
                    >
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {formatMoney(price)}
                    </Typography>
                    <Typography
                        variant="body2"
                        component="p"
                        color="text.secondary"
                        sx={{ textDecoration: "line-through" }}
                    >
                        {formatMoney(price + (45 * price / 100))}
                    </Typography>
                    <Rating
                        name="disabled"
                        size="small"
                        value={ratings || ""}
                        readOnly
                    />
                </CardContent>
            </CardActionArea>
            <CardActions sx={{ display: "flex", justifyContent: 'space-between' }}>
                <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    className={classes.btn}
                    onClick={() => handleAddToCart({ img, title, price, ratings, productId, quantity: 1 })}
                >
                    Add To Cart
                </Button>
                <IconButton
                    size="small"
                    onClick={() => handleSaveItem({ img, title, price, ratings, productId }, savedItems)}
                >
                    <FavoriteIcon color={isFavourite ? "primary" : ""} />
                </IconButton>
            </CardActions>
        </Card>
    );
}
