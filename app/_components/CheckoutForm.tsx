"use client";
import { createPaymentIntent } from "@/app/_actions/createPaymentIntent";
import { Button } from "@/components/ui/button";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import {
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

// export const CheckoutForm = () => {
//   return (
//     <Form/>
//   )
// }

type CheckoutFormProps = {
  product: {
    id: string;
    title: string;
    desc: string;
    pricePaidInCents: number;
    createdAt: Date;
    updatedAt: Date;
    ownerID: string | null;
  };
  userID: string;
};

export function CheckoutForm({ product, userID }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const { data: session, status } = useSession();

  useEffect(() => {
    const createClientSecret = async () => {
      const clientSecret = (
        await createPaymentIntent({
          productID: product.id,
          userID: userID,
          amount: product.pricePaidInCents,
        })
      )?.clientSecret;
      console.log(clientSecret);
      setClientSecret(clientSecret);
    };
    createClientSecret();
  }, [product.pricePaidInCents]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit(); //primarily for verification

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    if (!clientSecret) {
      setErrorMessage(
        "Payment could not be processed at the moment. Please try again later."
      );
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://www.localhost:3000/payment-success?amount=${product.pricePaidInCents}`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-10">
      <PaymentElement />
      <LinkAuthenticationElement />
      <Button className="mt-5 w-full">Submit Payment</Button>
    </form>
  );
}
