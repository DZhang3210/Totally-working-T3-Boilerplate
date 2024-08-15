import { authOptions } from "@/lib/authOptions";
import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
