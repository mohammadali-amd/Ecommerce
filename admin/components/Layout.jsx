import { useSession, signIn } from "next-auth/react";
import Navbar from '@/components/Navbar';
import { Inter } from 'next/font/google';
import { useState } from "react";
import Logo from "./Logo";

const inter = Inter({ subsets: ['latin'] });

export default function Layout({ children }) {
   const [showNave, setShowNave] = useState(false);
   const { data: session } = useSession();
   if (!session) {
      return (
         <main
            className={`bg-[#FBFAFD] min-h-screen h-56 grid justify-center content-center ${inter.className}`}
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
      <div className="bg-[#FBFAFD] min-h-screen">
         <div className="flex items-center p-4 md:hidden">
            <span onClick={() => setShowNave(true)} className="cursor-pointer">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
               </svg>
            </span>
            <div className="flex grow justify-center mr-6">
               <Logo />
            </div>
         </div>
         <div className="flex">
            <Navbar show={showNave} close={setShowNave} />
            <div className="flex-grow p-4">{children}</div>
         </div>
      </div>
   )
}
