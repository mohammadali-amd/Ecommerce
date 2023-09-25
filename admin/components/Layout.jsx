import { useSession, signIn } from "next-auth/react";
import Navbar from '@/components/Navbar';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Layout({ children }) {
   const { data: session } = useSession();
   if (!session) {
      return (
         <main
            className={`bg-blue-900 min-h-screen h-56 grid justify-center content-center ${inter.className}`}
         >
            <div className="bg-white grid gap-3 rounded-lg shadow-xl p-16">
               <h2 className="flex gap-2 justify-center text-blue-900 text-xl font-semibold mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                  </svg>
                  Sign in
               </h2>
               <button onClick={() => signIn('google')} className="rounded-lg text-lg px-6 py-2">Sign in with Google</button>
               <button onClick={() => signIn('github')} className="bg-black rounded-lg text-lg px-6 py-2">Sign in with GitHub</button>
            </div>
         </main>
      )

   }
   return (
      <div className="bg-blue-900 min-h-screen flex">
         <Navbar />
         <div className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4">{children}</div>
      </div>
   )
}
