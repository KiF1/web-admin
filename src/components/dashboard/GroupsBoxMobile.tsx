'use client'

import { Trash } from "lucide-react";
import { api } from "@/lib/api";

interface Props{
  id: number;
  name: string;
  email: string;
  refetch: () => void;
}

export function GroupsBoxMobile({ id, email, name, refetch }: Props){

  async function deleteUser(id: number){
    await api.delete(`/admin/representantes/${id}`, { headers: { 'Content-Type': 'application/json' } }).then(() => refetch());
  }

  return(
    <div className="w-full flex flex-col gap-4 border-b-2 border-b-gray-200 shadow-2xl p-8">
      <div className="w-full">
        <strong className="text-lg text-black font-bold relative float-left mr-2">Nome:</strong>
        <div className="w-fit flex items-center gap-2">
          <span className="text-lg text-black font-normal">{name}</span>
        </div>
      </div>
      <div className="w-fit">
        <strong className="text-lg text-black font-bold relative float-left mr-2">Email:</strong>
        <span className="text-lg text-black font-normal">{email}</span>
      </div>
      <div className="w-full">
        <button onClick={() => deleteUser(id)} type='submit' className='w-full px-4 py-2 bg-black text-white rounded-lg text-lg font-bold font-serif text-center'>
          <Trash className='w-6 h-6 m-auto'  color='white' />
        </button>
      </div>
    </div>
  )
}