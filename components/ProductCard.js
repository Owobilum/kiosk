import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Rating, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function ProductCard() {
    const [isFavourite, setIsFavourite] = React.useState(false)
    return (
        // <Card sx={{ maxWidth: 345 }}>
        <Card sx={{ maxWidth: { md: 300 } }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image="/tailor.jpg"
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="body1" component="div">
                        Quality Silk Dress
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        ₦10,000
                    </Typography>
                    <Typography
                        variant="body2"
                        component="p"
                        color="text.secondary"
                        sx={{ textDecoration: "line-through" }}
                    >
                        ₦25,000
                    </Typography>
                    <Rating
                        name="disabled"
                        size="small"
                        value={4.5}
                        readOnly
                    />
                </CardContent>
            </CardActionArea>
            <CardActions sx={{ display: "flex", justifyContent: 'space-between' }}>
                <Button
                    size="small"
                    color="primary"
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
