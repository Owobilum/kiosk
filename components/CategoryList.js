import Image from 'next/image';
import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import { Paper, Typography } from "@mui/material"

import categories from '../utils/categories';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: '100%',
        [theme.breakpoints.up('md')]: {
            padding: '5%',
        },
    },
    heading: {
        marginBottom: 32
    },
    item: {
        marginBottom: 16
    },
    itemText: {
        marginLeft: 8,
        cursor: 'pointer'
    }
}));

const CategoryList = () => {
    const classes = useStyles()
    const router = useRouter()
    return (
        <>
            <Paper elevation={1} className={classes.paper}>
                <Typography variant="h6" component="h6" className={classes.heading}>
                    Categories
                </Typography>
                {
                    categories.map(category => (
                        <Typography
                            key={category.name}
                            variant="body2"
                            component="p"
                            className={classes.item}
                            onClick={() => router.push(`/categories/${category.path}`)}
                        >
                            <Image
                                src={category.icon}
                                alt=""
                                height="15px"
                                width="15px"
                            />
                            <span className={classes.itemText}>
                                {category.name}
                            </span>
                        </Typography>
                    ))
                }
            </Paper>
        </>
    )
}

export default CategoryList