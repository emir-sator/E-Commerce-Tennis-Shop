import React, { useState, useEffect } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'
import FormInput from './CustomTextField'
import { commerce } from '../../lib/commerce'

const AdressForm = ({ checkoutToken }) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');

    const fetchShippingCountries = async (checkoutTokenId) => {
        const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId);

        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    }

    const methods = useForm();

    const countries= Object.entries(shippingCountries).map(([code,name]) =>({id:code,label:name}));

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id);
    }, []);
    return (
        <div>
            <Typography variant="h6" gutterBottom>Shipping adress</Typography>
            <FormProvider {...methods}>
                <form onSubmit=''>
                    <Grid container spacing={3}>
                        <FormInput required name='firstName' label='First name'></FormInput>
                        <FormInput required name='laststName' label='Last name'></FormInput>
                        <FormInput required name='adress1' label='Adress'></FormInput>
                        <FormInput required name='email' label='Email'></FormInput>
                        <FormInput required name='city' label='City'></FormInput>
                        <FormInput required name='zip' label='ZIP/Postal code'></FormInput>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping country:</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e)=>setShippingCountry(e.target.value)}>
                              {countries.map((country)=>(
                                <MenuItem key={country.id} value={country.id}>
                                    {country.label}
                                </MenuItem>
                              ))}
                                
                            </Select>
                        </Grid>
                        {/* <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping subdivisions:</InputLabel>
                            <Select value={ } fullWidth onChange={ }>
                                <MenuItem key={ } value={ }>
                                    Select me
                                </MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping options:</InputLabel>
                            <Select value={ } fullWidth onChange={ }>
                                <MenuItem key={ } value={ }>
                                    Select me
                                </MenuItem>
                            </Select>
                        </Grid> */}
                    </Grid>
                </form>
            </FormProvider>
        </div>
    )
}

export default AdressForm
