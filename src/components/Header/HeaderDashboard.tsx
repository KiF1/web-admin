import { Home, LogOut } from "lucide-react";
import Link from "next/link";

interface Props{
  title: string;
}

export function HeaderDashBoard({ title }: Props){

  return(
    <div className="w-full flex items-center justify-between gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Home className="w-4 h-4" color="rgb(106, 118, 138)" />
          <strong className="text-sm font-normal text-black">| {title}</strong>
        </div>
        <strong className="text-xl font-bold text-black">{title}</strong>
      </div>
      <Link href="/api/logout" type='submit' className='w-fit px-4 py-2 bg-black text-white rounded-lg text-lg font-bold font-serif text-center'><LogOut className='w-6 h-6' color='white' /></Link>
    </div>
  )
}