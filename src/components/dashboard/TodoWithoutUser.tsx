'use client'

import { Todo } from "./Tasks"
import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import Cookies from "js-cookie"
import { User } from "./TodosGroups"

interface Props{
  todo: Todo
  users: User[]
  refetch: () => void;
}

export function TodoWithoutUser({ todo, refetch, users }: Props){
  const tokenRole = Cookies.get('token_role');
  const value = tokenRole?.split('|');
  const token = value !== undefined ? value[0] : '';
  
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
     if(user !== null){
      api.post(`/representante/link-todo/${todo.id}/${user}`, { headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`  
      }}).then(() => refetch())
     }
  }, [user]);

  return(
    <div className="w-full shadow-2xl bg-white p-8 flex flex-col justify-center rounded-md items-center gap-2">
        <strong className="text-lg font-bold">Id: {todo.product_id}</strong>
        <span className="text-lg font-bold">Código: {todo.cod}</span>
        <span className="text-lg font-bold">R$ {todo.price}</span>
        <select onChange={(e) => setUser(e.target.value)} className='w-full bg-grayBack text-black text-sm px-4 py-2 rounded-lg'>
            <option value="">Escolha um user</option>
            {users.map(item => (
              <option value={item.id}>{item.name}</option>
            ))}
        </select>
    </div>
  )
}