import React from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography  } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'
import FormInput from './FormInput';
import { useState, useEffect } from 'react';
import { commerce } from '../../lib/Commerce';
import {Link} from "react-router-dom"
import useStyles from './Styles'

const AddressForm = ({checkoutToken, proceed}) => {

  const [shippingCountries,setShippingCountries]= useState([]);
  const [shippingCountry,setShippingCountry]= useState('');
  const [shippingSubdivisions,setShippingSubdivisions]= useState([]);
  const [shippingSubdivision,setShippingSubdivision]= useState('');
  const [shippingOptions,setShippingOptions]= useState([]);
  const [shippingOption,setShippingOption]= useState('');

  const methods = useForm();
  const classes =useStyles();

  const handleShippingCountries = async (checkoutTokenId) => {
      const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
      setShippingCountries(countries);
      setShippingCountry(Object.keys(countries)[0]);
  }

  const handleShippingSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const handleShippingOptions = async(checkoutTokenId, country, region) => {
      const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, region});
      setShippingOptions(options);
      setShippingOption(options[0].id);
  };

    useEffect(() => {
      handleShippingCountries(checkoutToken.id);
    },[])

    useEffect(() => {
      if (shippingCountry) handleShippingSubdivisions(shippingCountry);
    }, [shippingCountry]);

    useEffect(() => {
      if (shippingSubdivision) handleShippingOptions( checkoutToken.id, shippingCountry ,shippingSubdivision);
    }, [shippingSubdivision]);

  return (
    <>
    <Typography variant = 'h6' align="center" >SHIPPING ADDRESS</Typography>
    <FormProvider {...methods}>
    <form onSubmit={methods.handleSubmit((data) => proceed({ ...data, shippingCountry, shippingSubdivision, shippingOption }))}>
        <Grid container spacing={7} >

          <FormInput name='first name' label='First Name' />
          <FormInput name='last name' label='LastName' />
          <FormInput name='address' label='Address' />
          <FormInput name='email' label='Email' />
          <FormInput name='city' label='City' />
          <FormInput name='PIN' label='Postal Code' />

          <Grid item xs={12} sm={6}>
            <InputLabel>Shipping Country</InputLabel>
            <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
            {shippingCountry ?
             Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name })).map((item) =>
             ( <MenuItem key={item.id} value={item.id}> {item.label} </MenuItem> ))
              : null} </Select>
          </Grid>

          <Grid item xs={12} sm={6}>
          <InputLabel>Shipping Subdivision</InputLabel>
            <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
              {Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs={12} sm={6}>
          <InputLabel>Shipping Options</InputLabel>
            <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
              {shippingOptions.map((shippingOp) => ({ id: shippingOp.id, label: `${shippingOp.description} - (${shippingOp.price.formatted_with_symbol})` })).map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>

        </Grid>
        <br/>
        <div className={classes.spacing}>
          <Button component={Link} to="/cart" variant="outlined" >BACK TO CART</Button>
          <Button type="submit" variant="contained" color="primary">PROCEED TO PAYMENT</Button>
        </div>
      </form>
    </FormProvider>
    </>
  )
}

export default AddressForm;
