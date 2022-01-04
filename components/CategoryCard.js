import { Box, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles({
    root: {
        overflow: 'hidden',
        marginTop: 32,
    },
    container: {
        height: 300,
        backgroundColor: 'grey',
        backgroundImage: "url('/model.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        '&:hover': {
            transform: 'scale(1.1)'
        },
        cursor: "pointer"
    },
    child: {
        // transition: 'width 0.5s',
        // '&:hover': {
        //     width: '50%'
        // },
        opacity: 0.8,
        height: "33%",
        width: "33%",
        backgroundColor: 'lightgrey',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }
})

const CategoryCard = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Box className={classes.container}>
                <Box className={classes.child}>
                    <Typography
                        variant="h6"
                        component="h6"
                    >
                        Electronics
                    </Typography>
                    <Typography
                        variant="body2"
                        component="p"
                    >
                        Shop Now
                    </Typography>

                </Box>

            </Box>
        </div>
    )
}

export default CategoryCard