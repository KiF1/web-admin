'use client'

import { useState, useEffect } from "react";
import { Trash, User } from "lucide-react";
import * as Progress from '@radix-ui/react-progress';

export function TableUsers(){
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return(
    <div className="w-full hidden lg:flex overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="p-[0.2rem]">
            <th className="p-2 border-b-2 border-b-gray-200 font-normal text-gray-400 text-lg text-start">Nome</th>
            <th className="p-2 border-b-2 border-b-gray-200 font-normal text-gray-400 text-lg text-start">Grupo</th>
            <th className="p-2 border-b-2 border-b-gray-200 font-normal text-gray-400 text-lg text-start">Vendas</th>
            <th className="p-2 border-b-2 border-b-gray-200 font-normal text-gray-400 text-lg text-start">Progresso</th>
            <th className="p-2 border-b-2 border-b-gray-200 font-normal text-gray-400 text-lg text-center">Finalizado/Cancelado</th>
            <th className="p-2 border-b-2 border-b-gray-200 font-normal text-gray-400 text-lg text-start">Ação</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b-2 border-b-gray-200">
            <td className="py-4 text-start px-2 text-gray-400 font-normal flex items-center gap-2">
              <User />
              Jhon Doe, Jhon, Steve
            </td>
            <td className="py-4 text-start px-2 text-gray-400 font-normal">Mumu Delivery</td>
            <td className="py-4 text-start px-2 text-gray-400 font-normal">R$ 2500</td>
            <td>
              <Progress.Root className="ProgressRoot w-full" value={progress}>
                <Progress.Indicator className="ProgressIndicator" style={{ transform: `translateX(-${100 - progress}%)` }} />
              </Progress.Root>
            </td>
            <td className="py-4 text-center px-2 text-gray-400 font-normal">2/5</td>
            <td className="py-4 text-start px-2 text-gray-400 font-normal">
              <button type='submit' className='w-fit px-4 py-2 bg-black text-white rounded-lg text-lg font-bold font-serif text-start'>
                <Trash className='w-6 h-6' color='white' />
              </button>
            </td>
          </tr>
          
        </tbody>
      </table>
    </div>
  )
}