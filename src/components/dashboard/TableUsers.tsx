'use client'

import { useState, useEffect } from "react";
import { Trash, User } from "lucide-react";
import * as Progress from '@radix-ui/react-progress';
import { UserStatistics } from "@/app/dashboard/page";
import { api } from "@/lib/api";
import Cookies from "js-cookie";

interface Props{
  user: UserStatistics
  refetchUsers: () => void;
}

export function TableUsers({ user, refetchUsers }: Props){
  const [progress, setProgress] = useState(13);
  const percentageResolved = Math.floor(Number(user.percentage_resolved))

  useEffect(() => {
    const timer = setTimeout(() => setProgress(percentageResolved), 500);
    return () => clearTimeout(timer);
  }, []);


  async function deleteUser(id: number){
    const tokenRole = Cookies.get('token_role');
    const value = tokenRole?.split('|');
    const token = value !== undefined ? value[0] : '';
    
    await api.delete(`/users/${id}`, { headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}`  
    }}).then(() => refetchUsers());
  }

  return(
    <tbody>
      <tr className="border-b-2 border-b-gray-200">
        <td className="py-4 text-start px-2 text-gray-400 font-normal flex items-center gap-2">
          <User />
          {user.representante_name}
        </td>
        <td className="py-4 text-center px-2 text-gray-400 font-normal">R$ {user.value_of_greens}</td>
        <td className="py-4 text-center px-2 text-gray-400 font-normal">{user.total_greens}/{user.total_reds}</td>
        <td className="py-4 text-center px-2 text-gray-400 font-normal fle flex-col gap-2">
          <span>{percentageResolved}%</span>
          <Progress.Root className="ProgressRoot w-full" value={progress}>
            <Progress.Indicator className="ProgressIndicator" style={{ transform: `translateX(-${100 - progress}%)` }} />
          </Progress.Root>
        </td>
        <td className="py-4 text-center px-2 text-gray-400 font-normal">
          <button onClick={() => deleteUser(user.representante_id)} type='submit' className='w-fit px-4 py-2 bg-black text-white rounded-lg text-lg font-bold font-serif text-start'>
            <Trash className='w-6 h-6' color='white' />
          </button>
        </td>
      </tr>
    </tbody>
  )
}