"use client";
import { Button } from "@/components/ui/button";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

const PaymentSuccess = () => {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");

  return (
    <>
      <div className="container space-y-5 mt-10">
        <div className="text-6xl">You payed ${Number(amount) / 100}</div>

        <Button>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </>
  );
};

export default PaymentSuccess;
