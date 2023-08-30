'use client'

import { Todo } from "./Tasks"
import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
import Cookies from "js-cookie"

export interface User{
  id: number;
  name: string;
  email: string;
}

interface Props{
  todo: Todo
  refetch: () => void;
}

export function TodoWithoutUser({ todo, refetch }: Props){
  const tokenRole = Cookies.get('token_role');
  const value = tokenRole?.split('|');
  const token = value !== undefined ? value[0] : '';
  
  const [user, setUser] = useState<string | null>(null);

  const { data } = useQuery<User[]>(['users'], async () => {
    const responseMe = await api.post('/me', { headers: { 'Authorization': `Bearer ${token}` } });
    const response = await api.get(`/users/representante/${responseMe.data.id}`, { headers: { 'Authorization': `Bearer ${token}` } });
    return response.data;
  });

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
            {data !== undefined && data.map(item => (
              <option value={item.id}>{item.name}</option>
            ))}
        </select>
    </div>
  )
}