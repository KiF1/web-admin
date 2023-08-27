'use client'

import { UserCheck2, UtensilsCrossed, Bike, PackageCheck, XCircle } from "lucide-react";

interface Props{
  name: string;
  value: number;
  icon: string;
  currentTotal: number;
  lastTotal: number;
}

export function BoxStatistics({ icon, name, value, currentTotal, lastTotal }: Props){
  const percentageDifferenceBetweenFinishedTasksAndCancelledTasks = currentTotal !== 0 && lastTotal !== 0 ? Math.round((((currentTotal) - lastTotal) / lastTotal) * 100) : 0;
  
  return(
    <div className="w-full bg-white rounded-lg shadow-lg flex flex-col gap-4 p-6">
      <div className="w-full flex justify-between items-center border-b-2 border-b-gray-200 pb-2">
        <div className="px-5 py-4 bg-black rounded-lg relative top-[-3rem] flex justify-center items-center">
          { icon === 'UserCheck2' ? <UserCheck2 color="#ffff" />
             : icon === 'UtensilsCrossed' ? <UtensilsCrossed color="#ffff" /> 
             : icon === 'Bike' ? <Bike color="#ffff" />
             : icon === 'PackageCheck' ? <PackageCheck color="#ffff" />
             : <XCircle color="#ffff" />
          }
        </div>
        <div className="flex flex-col items-end">
          <span className="text-sm text-gray-400 font-normal">{name}</span>
          <strong className="text-3xl text-black font-bold">{value}</strong>
        </div>
      </div>
      {percentageDifferenceBetweenFinishedTasksAndCancelledTasks > 0 && name !== 'Pedidos Aceitos' && name !== 'Pedidos Pendentes' ? (
        <strong className="text-sm text-gray-400 font-normal"><span className="text-sm text-green-600 font-bold">+{percentageDifferenceBetweenFinishedTasksAndCancelledTasks}%</span> em comparação com a última semana</strong>
      ) : percentageDifferenceBetweenFinishedTasksAndCancelledTasks < 0 && name !== 'Pedidos Aceitos' && name !== 'Pedidos Pendentes' ? (
        <strong className="text-sm text-gray-400 font-normal"><span className="text-sm text-black font-bold">{percentageDifferenceBetweenFinishedTasksAndCancelledTasks}%</span> em comparação com a última semana</strong>
      ) : (
        <strong className="text-sm text-gray-400 font-normal">Momento Atual</strong>
      )}
    </div>
  )
}