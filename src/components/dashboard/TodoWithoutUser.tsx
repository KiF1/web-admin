import { User } from "@/app/dashboard/page"
import { Todo } from "./Tasks"
import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"

interface Props{
  todo: Todo
  refetch: () => void;
}

export function TodoWithoutUser({ todo, refetch }: Props){
  const [user, setUser] = useState<string | null>(null);

  const { data } = useQuery<User[]>(['users'], async () => {
    const response = await api.get('/users/all');
    return response.data;
  });

  useEffect(() => {
     if(user !== null){
      api.post(`/representante/link-todo/${todo.id}/${user}`, { headers: { 'Content-Type': 'application/json' } }).then(() => refetch())
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