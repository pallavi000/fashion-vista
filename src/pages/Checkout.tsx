import {
  Box,
  Button,
  Container,
  Divider,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React from "react";
import AddressForm from "../components/AddressForm";
import PaymentForm from "../components/PaymentForm";

const steps = ["Shipping Address", "Payment Details"];

function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <Container maxWidth="sm">
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
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
            </Box>
          </React.Fragment>
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
    </Container>
  );
}

export default Checkout;
