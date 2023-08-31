'use client'

import { Representante } from "@/app/dashboard/page"
import { Todo } from "./Tasks"
import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import Cookies from "js-cookie"

interface Props{
  representantes: Representante[]
  todo: Todo
  refetch: () => void;
}

export function TodoWithoutRepresentante({ representantes, todo, refetch }: Props){
  const tokenRole = Cookies.get('token_role');
  const value = tokenRole?.split('|');
  const token = value !== undefined ? value[0] : '';
  
  const [representante, setRepresentante] = useState<string | null>(null);

  useEffect(() => {
     if(representante !== null && representante !== ''){
      api.post(`/admin/representantes/link-todo/${representante}/${todo.id}`, { headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`  
      }}).then(() => refetch())
     }
  }, [representante]);

  return(
    <div className="w-full shadow-2xl bg-white p-8 flex flex-col justify-center rounded-md items-center gap-2 mt-8">
        <strong className="text-lg font-bold">Id: {todo.product_id}</strong>
        <span className="text-lg font-bold">Código: {todo.cod}</span>
        <span className="text-lg font-bold">R$ {todo.price}</span>
        <select disabled={representantes.length === 0} onChange={(e) => setRepresentante(e.target.value)} className='w-full bg-grayBack text-black text-sm px-4 py-2 rounded-lg'>
            <option value="">Escolha um Representante</option>
            {representantes !== undefined && representantes.map(item => (
              <option value={item.id}>{item.name}</option>
            ))}
        </select>
    </div>
  )
}