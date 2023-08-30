'use client'

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { TodoWithoutUser } from "./TodoWithoutUser";
import { Todo } from "./Tasks";

export function TodoGroups(){
  const { data: todosWithoutUser, refetch: refetchTodosWithoutUser } = useQuery<Todo[]>(['todosWithoutUser'], async () => {
    const responseMe = await api.post('/me');
    const response = await api.get(`/to-dos/without-user/${responseMe.data.id}`);
    return response.data;
  });
  
  return(
    <>
      {todosWithoutUser !== undefined && todosWithoutUser?.length > 1  && (
        <div className="w-full flex flex-col bg-white shadow-lg rounded-lg gap-4 p-6">
          <strong className="text-xl text-black font-bold">Atribua um To-do a um usuário</strong>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
            {todosWithoutUser.map(item => (
              <TodoWithoutUser key={item.id} todo={item} refetch={refetchTodosWithoutUser} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}