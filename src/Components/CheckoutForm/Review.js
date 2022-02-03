import React from 'react'
import { Typography,List, ListItem,ListItemText } from '@material-ui/core'
import useStyle from './Styles'


const Review = ({checkoutToken}) => {
  // console.log('----------', checkoutToken);
  const classes = useStyle();
  return (
    <>
    <Typography variant="h6">Order Summary</Typography>
    <List>
      {checkoutToken.live.line_items.map((product) => (
        <ListItem className={classes.spacingList}  key={product.name}>
          <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`} />
          <Typography variant="h6">{product.line_total.formatted_with_symbol}</Typography>
        </ListItem>
      ))}
      <ListItem className={classes.spacingList} >
        <ListItemText primary="Total Amount" />
        <Typography variant="h6" className={classes.listfont} >
          {checkoutToken.live.subtotal.formatted_with_symbol}
        </Typography>
      </ListItem>
    </List>
  </>
  )
}

export default Review;
