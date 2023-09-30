import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import React from "react";
import AddressForm from "../components/AddressForm";
import PaymentForm from "../components/PaymentForm";
import OrderSuccess from "../components/OrderSuccess";
import { useSelector } from "react-redux";
import { AppState } from "../redux/store";

const steps = ["Shipping Address", "Payment Details"];

function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);

  const cart = useSelector((state: AppState) => state.cart.items);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <Container maxWidth="sm">
      {cart.length ? (
        <Box sx={{ width: "100%" }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
            Checkout
          </Typography>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <OrderSuccess />
          ) : (
            <Box sx={{ paddingTop: "1.5rem" }}>
              {activeStep === 0 ? (
                <AddressForm handleNext={handleNext} />
              ) : (
                <PaymentForm handleNext={handleNext} />
              )}
            </Box>
          )}
        </Box>
      ) : (
        <Alert severity="error" sx={{ marginTop: "2rem" }}>
          No item added in your shopping cart!
        </Alert>
      )}
    </Container>
  );
}

export default Checkout;
