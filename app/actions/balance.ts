"use server";

import { authOptions, customSession } from "@/lib/auth";
import { db } from "../db";
import { getServerSession } from "next-auth";

export async function getUserWallet() {
  const session = await getServerSession(authOptions);

  const userWallet = await db.solanaWallet.findFirst({
    where: {
      userId: session?.user?.uid,
    },
    select: {
      pubkey: true,
    },
  });

  if (!userWallet) {
    return {
      error: "No solana wallet found!",
    };
  }

  return { error: null, userWallet };
}
