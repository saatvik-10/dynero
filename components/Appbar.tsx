"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { toast } from "sonner";

const Appbar = () => {
  const session = useSession();

  const handleSignIn = async () => {
    try {
      await signIn("google");
    } catch (err: any) {
      toast.error("Error signing in", err);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
    } catch (err: any) {
      toast.error("Error signing out", err);
    }
  };

  return (
    <div className="m-6 flex max-w-7xl flex-row items-center justify-between rounded-md border-none p-4 shadow-lg bg-white">
      <div className="text-lg font-bold">DYNERO</div>

      <div>
        {session?.data?.user ? (
          <Button
            className="cursor-pointer bg-red-500 hover:bg-red-500/80"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        ) : (
          <Button
            className="cursor-pointer bg-blue-500 hover:bg-blue-500/80"
            onClick={handleSignIn}
          >
            Sign In
          </Button>
        )}
      </div>
    </div>
  );
};

export default Appbar;
