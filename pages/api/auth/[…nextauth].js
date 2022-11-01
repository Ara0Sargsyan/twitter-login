import NextAuth from 'next-auth';
import TwitterProvider from "next-auth/providers/twitter"

export default NextAuth({
  providers: [
    TwitterProvider({
      clientId: "0xP0bBtLY8zsDFwQsV2WR6FW7",
      clientSecret: "0cISuZffiMHILEyWoNpTt2NnAbpDAEQFJZ3FueJP28VUmG9aWJ"
    })
  ]
});