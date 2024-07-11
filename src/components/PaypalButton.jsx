import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

const PaypalButton = ({ cartTotal, clearCart }) => {
  const navigate = useNavigate();
  const initialOptions = {
    clientId: process.env.REACT_APP_PAYPAL_SECRET,
    currency: "USD",
    intent: "capture",
  };
  console.log(cartTotal); //the value here is the updated one
  const onCreateOrder = (data, actions) => {
    console.log(cartTotal); //the value here is the initial value
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: cartTotal,
          },
        },
      ],
    });
  };

  const onApproveOrder = (data, actions) => {
    return actions.order.capture().then((details) => {
      clearCart();
      navigate("/");
    });
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        fundingSource="paypal"
        createOrder={(data, actions) => onCreateOrder(data, actions)}
        onApprove={(data, actions) => onApproveOrder(data, actions)}
        forceReRender={[cartTotal]}
      />
    </PayPalScriptProvider>
  );
};

export default PaypalButton;
