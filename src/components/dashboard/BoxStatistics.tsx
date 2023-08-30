'use client'

import { CheckCheck, DollarSign, FileLock2, X } from "lucide-react"
import { ButtonNewPass } from "./ButtonNewPass"
import { Statistics } from "@/app/dashboard/page";


interface Props{
  role: string;
  statistics: Statistics
}

export function BoxStatistics({ role, statistics }: Props){
  return(
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
       <div className="w-full bg-white rounded-lg shadow-lg flex flex-col gap-4 p-6">
        <div className="w-full flex justify-between items-center border-b-2 border-b-gray-200 pb-2">
          <div className="px-5 py-4 bg-black rounded-lg relative top-[-3rem] flex justify-center items-center">
            <DollarSign color="#ffff" />
          </div>
          <div className="flex flex-col items-end">
            <span className="text-sm text-gray-400 font-normal">Total Finalizado</span>
            <strong className="text-3xl text-black font-bold">{statistics.total_value}</strong>
          </div>
        </div>
        <strong className="text-sm text-gray-400 font-normal">Momento Atual</strong>
      </div>
       <div className="w-full bg-white rounded-lg shadow-lg flex flex-col gap-4 p-6">
        <div className="w-full flex justify-between items-center border-b-2 border-b-gray-200 pb-2">
          <div className="px-5 py-4 bg-black rounded-lg relative top-[-3rem] flex justify-center items-center">
            <DollarSign color="#ffff" />
          </div>
          <div className="flex flex-col items-end">
            <span className="text-sm text-gray-400 font-normal">Total Cancelado</span>
            <strong className="text-3xl text-black font-bold">{statistics.total_canceled}</strong>
          </div>
        </div>
        <strong className="text-sm text-gray-400 font-normal">Momento Atual</strong>
      </div>
       <div className="w-full bg-white rounded-lg shadow-lg flex flex-col gap-4 p-6">
        <div className="w-full flex justify-between items-center border-b-2 border-b-gray-200 pb-2">
          <div className="px-5 py-4 bg-black rounded-lg relative top-[-3rem] flex justify-center items-center">
            <CheckCheck color="#ffff" />
          </div>
          <div className="flex flex-col items-end">
            <span className="text-sm text-gray-400 font-normal">To-Dos Finalizados</span>
            <strong className="text-3xl text-black font-bold">{statistics.total_green}</strong>
          </div>
        </div>
        <strong className="text-sm text-gray-400 font-normal">Momento Atual</strong>
      </div>
       <div className="w-full bg-white rounded-lg shadow-lg flex flex-col gap-4 p-6">
        <div className="w-full flex justify-between items-center border-b-2 border-b-gray-200 pb-2">
          <div className="px-5 py-4 bg-black rounded-lg relative top-[-3rem] flex justify-center items-center">
            <X color="#ffff" />
          </div>
          <div className="flex flex-col items-end">
            <span className="text-sm text-gray-400 font-normal">To-Dos Cancelados</span>
            <strong className="text-3xl text-black font-bold">{statistics.total_red}</strong>
          </div>
        </div>
        <strong className="text-sm text-gray-400 font-normal">Momento Atual</strong>
      </div>
       <div className="w-full bg-white rounded-lg shadow-lg flex flex-col gap-4 p-6">
        <div className="w-full flex justify-between items-center border-b-2 border-b-gray-200 pb-2">
          <div className="px-5 py-4 bg-black rounded-lg relative top-[-3rem] flex justify-center items-center">
            <X color="#ffff" />
          </div>
          <div className="flex flex-col items-end">
            {role === 'Admin' ? (
              <span className="text-sm text-gray-400 font-normal">To-Dos Sem Representante vinculado</span>
            ) : (
              <span className="text-sm text-gray-400 font-normal">To-Dos Sem Usuário vinculado</span>
            )}
            <strong className="text-3xl text-black font-bold">{statistics.total_without_status}</strong>
          </div>
        </div>
        <strong className="text-sm text-gray-400 font-normal">Momento Atual</strong>
      </div>
      {role === 'Admin' && (
        <div className="w-full bg-white rounded-lg shadow-lg flex flex-col gap-4 p-6">
          <div className="w-full flex justify-between items-center  pb-2">
            <div className="px-5 py-4 bg-black rounded-lg relative top-[-3rem] flex justify-center items-center">
              <FileLock2 color="#ffff" />
            </div>
            <div className="flex flex-col items-end">
              <span className="text-sm text-gray-400 font-normal">Alterar Pass-Code</span>
              <ButtonNewPass />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}