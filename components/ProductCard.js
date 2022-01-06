import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Rating, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { makeStyles } from '@mui/styles';

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
    const classes = useStyles()
    const [isFavourite, setIsFavourite] = React.useState(false)
    return (
        <Card sx={{ maxWidth: { md: 300, height: "100%" } }}>
            <CardActionArea>
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
                        ₦{price}
                    </Typography>
                    <Typography
                        variant="body2"
                        component="p"
                        color="text.secondary"
                        sx={{ textDecoration: "line-through" }}
                    >
                        ₦{price}
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
                >
                    Add To Cart
                </Button>
                <IconButton
                    size="small"
                    onClick={() => setIsFavourite(!isFavourite)}
                >
                    <FavoriteIcon color={isFavourite ? "primary" : ""} />
                </IconButton>
            </CardActions>
        </Card>
    );
}
