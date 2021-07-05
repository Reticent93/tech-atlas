import { useEffect, useState } from "react";
import { Products, Navbar } from './components'
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
        <div>
            <Navbar/>
            <Products products={products} onAddToCart={AddToCart}/>
        </div>
    );
}

export default App;
