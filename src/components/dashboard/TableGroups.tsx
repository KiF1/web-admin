'use client'

import { Building2, Trash } from "lucide-react";
import { RepresentanteStatistics } from "@/app/dashboard/page";
import * as Progress from '@radix-ui/react-progress';
import { api } from "@/lib/api";
import { useState, useEffect } from "react";

interface Props{
  representante: RepresentanteStatistics
  refetchStatistics: () => void;
}

export function TableGroups({ representante, refetchStatistics }: Props){
  const [progress, setProgress] = useState(13);
  const percentageResolved = Math.floor(Number(representante.percentage_resolved))

  useEffect(() => {
    const timer = setTimeout(() => setProgress(percentageResolved), 500);
    return () => clearTimeout(timer);
  }, []);

  async function deleteUser(id: number){
    await api.delete(`/admin/representantes/${id}`, { headers: { 'Content-Type': 'application/json' } }).then(() => {
      refetchStatistics();
    });
  }

  return(
    <tbody>
      <tr className="border-b-2 border-b-gray-200">
        <td className="py-4 text-start px-2 text-gray-400 font-normal flex items-center gap-2">
          <Building2 />
          {representante.representante_name}
        </td>
        <td className="py-4 text-start px-2 text-gray-400 font-normal">R$ {representante.value_of_greens}</td>
        <td className="py-4 text-center px-2 text-gray-400 font-normal">{representante.total_greens}/{representante.total_reds}</td>
        <td className="py-4 text-center px-2 text-gray-400 font-normal fle flex-col gap-2">
          <span>{percentageResolved}%</span>
          <Progress.Root className="ProgressRoot w-full" value={progress}>
            <Progress.Indicator className="ProgressIndicator" style={{ transform: `translateX(-${100 - progress}%)` }} />
          </Progress.Root>
        </td>
        <td className="py-4 text-end px-2 text-gray-400 font-normal">
          <button onClick={() => deleteUser(representante.representante_id)} type='submit' className='w-fit px-4 py-2 bg-black text-white rounded-lg text-lg font-bold font-serif text-start'>
            <Trash className='w-6 h-6' color='white' />
          </button>
        </td>
      </tr>
    </tbody>
  )
}