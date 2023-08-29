'use client'

import { Building2, Trash } from "lucide-react";
import { RepresentanteStatistics } from "@/app/dashboard/page";
import { api } from "@/lib/api";

interface Props{
  representante: RepresentanteStatistics
  refetchStatistics: () => void;
}

export function TableGroups({ representante, refetchStatistics }: Props){

  async function deleteUser(id: number){
    await api.delete(`/admin/representantes/${id}`, { headers: { 'Content-Type': 'application/json' } }).then(() => {
      refetchStatistics();
    });
  }

  return(
    <div className="w-full hidden lg:flex overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="p-[0.2rem]">
            <th className="p-2 border-b-2 border-b-gray-200 font-normal text-gray-400 text-lg text-start">Grupo</th>
            <th className="p-2 border-b-2 border-b-gray-200 font-normal text-gray-400 text-lg text-start">Vendas</th>
            <th className="p-2 border-b-2 border-b-gray-200 font-normal text-gray-400 text-lg text-center">Finalizado/Cancelado</th>
            <th className="p-2 border-b-2 border-b-gray-200 font-normal text-gray-400 text-lg text-start">Ação</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b-2 border-b-gray-200">
            <td className="py-4 text-start px-2 text-gray-400 font-normal flex items-center gap-2">
              <Building2 />
              {representante.representante_name}
            </td>
            <td className="py-4 text-start px-2 text-gray-400 font-normal">R$ {representante.value_of_greens}</td>
            <td className="py-4 text-center px-2 text-gray-400 font-normal">{representante.total_greens}/{representante.total_reds}</td>
            <td className="py-4 text-start px-2 text-gray-400 font-normal">
              <button onClick={() => deleteUser(representante.representante_id)} type='submit' className='w-fit px-4 py-2 bg-black text-white rounded-lg text-lg font-bold font-serif text-start'>
                <Trash className='w-6 h-6' color='white' />
              </button>
            </td>
          </tr>
          
        </tbody>
      </table>
    </div>
  )
}