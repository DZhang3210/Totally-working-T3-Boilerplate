"use server";

import SampleEmail from "@/email/SampleEmail";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SafeParseError, z } from "zod";

const getSchema = z.object({
  title: z
    .string({ message: "Title is required" })
    .min(4, "Title must be at least 4 characters long"), // Ensures a title is provided
  desc: z
    .string({ message: "Desc is required" })
    .min(4, "Description must be at least 4 characters long"),
  price: z.coerce
    .number({ message: "Price must be a number" })
    .int({ message: "price must be an integer" })
    .min(1, "price must be at least 1 cent"),
  productImage: z.string({ message: "profileImage is required" }),
  tags: z
    .record(z.boolean())
    .refine((tags) => Object.keys(tags).every((tag) => tag.length > 1), {
      message: "Each tag must have more than 1 character",
    }),
});

export const addProduct = async (prevState: unknown, formData: FormData) => {
  const session = await getServerSession(authOptions);
  if (!session) return notFound();
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email as string },
  });
  if (!user) return notFound();

  // Convert FormData to a plain object
  const unvalidatedData = {
    title: formData.get("title") as string,
    desc: formData.get("desc") as string,
    price: formData.get("price") as string,
    productImage: formData.get("productImage") as string,
    tags: JSON.parse(formData.get("tags") as string),
  };
  console.log("Tags", unvalidatedData.tags);

  // Validate data against the schema
  const result = getSchema.safeParse(unvalidatedData);

  // Check if validation succeeded
  if (result.success === false) {
    console.log("Failed", result.error.formErrors.fieldErrors);
    return result.error.formErrors.fieldErrors;
  }

  // Data is valid; proceed to create a new blog post
  try {
    revalidatePath("/");
  } catch (error) {
    console.error("Error creating Product:", error);
  }

  const emailProduct = {
    name: unvalidatedData.title,
    description: unvalidatedData.desc,
    price: Number(unvalidatedData.price),
  };
  const resend = new Resend(process.env.RESEND_API_KEY as string);
  await resend.emails.send({
    from: `Support <${process.env.SENDER_EMAIL}>`,
    to: user?.email,
    subject: "Order Confirmation",
    react: SampleEmail(),
  });

  redirect("/");
};

export async function deleteProduct({ id }: { id: string }) {
  revalidatePath("/");
  redirect("/");
}

const editSchema = z.object({
  title: z
    .string({ message: "Title is required" })
    .min(4, "Title must be at least 4 characters long"), // Ensures a title is provided
  desc: z
    .string({ message: "Desc is required" })
    .min(4, "Description must be at least 4 characters long"),
  price: z.coerce
    .number({ message: "Price must be a number" })
    .int({ message: "price must be an integer" })
    .min(1, "price must be at least 1 cent"),
  id: z.string({ message: "id must be known" }),
  productImage: z
    .string({ message: "profileImage is required" })
    .min(1, "Profile image must be set"),
  tags: z
    .record(z.boolean())
    .refine((tags) => Object.keys(tags).every((tag) => tag.length > 1), {
      message: "Each tag must have more than 1 character",
    }),
});
export async function editProduct(
  prevState: { [key: string]: string[] } | undefined,
  formData: FormData
) {
  // Convert FormData to a plain object
  const unvalidatedData = {
    title: formData.get("title") as string,
    desc: formData.get("desc") as string,
    price: formData.get("price") as string,
    id: formData.get("id") as string,
    productImage: formData.get("productImage") as string,
    tags: JSON.parse(formData.get("tags") as string),
  };
  // Validate data against the schema
  const result = editSchema.safeParse(unvalidatedData);
  // Check if validation succeeded
  if (result.success === false) {
    console.log("Failure to parse, zod errros");
    return result.error.formErrors.fieldErrors;
  }
  // Data is valid; proceed to create a new blog post
  try {
    revalidatePath("/");
  } catch (error) {
    console.error("Error updating Product:", error);
  }
  redirect("/");
}
