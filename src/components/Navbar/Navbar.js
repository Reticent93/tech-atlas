import {AppBar, Toolbar, IconButton, Badge, Typography} from "@material-ui/core";
import {ShoppingCart} from "@material-ui/icons"
import useStyles from './styles'

import logo from '../../assets/shop_logo.png'

const Navbar = () => {
    const classes = useStyles()
    return (
        <>
<AppBar position={'fixed'} className={classes.appBar} color={"inherit"}>
    <Toolbar>
        <Typography variant={'h6'} color={'inherit'} className={classes.title}>
            <img src={logo} alt='Tech Atlas' height={'25px'} className={classes.image} />
            Tech Atlas
        </Typography>
        <div className={classes.grow}/>
        <div className={classes.button}>
            <IconButton aria-label="Show cart items" color={'inherit'}>
                <Badge badgeContent={2} color={'secondary'}>
                    <ShoppingCart />
                </Badge>
            </IconButton>
        </div>
    </Toolbar>
</AppBar>
        </>
    );
}

export default Navbar;