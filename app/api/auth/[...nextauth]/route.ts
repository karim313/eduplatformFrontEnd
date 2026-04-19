import { LoginFail, LoginSuccess } from "@/app/_interface"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { email } from "zod"
const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials) {
                const response = await fetch("https://educational-platform-api2-production-c85a.up.railway.app/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    })
                })
                const payload: LoginSuccess | LoginFail = await response.json()
                console.log(payload);
                if ('token' in payload) {
                    return {
                        id: payload._id,
                        name: payload.name,
                        email: payload.email,
                        role: payload.role,
                        token: payload.token
                    }

                } else {
                    throw new Error(payload.message)
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.role = user.role;
                token.token = user.token;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.name = token.name as string;
                session.user.email = token.email as string;
                session.user.role = token.role as string;
                session.user.token = token.token as string;
            }
            return session;
        }
    },
    pages: {
        signIn: "/signin",
        error: "/signin"
    },
    secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }