import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Products, Navbar, Cart } from './components'
import { commerce } from "./lib/commerce";


const App = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState({})


    const fetchProducts = () => {
        commerce.products.list().then((products) => {
            setProducts(products.data)
        }).catch((err) => console.error(err))
    }
    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve())

    }

    const AddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity)
        setCart(item.cart)
    }

    useEffect(() => {
        fetchProducts()
        fetchCart()

    }, []);
    console.log('cart', cart)


    return (
        <Router>
            <div>
                <Navbar totalItems={cart.total_items}/>
                <Switch>
                    <Route exact path='/'>
                        <Products products={products} onAddToCart={AddToCart}/>
                    </Route>
                    <Route>
                        <Cart exact path='/cart' cart={cart}/>
                    </Route>
                </Switch>

            </div>
        </Router>
    );
}

export default App;
