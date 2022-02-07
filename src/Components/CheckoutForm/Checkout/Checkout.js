import React, {useState, useEffect} from 'react'

import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline} from '@material-ui/core';

import useStyles from './Styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/Commerce';
import {Link} from 'react-router-dom'

const steps = ['Shipping Address', 'Payment Details'];


const Checkout = ({ cart, refreshCart }) => {
  const classes = useStyles();
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});

  useEffect(() => {
      const generateToken = async () => {
        try {
          const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
          setCheckoutToken(token);
        }
         catch(error) {
          console.log('Error');
        }}

      generateToken();
  }, [cart]);

  const nextStep = () =>  setActiveStep((prevActiveStep) => prevActiveStep + 1) ;
  const backStep = () =>  setActiveStep((prevActiveStep) => prevActiveStep - 1) ;

  const proceedToPay = (data) => {
    setShippingData(data);
    nextStep();
  }

  let Confirmation = () => (activeStep === 2 ? (
    <>
      <div>
        <Typography variant="h5" align="center"> Thank you for your purchase!</Typography>
        <Divider className={classes.divider} />
      </div>
      <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
    </>
  ) : (
    <div className={classes.spinner}>
      <CircularProgress />
    </div>
  ));


  const Form = () => activeStep === 0 ?
 <AddressForm checkoutToken = {checkoutToken} proceed={proceedToPay}/>
  : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} nextStep={nextStep} refreshCart={refreshCart}/>

  return (
    <>
    <CssBaseline>
      <div className={classes.toolbar}>
        <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant='h4'align="center">CHECKOUT ITEMS</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation/> : checkoutToken && <Form/> }
        </Paper>
        </main>
      </div>
    </CssBaseline>
    </>
  )
}

export default Checkout;
