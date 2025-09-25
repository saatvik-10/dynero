import GoogleProvider from "next-auth/providers/google";
import { db } from "@/app/db";
import { Keypair } from "@solana/web3.js";
import { Session } from "next-auth";
import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.PRIVATE_KEY_ENCRYPTION_KEY!;
const IV_LENGTH = 12;

export interface customSession extends Session {
    user: {
        email: string;
        name: string;
        image: string;
        uid: string;
    };
}

export function encryptPrivateKey(privateKey: string) {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
    let encrypted = cipher.update(privateKey, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const tag = cipher.getAuthTag().toString('hex');
    return `${iv.toString('hex')}:${tag}:${encrypted}`;
}

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET!,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        session: ({ session, token }: any): customSession => {
            const newSession: customSession = session as customSession;
            if (newSession.user && token.uid) {
                // @ts-ignore
                newSession.user.uid = token.uid ?? "";
            }
            return newSession!;
        },
        async jwt({ token, account, profile }: any) {
            const user = await db.user.findFirst({
                where: {
                    sub: account?.providerAccountId ?? "",
                },
            });
            if (user) {
                token.uid = user.id;
            }
            return token;
        },
        async signIn({ user, account, profile }: any) {
            if (account?.provider === "google") {
                const email = user.email;
                if (!email) {
                    return false;
                }

                const userDb = await db.user.findFirst({
                    where: {
                        username: email,
                    },
                });

                if (userDb) {
                    return true;
                }

                const keypair = Keypair.generate();
                const publicKey = keypair.publicKey.toBase58();
                const privateKey = encryptPrivateKey(keypair.secretKey.toString());

                await db.user.create({
                    data: {
                        username: email,
                        name: profile?.name,
                        //@ts-ignore
                        profilePicture: profile?.picture,
                        provider: "Google",
                        sub: account.providerAccountId,
                        solanaWallet: {
                            create: {
                                pubkey: publicKey,
                                privateKey: privateKey,
                            },
                        },
                        inrWallet: {
                            create: {
                                balance: 0,
                            },
                        },
                    },
                });

                return true;
            }

            return false;
        },
    },
};
