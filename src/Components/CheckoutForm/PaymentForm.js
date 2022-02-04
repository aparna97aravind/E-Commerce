import React from 'react'
import { Typography,Button,Divider } from '@material-ui/core'
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'
import Review from './Review';
import useStyle from './Styles'

const PaymentForm = ({checkoutToken, backStep, nextStep}) => {
const classes = useStyle();
const stripePromise=(loadStripe(''));
const handleSubmit = async () => {
  nextStep();
}
  return (
    <>
    <Review checkoutToken={checkoutToken}/>
    <Divider/>
    <Typography variant="h6"  style={{ margin: '20px 0' }}>Payment method</Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>{() => (
          <form onSubmit={handleSubmit}>
            <CardElement/>
            <br />
            <div className={classes.spacing}>
              <Button variant="outlined" onClick={backStep}>Back</Button>
              <Button type="submit" variant="contained" color="primary">
                Pay {checkoutToken.live.subtotal.formatted_with_symbol}
              </Button>
            </div>
          </form>
        )}
        </ElementsConsumer>
      </Elements>
    </>
  )
}

export default PaymentForm;
