import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, Button } from '@material-ui/core'
import useStyles from './Styles';

const CartItem = ({ item, onhandleItemRemove, onhandleCartItemQuantity}) => {
  const classes = useStyles();

  return (
    <Card>
      <CardMedia className={classes.media} image={item.image.url} alt={item.name}/>

      <CardContent className={classes.CardContent}>
        <Typography variant="h4" >{item.name}</Typography>
        <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>
      </CardContent>

      <CardActions className={classes.CardActions}>
        <span className={classes.buttons}>
          <Button type="button" size="small" onClick= {() => onhandleCartItemQuantity(item.id, item.quantity - 1)}>-</Button>
          <Typography variant ='h5'>{item.quantity}</Typography>
          <Button type="button" size="small" onClick= {() => onhandleCartItemQuantity(item.id, item.quantity + 1)}>+</Button>
        </span>
        <span> <Button className ={classes.btns} type="button" variant= "contained" size="large" color="primary" onClick= {() => onhandleItemRemove(item.id)}>REMOVE</Button></span>
      </CardActions>

    </Card>
  )
}

export default CartItem
