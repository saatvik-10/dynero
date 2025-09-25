import { getAssociatedTokenAddress, getAccount } from "@solana/spl-token";
import { Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { connection } from "./constants";
import crypto from "crypto";

const ENCRYPTION_KEY = process.env.PRIVATE_KEY_ENCRYPTION_KEY!;

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

export function decryptPrivateKey(encrypted: string): string {
  const [ivHex, tagHex, encryptedHex] = encrypted.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const tag = Buffer.from(tagHex, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
  decipher.setAuthTag(tag);
  let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

export function getPrivateKey(encrypted: string) {
  const decrypted = decryptPrivateKey(encrypted);
  const arr = decrypted.split(",").map(num => Number(num));
  const privateKeyUIntArray = Uint8Array.from(arr);
  return Keypair.fromSecretKey(privateKeyUIntArray);
}