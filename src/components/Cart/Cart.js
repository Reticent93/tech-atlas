import { Container, Typography, Button, Grid } from "@material-ui/core";
import {Link} from 'react-router-dom'
import useStyles from './styles'
import CartItem from "./CartItem/CartItem";


const Cart = ({cart, handleCart, handleEmptyCart, deleteCart}) => {
    const classes = useStyles()


    const renderEmptyCart = () => (
        <Typography variant={'subtitle1'}>Your Tech Atlas Cart is empty.<Link to='/' className={classes.link}>Time to start shopping</Link>!</Typography>
    )

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item} handleCart={handleCart} deleteCart={deleteCart}/>
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant={'h4'}>
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button className={classes.emptyButton} size={'large'} type="button" variant="contained" color={'secondary'} onClick={handleEmptyCart}>
                        Empty Cart
                    </Button>
                    <Button className={classes.checkoutButton} component={Link}to='/checkout'  size={'large'} type="button" variant="contained" color={'primary'}>
                        Checkout
                    </Button>
                </div>
            </div>
        </>
    )
    if(!cart.line_items) return 'Loading'

    return (
        <Container>
            <div className={classes.toolbar}/>
            <Typography className={classes.title} variant={'h3'} gutterBottom>Your Shopping Cart</Typography>
            {!cart.line_items.length ? renderEmptyCart() : FilledCart() }
        </Container>
    );
}

export default Cart;