import { styled } from "@mui/material/styles";
import {
    Box,
    useMediaQuery,
    useTheme
} from "@mui/material";
import Prev from "@mui/icons-material/KeyboardArrowLeftRounded";
import Next from "@mui/icons-material/KeyboardArrowRightRounded";
import Carousel from "react-material-ui-carousel";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    caro: {
        [theme.breakpoints.up('md')]: {
            minHeight: 350,
        },
        maxHeight: '100%',
    },
    img: {
        // objectFit: 'cover',
        width: '100%',
        height: 'auto',
        borderRadius: 5,
        maxHeight: 340
    }

}));

const RootStyle = styled("div")(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        height: 350,
    },
}));

export default function ImageCarousel() {
    const classes = useStyles()
    const isMobile = useMediaQuery(useTheme().breakpoints.down("md"));
    return (
        <RootStyle>
            <Carousel
                className={classes.caro}
                navButtonsProps={{
                    style: {
                        backgroundColor: "#008080"
                    }
                }}
                indicatorIconButtonProps={{
                    style: {
                        color: "grey"
                    }
                }}
                activeIndicatorIconButtonProps={{
                    style: {
                        color: "#008080",
                        backgroundColor: "#008080"
                    }
                }}
                PrevIcon={<Prev />}
                NextIcon={<Next />}
                autoPlay
                duration={1000}
                navButtonsAlwaysVisible={isMobile ? false : false}
                stopAutoPlayOnHover
                indicators={isMobile ? true : true}
            >
                <Component1 classes={classes} />
                <Component2 classes={classes} />
                <Component3 classes={classes} />
            </Carousel>
        </RootStyle>
    );
}

function Component1({ classes }) {
    return (
        <Box sx={{ position: "relative", maxHeight: '100%', }}>
            <img
                src="/tailor.jpg"
                className={classes.img}
                alt=""
            />
        </Box>
    );
}

function Component2({ classes }) {
    return (
        <Box sx={{ position: "relative", maxHeight: '100%', }}>
            <img
                src="/model.jpg"
                className={classes.img}
                alt=""
            />
        </Box>
    );
}

function Component3({ classes }) {
    return (
        <Box sx={{ position: "relative", maxHeight: '100%', }}>
            <img
                src="/suits.jpg"
                className={classes.img}
                alt=""
            />
        </Box>
    );
}


