import React from 'react'
import { Typography,Button,Divider } from '@material-ui/core'
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'
import Review from './Review';
import useStyle from './Styles'


const PaymentForm = ({checkoutToken, backStep, nextStep, handleCheckout, refreshCart}) => {
const classes = useStyle();
const stripePromise= loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);


const handleSubmit = async (event, elements, stripe) => {
  event.preventDefault();
  if(!stripe || !elements) return;

  const cardElement = elements.getElement(CardElement);
  const {error } = await stripe.createPaymentMethod({type: 'card', card: cardElement });
  if(error) console.log(error);
  else {
  refreshCart();
  nextStep();
  }
 }
  return (
    <>
    <Review checkoutToken={checkoutToken}/>
    <Divider/>
    <Typography variant="h6"  style={{ margin: '20px 0' }}>Payment method</Typography>
      <Elements stripe={stripePromise}>

        <ElementsConsumer>
          {({elements, stripe}) => (
          <form onSubmit={(e) => handleSubmit(e, elements,stripe)}>
            <CardElement/>
            <br />
            <div className={classes.spacing}>
              <Button variant="outlined" onClick={backStep}>Back</Button>
              <Button type="submit" variant="contained" disabled= {!stripe} color="primary">
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
