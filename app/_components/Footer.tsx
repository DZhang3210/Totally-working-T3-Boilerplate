// src/components/Footer.tsx
import { CircleDollarSign, Send, SquareUserRound } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container bg-black/20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10">
        <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center items-center py-12 text-3xl font-bold w-full text-center">
          We built our business on customer satisfaction
        </div>
        <div className="flex items-center justify-center flex-col text-2xl gap-2">
          <SquareUserRound size={60} />
          <h1>Sign Up</h1>
          <div className="text-base text-gray-300 text-center max-w-xs">
            Using{" "}
            <Link href="https://next-auth.js.org/" className="font-semibold">
              Next-Auth
            </Link>
            , we allow you to secure your account with different OAuth Providers
          </div>
        </div>
        <div className="flex items-center justify-center flex-col py-20 text-2xl gap-2">
          <CircleDollarSign size={60} />
          <h1>Secure Payment</h1>
          <div className="text-base text-gray-300 text-center max-w-xs">
            Using{" "}
            <Link href="/https://docs.stripe.com/" className="font-semibold">
              Stripe
            </Link>{" "}
            we can ensure all transactions manage to go through smoothly and
            securely
          </div>
        </div>
        <div className="flex items-center justify-center flex-col py-20 text-2xl gap-2">
          <Send size={60} />
          <h1>Stay informed</h1>
          <div className="text-base text-gray-300 text-center max-w-xs">
            Using{" "}
            <Link
              href="https://resend.com/docs/introduction"
              className="font-semibold"
            >
              Resend
            </Link>
            , we make it easy for users and producers to constantly stay
            informed
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Left side of the footer */}
          <div className="text-sm">
            © {new Date().getFullYear()} My Company. All rights reserved.
          </div>

          {/* Right side of the footer (Social Links) */}
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              Facebook
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              Twitter
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Additional Footer Links */}
        <div className="mt-4 text-center">
          <a href="/privacy-policy" className="hover:text-gray-400 text-sm">
            Privacy Policy
          </a>
          <span className="mx-2">|</span>
          <a href="/terms-of-service" className="hover:text-gray-400 text-sm">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
