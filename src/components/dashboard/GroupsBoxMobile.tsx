'use client'

import { Trash } from "lucide-react";
import { api } from "@/lib/api";
import { RepresentanteStatistics } from "@/app/dashboard/page";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import * as Progress from '@radix-ui/react-progress';

interface Props{
  representante: RepresentanteStatistics
  refetchStatistics: () => void;
}

export function GroupsBoxMobile({ representante, refetchStatistics }: Props){
  const [progress, setProgress] = useState(13);
  const percentageResolved = Math.floor(Number(representante.percentage_resolved));

  useEffect(() => {
    const timer = setTimeout(() => setProgress(percentageResolved), 500);
    return () => clearTimeout(timer);
  }, []);

  async function deleteUser(id: number){
    const tokenRole = Cookies.get('token_role');
    const value = tokenRole?.split('|');
    const token = value !== undefined ? value[0] : '';

    await api.delete(`/admin/representantes/${id}`, { headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}`  
    }}).then(() => {
      refetchStatistics();
    })}

  return(
    <div className="w-full flex lg:hidden flex-col gap-2 border-b-2 border-b-gray-200 shadow-2xl p-8">
      <div className="w-full">
        <strong className="text-lg text-black font-bold relative float-left mr-2">Nome:</strong>
        <div className="w-fit flex items-center gap-2">
          <span className="text-lg text-black font-normal">{representante.representante_name}</span>
        </div>
      </div>
      <div className="w-fit">
        <strong className="text-lg text-black font-bold relative float-left mr-2">To-dos Finalizados:</strong>
        <span className="text-lg text-black font-normal">{representante.total_greens}</span>
      </div>
      <div className="w-fit">
        <strong className="text-lg text-black font-bold relative float-left mr-2">To-dos Cancelado:</strong>
        <span className="text-lg text-black font-normal">{representante.total_reds}</span>
      </div>
      <div className="w-fit">
        <strong className="text-lg text-black font-bold relative float-left mr-2">Vendas:</strong>
        <span className="text-lg text-black font-normal">R$ {representante.value_of_greens}</span>
      </div>
      <div className="w-full">
        <strong className="text-lg text-black font-bold relative float-left mr-2">Progresso:</strong>
        <strong className="text-lg text-black font-bold relative float-left mr-2">{percentageResolved}%</strong>
        <Progress.Root className="ProgressRoot w-full" value={progress}>
          <Progress.Indicator className="ProgressIndicator" style={{ transform: `translateX(-${100 - progress}%)` }} />
        </Progress.Root>
      </div>
      <div className="w-full">
        <button onClick={() => deleteUser(representante.representante_id)} type='submit' className='w-full px-4 py-2 bg-black text-white rounded-lg text-lg font-bold font-serif text-center'>
          <Trash className='w-6 h-6 m-auto'  color='white' />
        </button>
      </div>
    </div>
  )
}