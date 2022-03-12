import { useState, useEffect } from "react";
import Prev from "@mui/icons-material/KeyboardArrowLeftRounded";
import Next from "@mui/icons-material/KeyboardArrowRightRounded";
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { makeStyles } from '@mui/styles';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'relative'
    },
    slide: {
        opacity: 0,
        cursor: 'pointer'
    },
    currentSlide: {
        cursor: 'pointer',
        opacity: 1,
        width: '100%',
        height: '100%',
    },
    img: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'top right',
        borderRadius: '5px'
    },
    navBox: {
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        zIndex: 5,
        display: 'flex',
        justifyContent: 'space-between'
    },
    indicatorBox: {
        position: 'absolute',
        bottom: '5%',
        left: 0,
        right: 0,
        zIndex: 5,
        display: 'flex',
        justifyContent: 'center'
    },
    textBox: {
        position: 'absolute',
        top: '5%',
        right: '5%',
        zIndex: 5,
        color: '#fff',
        cursor: 'pointer',
        textTransform: 'capitalize',
        padding: 4
    },
    offer: {
        [theme.breakpoints.up('md')]: {
            fontSize: 40,
        },
    },
    cta: {
        color: 'red'
    },
    hidden: {
        display: 'none'
    },
    btn: {
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        border: 'solid 1px',
        borderColor: theme.palette.primary.main,
        borderRadius: '2px',
        margin: 4
    }


}));

const slideData = [
    { id: 1, img: '/tailor.jpg', path: "electronics", pitch: "Free delivery for all electronics" },
    { id: 2, img: '/model.jpg', path: "women's clothing", pitch: "Get the best of women's fashion" },
    { id: 3, img: '/suits.jpg', path: "men's clothing", pitch: "50% off Men's Items" }
]

export default function ImageCarousel() {
    const classes = useStyles()
    const router = useRouter()
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isHovered, setIsHovered] = useState(false)
    const [isAuto, setIsAuto] = useState(true)
    const [currentPath, setCurrentPath] = useState('')

    const intervalTime = 5000

    const handleChangeSlide = (isNext) => {
        let timeoutId
        setIsAuto(false)
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            setIsAuto(true)
        }, 4000)
        if (isNext) {
            if (currentSlide < 2) {
                setCurrentSlide(prev => prev + 1)
            } else {
                setCurrentSlide(0)
            }
        } else {
            if (currentSlide > 0) {
                setCurrentSlide(prev => prev - 1)
            } else {
                setCurrentSlide(slideData.length - 1)
            }
        }

    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            currentSlide < 2 && isAuto ? setCurrentSlide(prev => prev + 1) : isAuto ? setCurrentSlide(0) : null
        }, intervalTime)
        setCurrentPath(slideData[currentSlide].path)

        return () => clearInterval(intervalId)
    }, [currentSlide, isAuto])

    return (
        <div
            className={classes.container}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {
                slideData.map(({ img, path }, i) => (
                    <div key={img}
                        className={i === currentSlide ? classes.currentSlide : classes.slide}
                        onClick={() => router.push(`/categories/${path}`)}
                    >
                        {i === currentSlide && <img src={img} alt="slide" className={classes.img} />}
                    </div>
                ))
            }
            <div className={isHovered ? classes.navBox : classes.hidden}>
                <div>
                    <button onClick={() => handleChangeSlide(false)} className={classes.btn}>
                        <Prev />
                    </button>
                </div>
                <div>
                    <button onClick={() => handleChangeSlide(true)} className={classes.btn}>
                        <Next />
                    </button>
                </div>
            </div>
            <div className={classes.indicatorBox}>
                {
                    slideData.map((slide, i) => {
                        if (currentSlide === i) {
                            return <RadioButtonCheckedIcon color="primary" key={i} />
                        } else {
                            return <RadioButtonUncheckedIcon color="primary" key={i} />
                        }
                    })
                }
            </div>
            <div className={classes.textBox} onClick={() => router.push(`/categories/${currentPath}`)}>
                {
                    slideData.map(({ pitch }, i) => {
                        if (currentSlide === i) {
                            return (<h2 key={pitch + i} className={classes.offer}>
                                {pitch}
                            </h2>)
                        }
                    })
                }
                <h1 className={classes.cta}>Shop Now</h1>
            </div>
        </div>
    )
}


