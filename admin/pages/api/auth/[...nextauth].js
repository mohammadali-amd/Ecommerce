import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from "next-auth/providers/github";
// import CredentialsProvider from "next-auth/providers/credentials";

import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/mongodb"

export default NextAuth({
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
});