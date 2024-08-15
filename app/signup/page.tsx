"use client";

import { Button } from "@/components/ui/button";
import { GithubIcon, KeySquare, SearchCheck } from "lucide-react";
import Github from "next-auth/providers/github";
import { signIn } from "next-auth/react";
import React from "react";

const page = () => {
  return (
    <div className="container flex justify-center items-center">
      <div className="flex flex-col gap-5 justify-start py-10 px-10 rounded-xl border-4 bg-white">
        <div>
          <h1 className="text-5xl mt-6 mb-2 flex gap-4 items-center">
            <span>Sign in</span>
            <KeySquare size={45} />
          </h1>
          <hr className="mb-5 h-[2px] border-black border-3" />
        </div>
        <Button
          onClick={() => signIn("google")}
          className="flex gap-2 px-20 transition hover:bg-white hover:text-black border-2 hover:border-black"
        >
          <SearchCheck />
          <span className="text-xl">Sign in With Google</span>
        </Button>
        <div className="flex items-center">
          <hr className="flex-grow h-[2px] border-t border-gray-300" />
          <span className="mx-2 text-xl">OR</span>
          <hr className="flex-grow h-[2px] border-t border-gray-300" />
        </div>
        <Button
          onClick={() => signIn("github")}
          className="flex gap-2 px-20 transition hover:bg-white hover:text-black border-2 hover:border-black"
        >
          <GithubIcon />
          <span className="text-xl">Sign in With Github</span>
        </Button>
      </div>
    </div>
  );
};

export default page;
