import React from 'react'
import { Container, Typography, Button, Grid} from '@material-ui/core'
import useStyles from './Styles'
import CartItem from './CartItem/CartItem'
import {Link} from 'react-router-dom'

const Cart = ({ cart, handleEmptyCart, handleItemRemove, handleCartItemQuantity }) => {
  const classes = useStyles();

  const Emptycart = () => (
    <Typography variant = "subtitle1"> Hey! Your shopping cart is empty!
      <div>
        <Link to='/' className={classes.link} >Add Items</Link>
      </div>
     </Typography>
  )

  const Filledcart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItem item= {item} onhandleItemRemove= {handleItemRemove} onhandleCartItemQuantity= {handleCartItemQuantity}/>
          </Grid>
        ))}
      </Grid>

      <div className={classes.title}>
            <Typography variant = "h3"> Subtotal : {cart.subtotal.formatted_with_symbol}</Typography>
            <div className={classes.toolbar}/>


          <div align="center">

            <Button className={classes.emptyButton} type="button" variant= "contained" size="large" onClick= {() => handleEmptyCart()} >EMPTY CART</Button>
            <Button component={Link} to='/checkout' className= {classes.checkoutButton} type="button" variant= "contained" size="large" color="primary" >CHECKOUT</Button>
          </div>
      </div>
    </>
  )
  if(!cart.line_items) return ("Loading! Please Wait")
  return (
    <Container>
      <div  className={classes.toolbar}/>
      <Typography className = {classes.title}  variant = "h5">YOUR SHOPPING CART</Typography>
      <div className={classes.toolbar}/>
      {!cart.line_items.length ? <Emptycart/> : <Filledcart/> }
    </Container>
  )
}

export default Cart
