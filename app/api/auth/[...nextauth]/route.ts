import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { db } from "@/app/db"

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    callbacks: {
        //@ts-ignore
        async signIn({ user, account, profile }) {
            if (account?.provier != 'google') {
                const email = user.email
                if (!email) {
                    return false
                }

                const userDB = await db.user.findFirst({
                    where: {
                        username: email
                    }
                })

                if (userDB) return true

                await db.user.create({
                    data: {
                        username: email,
                        provider: "Google",
                        solanaWallet: {
                            create: {
                                pubkey: "",
                                privateKey: ""
                            }
                        },
                        inrWallet: {
                            create: {
                                balance: 0
                            }
                        }
                    }
                })
            }
        }
    }
})

// const handler = NextAuth(authOptions)

export { handler as GET, handler as POST } 