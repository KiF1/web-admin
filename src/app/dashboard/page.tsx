'use client'

import { HeaderDashBoard } from "@/components/Header/HeaderDashboard";
import { BoxStatistics } from "@/components/dashboard/BoxStatistics";
import { ButtonNewGroup } from "@/components/dashboard/ButtonNewGroup";
import { ButtonNewPass } from "@/components/dashboard/ButtonNewPass";
import { ButtonNewUser } from "@/components/dashboard/ButtonNewUser";
import { GroupsBoxMobile } from "@/components/dashboard/GroupsBoxMobile";
import { TableGroups } from "@/components/dashboard/TableGroups";
import { TableUsers } from "@/components/dashboard/TableUsers";
import { Tasks } from "@/components/dashboard/Tasks";
import { TodoGroups } from "@/components/dashboard/TodosGroups";
import { UsersBoxMobile } from "@/components/dashboard/UsersBoxMobile";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { FileLock2 } from "lucide-react";

export interface User{
  id: number;
  name: string;
  email: string;
}

export interface Representante{
  id: number;
  name: string;
  email: string;
}

export default function Dashboard(){
  const role = Cookies.get("role");

  const { data: users, refetch } = useQuery<User[]>(['users'], async () => {
    const response = await api.get('/users/all');
    return response.data;
  });

  const { data: representantes, refetch: refetchRepresentantes } = useQuery<Representante[]>(['representantes'], async () => {
    const response = await api.get('/admin/representantes/all');
    return response.data;
  });
  

  return(
    <div className="w-full grid grid-cols-1 gap-8 lg:h-screen">
      <div className="h-full flex relative lg:overflow-y-scroll py-4">
        <div className="w-full absolute flex flex-col gap-12 p-4 lg:pr-8 pb-12">
          <HeaderDashBoard title="Dashboard" icon="home" />
          {role === 'Admin' && (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            </div>
          )}
          {role === 'Representante' && (
            <div className="w-full flex flex-col bg-white shadow-lg rounded-lg gap-4 p-6">
              <div className="w-full flex justify-between items-center gap-8">
                <strong className="text-xl text-black font-bold">Usuários</strong>
                <ButtonNewUser refetch={refetch} />
              </div>
              <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-8">
                {users !== undefined && users.map(item => (
                  <UsersBoxMobile key={item.id} id={item.id} email={item.email} name={item.name} refetch={refetch} />
                ))}
              </div>
            </div>
          )}
          {role === 'Admin' && (
            <div className="w-full flex flex-col bg-white shadow-lg rounded-lg gap-4 p-6">
              <div className="w-full flex justify-between items-center gap-8">
                <strong className="text-xl text-black font-bold">Grupos</strong>
                <ButtonNewGroup refetch={refetch} />
              </div>
              <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-8">
                {representantes !== undefined && representantes.map(item => (
                  <GroupsBoxMobile key={item.id} id={item.id} email={item.email} name={item.name} refetch={refetch} />
                ))}
              </div>
          </div>
          )}
          {role === 'Admin' && representantes !== undefined ? (
            <Tasks representantes={representantes} />
          ) : role === 'Representante' ? (
            <TodoGroups />
          ) : <></>}
        </div>
      </div>
    </div>
  )
}