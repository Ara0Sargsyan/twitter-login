import NextAuth from "next-auth"
import TwitterProvider from "next-auth/providers/twitter"

export default NextAuth({
    providers: [
        TwitterProvider({
            clientId: process.env.TWITTER_ID,
            clientSecret: process.env.TWITTER_SECRET
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token['credentials'] = {
                    authToken: account.oauth_token,
                    authSecret: account.oauth_token_secret,
                }
            }
            return token
        },
        async session({ session }) {
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        error: '/error',
    }
})
