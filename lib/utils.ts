import { getAssociatedTokenAddress, getAccount } from "@solana/spl-token";
import { Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { connection } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getAccountBalance(tk: {
  name: string,
  mint: string,
  native: boolean,
  decimals: number
}, address: string) {
  if (tk.native) {
    let balance = await connection.getBalance(new PublicKey(address));
    console.log("balance is " + balance)
    return balance / LAMPORTS_PER_SOL;
  }

  const ata = await getAssociatedTokenAddress(new PublicKey(tk.mint), new PublicKey(address));

  try {
    const account = await getAccount(connection, ata);
    return Number(account.amount) / (10 ** tk.decimals)
  } catch (err: any) {
    return 0;
  }
}

export function getPrivateKey(privateKey: string) {
  const arr = privateKey.split(",").map(num => Number(num));
  const privateKeyUIntArray = Uint8Array.from(arr);

  const keyPair = Keypair.fromSecretKey(privateKeyUIntArray)

  return keyPair
}