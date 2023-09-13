import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "./mongodb"

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: process.env.SESSIONDURATION * 24 * 60 * 60,
  },
  jwt: {},
}