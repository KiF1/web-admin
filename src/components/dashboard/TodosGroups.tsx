'use client'

import { User } from "@/app/dashboard/page";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function TodoGroups(){
  const [user, setUser] = useState<string | null>(null)
  const { data: users } = useQuery<User[]>(['users'], async () => {
    const response = await api.get('/users/all');
    return response.data;
  });

  // useEffect(() => {
  //    api.post(`/representante/link-todo/${id}/${user}`, { headers: { 'Content-Type': 'application/json' } })
  // }, [user]);
  
  return(
    <div className="w-full flex flex-col bg-white shadow-lg rounded-lg gap-4 p-6">
      <strong className="text-xl text-black font-bold">To-Dos</strong>
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="w-full shadow-2xl bg-white p-8 flex flex-col justify-center rounded-md items-center gap-2">
              <strong className="text-lg font-bold">Id: 1339-1094-1449-2</strong>
              <span className="text-lg font-bold">Código: 222030</span>
              <span className="text-lg font-bold">R$ 1200</span>
              <select onChange={(e) => setUser(e.target.value)} className='w-full bg-grayBack text-black text-sm px-4 py-2 rounded-lg'>
                <option value="">Escolha o Usuário</option>
                {users !== undefined && users.map(item => (
                  <option value={item.id}>{item.name}</option>
                ))}
            </select>
          </div>
        </div>
    </div>
  )
}