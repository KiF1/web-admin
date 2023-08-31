'use client'

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { TodoWithoutUser } from "./TodoWithoutUser";
import { Todo } from "./Tasks";
import Cookies from "js-cookie";

export interface User{
  id: number;
  name: string;
  email: string;
}

interface Me{
  id: number;
}

export function TodoGroups(){
  const tokenRole = Cookies.get('token_role');
  const value = tokenRole?.split('|');
  const token = value !== undefined ? value[0] : '';
  
  const { data: me } = useQuery<Me>(['me'], async () => {
    const response = await api.post('/me', { headers: { 'Authorization': `Bearer ${token}` } });
    return response.data;
  });

  const { data: todosWithoutUser, refetch: refetchTodosWithoutUser } = useQuery<Todo[]>([`todosWithoutUser-${me?.id}`], async () => {
    const response = await api.get(`/to-dos/without-user/${me?.id}`, { headers: { 'Authorization': `Bearer ${token}` } });
    return response.data;
  });
  
  const { data: users } = useQuery<User[]>([`user-${me?.id}`], async () => {
    const response = await api.get(`/users/representante/${me?.id}`, { headers: { 'Authorization': `Bearer ${token}` } });
    return response.data;
  });

  async function distributeTodosToUsers(users: User[], todos: Todo[]) {
    const totalUsers = users.length;
    const totalTodos = todos.length;
    const todosPerUser = Math.floor(totalTodos / totalUsers);
  
    const distributedTodos: any = {};
  
    for (let i = 0; i < totalUsers; i++) {
      const user = users[i];
      const todosForUser = todos.slice(i * todosPerUser, (i + 1) * todosPerUser);
      distributedTodos[user.id] = todosForUser.map(todo => todo.id);
    }

    await api.post('/to-dos/setLot', { data: distributedTodos }, { headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}`  
    }}).then(() =>  refetchTodosWithoutUser());
  }
  
  return(
    <>
      {todosWithoutUser !== undefined && users !== undefined &&  todosWithoutUser?.length >= 1  && (
        <div className="w-full flex flex-col bg-white shadow-lg rounded-lg gap-4 p-6">
          <strong className="text-xl text-black font-bold">Atribua um To-do a um usuário</strong>
          <button onClick={() => distributeTodosToUsers(users, todosWithoutUser)} className="w-fit px-8 py-4 bg-black text-white rounded-md text-center data-[disabled=true]:cursor-not-allowed">Dividir To-Dos Entre Usuários</button>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
            {todosWithoutUser.map(item => (
              <TodoWithoutUser key={item.id} todo={item} users={users} refetch={refetchTodosWithoutUser} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}