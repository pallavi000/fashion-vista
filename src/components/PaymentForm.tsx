import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Button, Card } from "@mui/material";
import { AppState, useAppDispatch } from "../redux/store";
import { emptyCart } from "../redux/reducers/cartReducer";
import { addOrder } from "../redux/reducers/orderReducer";
import { useSelector } from "react-redux";
import { TOrder } from "../@types/order";
import { getOrderDate, getOrderId } from "../utils/helper";

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
  const dispatch = useAppDispatch();

  const cart = useSelector((state: AppState) => state.cart);
  const { items } = cart;

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const { error } = await elements.submit();
    if (!error) {
      const orderData: TOrder = {
        orderId: getOrderId(),
        total: cart.totalPrice,
        orderDate: getOrderDate(),
        paymentMethod: "COD",
        deliveryStatus: "Completed",
        items: items,
      };
      dispatch(addOrder(orderData));
      dispatch(emptyCart());
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
