import React, { useState, useEffect } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'

import useStyle from './styles'
import AdressForm from '../AdressForm'
import PaymentForm from '../PaymentForm'
import { commerce } from '../../../lib/commerce'

const steps = ['Shipping adress', 'Payment details']

const checkout = ({ cart, order, onCaptureCheckout, error }) => {
    const classes = useStyle();
    const history = useHistory();
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        if (cart.id) {
            const generateToken = async () => {
                try {
                    const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
                    setCheckoutToken(token);
                } catch (error) {
                    if (activeStep !== steps.length)
                        history.push('/');
                }
            }
            generateToken();
        }
    }, [cart]);

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const next = (data) => {

        setShippingData(data);

        nextStep();
    }

    const Form = () => activeStep === 0 ? <AdressForm checkoutToken={checkoutToken} next={next} setShippingData={setShippingData} /> :
        <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} next={nextStep} onCaptureCheckout={onCaptureCheckout} timeout={timeout} />

    const timeout = () => {
        setTimeout(() => {
            setIsFinished(true)
        }, 3000);
    }

    let Confirmation = () => order.customer ? (
        <div>
            <div>
                <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}</Typography>
                <Divider className={classes.divider}></Divider>
                <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
                <br></br>
                <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button>
            </div>
        </div>

    ) : isFinished ? (
        <div>
            <div>
                <Typography variant="h5">Thank you for your purchase</Typography>
                <Divider className={classes.divider}></Divider>
                <br></br>
                <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button>
            </div>
        </div>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress></CircularProgress>
        </div>
    );

    // if (error) {
    //     Confirmation = () => (
    //         <div>
    //             <Typography variant="h5">Error: {error}</Typography>
    //             <br />
    //             <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
    //         </div>
    //     );
    // }

    return (
        <div>
            <CssBaseline></CssBaseline>
            <div className={classes.toolbar}></div>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>
                                    {step}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation></Confirmation> : checkoutToken && <Form></Form>}
                </Paper>
            </main>
        </div>
    )
}

export default checkout
