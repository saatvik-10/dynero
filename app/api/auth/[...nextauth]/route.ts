import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

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
                if (!email) return false;
            }
            console.log({ user, account, profile })
            return true
        }
    }
})

// const handler = NextAuth(authOptions)

export { handler as GET, handler as POST } 