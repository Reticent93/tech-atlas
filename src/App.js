import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Products, Navbar, Cart, Checkout } from './components'
import { commerce } from "./lib/commerce";


const App = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState({
    })


    const fetchProducts = () => {
        commerce.products.list().then((products) => {
            setProducts(products.data)
        }).catch((err) => console.error(err))
    }
    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve())

    }

    const AddToCart = async (productId, quantity) => {
        const {cart} = await commerce.cart.add(productId, quantity)
        setCart(cart)
    }
    const handleCart = async (productId, quantity) => {
        const {cart} = await commerce.cart.update(productId, {quantity})
        setCart(cart)
    }

    const deleteCart = async (productId) => {
        const {cart} = await commerce.cart.remove(productId)
        setCart(cart)
    }

    const handleEmptyCart = async () => {
        const {cart} = commerce.cart.empty()
        setCart(cart)
    }

    useEffect(() => {
        fetchProducts()
        fetchCart()

    }, []);
    // console.log('cart', cart)


    return (
        <Router>
            <div>
                <Navbar totalItems={cart.total_items}/>
                <Switch>
                    <Route exact path='/'>
                        <Products products={products} onAddToCart={AddToCart}/>
                    </Route>
                    <Route exact path='/cart'>
                        <Cart cart={cart} handleCart={handleCart} deleteCart={deleteCart} handleEmptyCart={handleEmptyCart}/>
                    </Route>
                    <Route exact path="/checkout" >
                        <Checkout cart={cart} />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
