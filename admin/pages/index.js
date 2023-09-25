import Layout from "@/components/Layout";
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <Layout>
      <div className="flex justify-between">
        <div>
          Signed in as <b>{session?.user?.name}</b> <br />
          <b>Email:</b> {session?.user?.email} <br />
          <button onClick={() => signOut()} className="mt-4">Sign out</button>
        </div>
        <div className="flex items-center bg-gray-300 text-black rounded-lg h-fit overflow-hidden gap-1">
          <img src={session?.user?.image} alt={session?.user?.name} className="w-8 h-8" />
          <span className="px-2">
            {session?.user?.name}
          </span>
        </div>
      </div>
    </Layout>
  )
}
