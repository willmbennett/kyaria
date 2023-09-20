import { authOptions } from "../../../../lib/auth";
import NextAuth from "next-auth";

export const AuthOptions = NextAuth(authOptions);

export {AuthOptions as GET, AuthOptions as POST}