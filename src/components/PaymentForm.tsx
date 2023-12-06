import React from "react";
import { useNavigate } from "react-router-dom";
// redux
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../redux/store";

// MUI
import { Button, Card } from "@mui/material";

// stripe
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

// reducers
import { emptyCart } from "../redux/reducers/cartReducer";
import { addOrder } from "../redux/reducers/orderReducer";

// types
import { TOrder, TOrderInput, TPaymentMethodData } from "../@types/order";
import { CartState } from "../@types/reduxState";

// helpers
import { getOrderDate, getOrderId } from "../utils/helper";

// context
import { useThemeContext } from "../context/ThemeContext";

// load stripe
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

function PaymentForm({
  handleSubmit,
}: {
  handleSubmit: (data: TPaymentMethodData) => void;
}) {
  // context
  const { theme, themeMode } = useThemeContext();

  // cart items states
  const cart = useSelector((state: AppState) => state.cart);

  // stripe element options
  const options: StripeElementsOptions = {
    mode: "payment",
    amount: cart.totalPrice,
    currency: "usd",
    appearance: {
      theme: themeMode === "dark" ? "night" : "stripe",
      variables: {
        colorPrimary: theme.palette.primary.main,
      },
    },
    loader: "auto",
  };
  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentHandler cart={cart} handleSubmit={handleSubmit} />
    </Elements>
  );
}

function PaymentHandler({
  cart,
  handleSubmit,
}: {
  cart: CartState;
  handleSubmit: (data: TPaymentMethodData) => void;
}) {
  // cart items
  const { items } = cart;

  // stripe hooks
  const stripe = useStripe();
  const elements = useElements();

  // handle payment form submit
  const handlePaymentSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const { error } = await elements.submit();
    if (!error) {
      handleSubmit({
        method: "Credit Card",
        status: "Paid",
      });
    }
  };

  return (
    <Card
      sx={{ padding: "1rem", marginTop: "1rem" }}
      component={"form"}
      onSubmit={handlePaymentSubmit}
    >
      <PaymentElement />
      <Button
        sx={{ marginTop: "1rem", marginBottom: "1rem" }}
        type="submit"
        variant="contained"
        disabled={!elements || !stripe}
      >
        Pay & Order
      </Button>
    </Card>
  );
}

export default PaymentForm;
