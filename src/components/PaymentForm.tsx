import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Button, Card } from "@mui/material";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

function PaymentForm({ handleNext }: { handleNext: Function }) {
  const options: StripeElementsOptions = {
    mode: "payment",
    amount: 1099,
    currency: "usd",
    appearance: {},
    loader: "auto",
  };
  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentHandler handleNext={handleNext} />
    </Elements>
  );
}

function PaymentHandler({ handleNext }: { handleNext: Function }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const { error } = await elements.submit();
    if (!error) {
      handleNext();
    }
  };

  return (
    <Card
      sx={{ padding: "1rem", marginTop: "1rem" }}
      component={"form"}
      onSubmit={handleSubmit}
    >
      <PaymentElement />
      <Button
        sx={{ marginTop: "1rem", marginBottom: "1rem" }}
        type="submit"
        variant="contained"
        disabled={!elements}
      >
        Pay & Order
      </Button>
    </Card>
  );
}

export default PaymentForm;
