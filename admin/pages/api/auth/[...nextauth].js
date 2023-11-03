import NextAuth, { getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from "next-auth/providers/github";
// import CredentialsProvider from "next-auth/providers/credentials";

import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/mongodb"

const adminEmail = ['amidi1380@gmail.com'];

export const authOption = {
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_ID,
         clientSecret: process.env.GOOGLE_SECRET,
      }),
      GitHubProvider({
         clientId: process.env.GITHUB_ID,
         clientSecret: process.env.GITHUB_SECRET
      }),
      // CredentialsProvider({
      //    name: "Credentials",
      //    credentials: {
      //       username: { label: "Username", type: "text", placeholder: "ali" },
      //       password: { label: "Password", type: "password", placeholder: "1234" }
      //    },
      //    async authorize(credentials) {
      //       const user = { id: "15", name: "ali", password: "1234" }
      //       if (credentials?.username === user.name && credentials?.password === user.password) {
      //          return user
      //       } else {
      //          return null
      //       }
      //    }
      // }),
   ],
   adapter: MongoDBAdapter(clientPromise),
   callbacks: {
      session: ({ session, token, user }) => {
         if (adminEmail.includes(session?.user?.email)) {
            return session;
         } else {
            return false;
         }
      }
   }
}

export default NextAuth(authOption);

export async function isAdminRequest(req, res) {
   const session = await getServerSession(req, res, authOption);
   if (!adminEmail.includes(session?.user?.email)) {
      res.status(401);
      res.end();
      throw 'Not an admin!';
   }
}