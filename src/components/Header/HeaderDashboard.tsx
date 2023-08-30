'use client'

import { queryClient } from "@/lib/react-query";
import Cookies from "js-cookie";
import { Home, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props{
  title: string;
}

export function HeaderDashBoard({ title }: Props){
  const router = useRouter();

  async function signOut(){
    await Cookies.remove('token_role');
    await queryClient.clear();
    router.push('/')
  }

  return(
    <div className="w-full flex items-center justify-between gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Home className="w-4 h-4" color="rgb(106, 118, 138)" />
          <strong className="text-sm font-normal text-black">| {title}</strong>
        </div>
        <strong className="text-xl font-bold text-black">{title}</strong>
      </div>
      <button onClick={() => signOut()} className='w-fit px-4 py-2 bg-black text-white rounded-lg text-lg font-bold font-serif text-center'><LogOut className='w-6 h-6' color='white' /></button>
    </div>
  )
}