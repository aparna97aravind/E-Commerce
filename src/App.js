import React, {useState, useEffect} from 'react';
import { commerce } from './lib/Commerce'
import { Products, Navbar, Cart, Checkout } from "./Components";
import { BrowserRouter as Router, Switch , Route} from 'react-router-dom';

const App = () => {
  const [products, setProducts] =useState([]);
  const [cart,setCart] = useState({});


  const fetchProducts = async () => {
    const {data} = await commerce.products.list();
    setProducts(data);
  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  }

  const handleAddToCart = async(productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);
    setCart(cart);
  }

  const handleCartItemQuantity = async(productId, quantity) => {
    const { cart }  = await commerce.cart.update(productId, { quantity});
    setCart(cart);
  }

  const handleItemRemove= async(productId) => {
    const { cart }  = await commerce.cart.remove(productId);
    setCart(cart);
  }

  const handleEmptyCart = async() => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  }

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  },[]);

  // console.log('here comes', cart);
  return (
    <Router>
          <Navbar totalItems = {cart.total_items}/>
          <Switch>
            <Route exact path='/'>
              <Products products = {products} onAddToCart = {handleAddToCart}/>
            </Route>
            <Route  exact path='/cart'>
                <Cart cart={cart}
                  handleEmptyCart = {handleEmptyCart}
                  handleItemRemove={handleItemRemove}
                  handleCartItemQuantity = {handleCartItemQuantity}/>
            </Route>
            <Route exact path = '/checkout'>
                <Checkout cart={cart} refreshCart={refreshCart}/>
            </Route>
          </Switch>
    </Router>
  );
}

export default App;
