import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from "@material-ui/core";
import useStyles from './styles'
import { useEffect, useState } from "react";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import {commerce } from '../../../lib/commerce';

const steps = ['Shipping address', 'Payment details']

const Checkout = ({cart}) => {
    const classes = useStyles()
    const [activeStep, setActiveStep] = useState(0)
    const [checkoutToken, setCheckoutToken] = useState(null)

    const Form = () => (activeStep === 0
        ? <AddressForm checkoutToken={checkoutToken} />
        : <PaymentForm />)

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'})
                console.log(token)
                setCheckoutToken(token)
            }catch (e) {

            }
        }
        generateToken()

    },[])


    const Confirmation = () => (
        <div>
            Confirmation
        </div>
    )


    return (
        <>
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : <Form />}
                </Paper>
            </main>
        </>
    );
}

export default Checkout;