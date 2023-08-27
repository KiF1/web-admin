'use client'

import { useState, useEffect } from "react";
import * as Progress from '@radix-ui/react-progress';
import { MonitorSmartphone, Trash, User } from "lucide-react";

export function UsersBoxMobile(){
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return(
    <div className="w-full flex lg:hidden flex-col gap-4 border-b-2 border-b-gray-200 shadow-sm pb-4">
      <div className="w-full">
        <strong className="text-lg text-black font-bold relative float-left mr-2">Nome:</strong>
        <div className="w-fit flex items-center gap-2">
          <span className="text-lg text-black font-normal">Kifizin</span>
        </div>
      </div>
      <div className="w-fit">
        <strong className="text-lg text-black font-bold relative float-left mr-2">Grupo:</strong>
        <span className="text-lg text-black font-normal">Mumu Delivery</span>
      </div>
      <div className="w-fit">
        <strong className="text-lg text-black font-bold relative float-left mr-2">Vendas:</strong>
        <span className="text-lg text-black font-normal">R$ 2800</span>
      </div>
      <div className="w-fit">
        <strong className="text-lg text-black font-bold relative float-left mr-2">Finalizado/Cancelado:</strong>
        <span className="text-lg text-black font-normal">3/5</span>
      </div>
      <div className="w-full">
        <Progress.Root className="ProgressRoot w-full" value={progress}>
          <Progress.Indicator className="ProgressIndicator" style={{ transform: `translateX(-${100 - progress}%)` }} />
        </Progress.Root>
      </div>
      <div className="w-full">
        <button type='submit' className='w-full px-4 py-2 bg-black text-white rounded-lg text-lg font-bold font-serif text-center'>
          <Trash className='w-6 h-6 m-auto'  color='white' />
        </button>
      </div>
    </div>
  )
}