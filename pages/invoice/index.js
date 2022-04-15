import { useEffect,useState } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/router'
import {useDispatch,useSelector} from 'react-redux'
import {Box,Button,Grid, Typography,Table,TableBody,TableCell,TableContainer,
    TableHead,TableRow, CircularProgress} from '@mui/material'

import { getOrder } from '../../redux/actions/order'
import { formatMoney } from '../../utils/helpers';
import withAuth from '../../utils/hocs/withAuth';

const classes={
    bold:{fontWeight:500}
}

function InvoicePage(){
    const dispatch = useDispatch()
    const router = useRouter()
    const [loading,setLoading] = useState(false)
    const { order: { path, id}, orderDetails } = useSelector(state=>state.order)
    const {address, displayName} = useSelector(state=>state.auth.user)
    const orderTotal = orderDetails?.items?.reduce((accumulator, { quantity, price }) => accumulator + (quantity * price), 0)

    useEffect(()=>{
        if(path){
            setLoading(true)
            dispatch(getOrder(path,id,()=>setLoading(false)))
        }
    },[dispatch,path,id])

    if(loading){
        return (
            <Box
                sx={{
                    backgroundColor: '#fff',
                    padding: { xs: '2% 2%', md: '2% 5%' },
                    margin: '1% 2%',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center'
                }}
            >
                <Box><CircularProgress color="primary"/></Box>
            </Box>
        )
    }

    return (
        <Box
            sx={{
                backgroundColor: '#fff',
                padding: { xs: '2% 2%', md: '2% 5%' },
                margin: '1% 2%'
            }}
        >
            <Grid container justifyContent="space-between">
                <Grid item xs={12} md={6}>
                    <Box sx={{display:'flex', alignItems:'center', mb:{md:4}}}>
                        <Box>
                            <Image
                                src="/kiosk.png"
                                alt="kiosk logo"
                                height={60}
                                width={60}
                            />
                        </Box>
                        <Box>
                            <Typography variant="h5" component="span">
                                KIOSK
                            </ Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} sx={{textAlign:{md:'right'}}}>
                    <Typography component="h1" variant="h5"
                        sx={{fontWeight:700, mb:2}}
                    >
                        Order Confirmation
                    </Typography>
                    <Typography><span style={classes.bold}>Date:</span> {orderDetails?.date}</Typography>
                    <Typography><span style={classes.bold}>Order Number:</span> {orderDetails?.id}</Typography>
                    <Typography><span style={classes.bold}>Payment Reference: </span>{orderDetails?.paymentReference}</Typography>
                    <Typography><span style={classes.bold}>Customer Name:</span>  {displayName}</Typography>
                    <Typography><span style={classes.bold}>Customer Address:</span>  {address}</Typography>
                </Grid>
            </Grid>

            <TableContainer component={Box} sx={{mt:4}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>S/N</TableCell>
                            <TableCell>Item</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Unit Cost (₦)</TableCell>
                            <TableCell>Subtotal (₦)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderDetails?.items?.map(({title,quantity,price},index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {index+1}
                            </TableCell>
                            <TableCell>{title}</TableCell>
                            <TableCell>{quantity}</TableCell>
                            <TableCell>{price}</TableCell>
                            <TableCell>{price*quantity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
            <Box sx={{textAlign:'right', py:4}}>
                <Typography variant="h5">
                    <span style={{backgroundColor:'#fcfcfc', padding:8, fontWeight:600}}>
                        Order Total: {formatMoney(orderTotal)}
                    </span>
                </Typography>
            </Box>

            <Box
                sx={{
                    "@media print": {
                        display: 'none'
                    },
                    textAlign:'center',
                    mt:4
                }}
            >
                <Button variant="contained" color="primary" size="large" sx={{color:'#fff', mr:1,mb:1}} 
                    onClick={()=>window.print()}>
                    Print
                </Button>
                <Button variant="outlined" color="primary" size="large" sx={{mb:1}}
                    onClick={()=>router.push('/')}
                >
                    Continue Shopping
                </Button>
            </Box>
        </Box>
    )
}
export default withAuth(InvoicePage)