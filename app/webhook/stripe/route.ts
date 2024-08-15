import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import Stripe from "stripe";
import prisma from "@/lib/db";
import SampleEmail from "@/email/SampleEmail";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const resend = new Resend(process.env.RESEND_API_KEY as string);
export async function POST(req: NextRequest) {
  const event = stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get("stripe-signature") as string,
    process.env.STRIPE_WEBHOOK_SECRET as string
  );
  if (event.type === "charge.succeeded") {
    const charge = event.data.object;
    // console.log("CHARGE", charge);
    const email = charge.billing_details.email;
    const pricePaidInCents = charge.amount;
    if (!email) {
      return new NextResponse();
    }
    const [order, product, user] = await Promise.all([
      prisma.order.create({
        data: {
          pricePaidInCents: pricePaidInCents,
          productId: charge.metadata.productID,
          userId: charge.metadata.userID,
        },
      }),
      prisma.product.findUnique({
        where: { id: charge.metadata.productID },
      }),
      prisma.user.findUnique({
        where: { id: charge.metadata.userID },
      }),
    ]);

    if (!product || !user || !order) {
      return;
    }
    await resend.emails.send({
      from: `Support <${process.env.SENDER_EMAIL}>`,
      to: email,
      subject: "Order Confirmation",
      react: SampleEmail(),
    });
  }
  return new NextResponse();
}
