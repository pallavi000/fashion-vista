import React from "react";
import PaymentForm from "../PaymentForm";

//MUI
import { Box } from "@mui/material";
import { TPaymentMethodData } from "../../@types/order";

type PaymentStepProps = { handleSubmit: (data: TPaymentMethodData) => void };

function PaymentStep({ handleSubmit }: PaymentStepProps) {
  return (
    <Box>
      <PaymentForm handleSubmit={handleSubmit} />
    </Box>
  );
}

export default PaymentStep;
