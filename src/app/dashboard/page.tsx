'use client'

import { HeaderDashBoard } from "@/components/Header/HeaderDashboard";
import { BoxStatistics } from "@/components/dashboard/BoxStatistics";
import { ButtonNewGroup } from "@/components/dashboard/ButtonNewGroup";
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
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";

export interface User{
  id: number;
  name: string;
  email: string;
}

export interface RepresentanteStatistics{
  representante_id: number;
  representante_name: string;
  percentage_resolved: string;
  total_greens: string;
  total_reds: string;
  value_of_greens: string
}

export interface UserStatistics{
  id: number;
  representante_id: number;
  representante_name: string;
  percentage_resolved: string;
  total_greens: string;
  total_reds: string;
  value_of_greens: string
}

export interface Representante{
  id: number;
  name: string;
}

interface TopGreen{
  name: string;
  total_greens:  number
}

interface TopRed{
  name: string;
  total_reds:  number
}

export interface Statistics {
  total_canceled: string; 
  total_green: number;  
  total_red: number; 
  total_value: string; 
  total_without_status: number; 
};

interface UsersInRepresentantes{
  representante: string;
  users: UserStatistics[]
}


export default function Dashboard(){
  const [errorMe, setErroMe] = useState<boolean>(false);

  const tokenRole = Cookies.get('token_role');
  const value = tokenRole?.split('|');
  const token = value !== undefined ? value[0] : '';
  const role = value !== undefined ? value[1] : ''

  const { refetch } = useQuery<User[]>(['users'], async () => {
    try {
      const responseMe = await api.post('/me', { headers: { 'Authorization': `Bearer ${token}` } });
      const response = await api.get(`/users/representante/${responseMe.data.id}`, { headers: { 'Authorization': `Bearer ${token}` } });
      return response.data;
    } catch {
      setErroMe(true)
    }
  });

  const { data: representantes, refetch: refetchRepresentantes } = useQuery<Representante[]>(['representantes'], async () => {
    const response = await api.get('/admin/representantes/all', { headers: { 'Authorization': `Bearer ${token}` } });
    return response.data;
  });

  const { data: statisticsRepresentantes, refetch: refetchstatisticsRepresentantes } = useQuery<RepresentanteStatistics[]>(['statisticsRepresentantes'], async () => {
    const response = await api.get('/admin/representantes', { headers: { 'Authorization': `Bearer ${token}` } });
    return response.data;
  });

  const { data: statisticsUsers, refetch: refetchStatisticsUsers } = useQuery<UserStatistics[]>(['statisticsUsers'], async () => {
    const response = await api.get('/users', { headers: { 'Authorization': `Bearer ${token}` } });
    return response.data;
  });

  const { data: topTenGreen } = useQuery<TopGreen[]>(['topTenGreen'], async () => {
    const response = await api.get('/to-dos/top10green', { headers: { 'Authorization': `Bearer ${token}` } });
    return response.data;
  });

  const newTopArray = topTenGreen?.map(item => {
    return { name: item.name, total: item.total_greens }
  })

  const { data: topTenRed } = useQuery<TopRed[]>(['topTenRed'], async () => {
    const response = await api.get('/to-dos/top10red', { headers: { 'Authorization': `Bearer ${token}` } });
    return response.data;
  });

  const newWorseArray = topTenRed?.map(item => {
    return { name: item.name, total: item.total_reds }
  })

  const { data: statistics } = useQuery<Statistics>(['statistics'], async () => {
    const response = await api.get('/to-dos/concluded-finalized', { headers: { 'Authorization': `Bearer ${token}` } });
    return response.data;
  });

  const { data: statisticsUsersInRepresentantes, refetch: refetchStatisticsUsersInRepresentantes } = useQuery<UsersInRepresentantes[]>(['statisticsUsersInRepresentantes'], async () => {
    const response = await api.get('/admin/representantes/estatisticas', { headers: { 'Authorization': `Bearer ${token}` } });
    response.data = Object.values(response.data)
    return response.data;
  });

  useEffect(() => {
    if(errorMe){
      window.location.reload(); 
    }
}, [errorMe])

  return(
    <div className="w-full grid grid-cols-1 gap-8 lg:h-screen">
      <div className="h-full flex relative lg:overflow-y-scroll py-4">
        <div className="w-full absolute flex flex-col gap-12 p-4 lg:pr-8 pb-12">
          <HeaderDashBoard title="Dashboard" />
          {statistics !== undefined && <BoxStatistics role={role} statistics={statistics} />}
          {role === 'Representante' && statisticsUsers !== undefined && (
            <div className="w-full flex flex-col bg-white shadow-lg rounded-lg gap-4 p-6">
              <div className="w-full flex justify-between items-center gap-8">
                {statisticsUsers.length >= 1 ? (
                  <strong className="text-xl text-black font-bold">Estatísticas dos Usuários</strong> 
                ) : (
                  <strong className="text-xl text-black font-bold">Adicione um Usuário</strong>
                )}
                <ButtonNewUser refetch={refetch} />
              </div>
              <div className="w-full flex flex-col gap-8">
                {statisticsUsers.length >= 1 && (
                  <div className="w-full hidden lg:flex overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="p-[0.2rem]">
                          <th className="p-2 border-b-2 border-b-gray-200 font-normal text-gray-400 text-lg text-start">Usuário</th>
                          <th className="p-2 border-b-2 border-b-gray-200 font-normal text-gray-400 text-lg text-center">Vendas</th>
                          <th className="p-2 border-b-2 border-b-gray-200 font-normal text-gray-400 text-lg text-center">Finalizado/Cancelado</th>
                          <th className="p-2 border-b-2 border-b-gray-200 font-normal text-gray-400 text-lg text-center">Progresso</th>
                          <th className="p-2 border-b-2 border-b-gray-200 font-normal text-gray-400 text-lg text-center">Ação</th>
                        </tr>
                      </thead>
                      {statisticsUsers.map(item => (
                        <TableUsers key={item.representante_id} user={item} refetchUsers={refetch} refetchStatistics={refetchStatisticsUsers} />
                      ))}
                    </table>
                  </div>
                )}
                {statisticsUsers.map(item => (
                  <UsersBoxMobile key={item.representante_id} user={item} refetchUsers={refetch} refetchStatistics={refetchStatisticsUsers} />
                ))}
              </div>
            </div>
          )}
          {role === 'Admin' && statisticsRepresentantes !== undefined &&  (
            <div className="w-full flex flex-col bg-white shadow-lg rounded-lg gap-4 p-6">
              <div className="w-full flex justify-between items-center gap-8">
                {statisticsRepresentantes.length >= 1 ? (
                    <strong className="text-xl text-black font-bold">Estatísticas dos Representantes</strong> 
                  ) : (
                    <strong className="text-xl text-black font-bold">Adicione um Representante</strong>
                  )}
                <ButtonNewGroup refetch={refetchRepresentantes} />
              </div>
              <div className="w-full flex flex-col gap-8">
                {statisticsRepresentantes.length >= 1 && (
                  <div className="w-full hidden lg:flex overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="p-[0.2rem]">
                          <th className="p-2 border-b-2 border-b-gray-200 font-normal text-gray-400 text-lg text-start">Grupo</th>
                          <th className="p-2 border-b-2 border-b-gray-200 font-normal text-gray-400 text-lg text-center">Vendas</th>
                          <th className="p-2 border-b-2 border-b-gray-200 font-normal text-gray-400 text-lg text-center">Finalizado/Cancelado</th>
                          <th className="p-2 border-b-2 border-b-gray-200 font-normal text-gray-400 text-lg text-center">Progresso</th>
                          <th className="p-2 border-b-2 border-b-gray-200 font-normal text-gray-400 text-lg text-center">Ação</th>
                        </tr>
                      </thead>
                      {statisticsRepresentantes.map(item => (
                        <TableGroups  key={item.representante_id} representante={item}  refetchStatistics={refetchstatisticsRepresentantes} />
                      ))}
                    </table>
                  </div>
                )}
                {statisticsRepresentantes.map(item => (
                  <GroupsBoxMobile key={item.representante_id} representante={item}  refetchStatistics={refetchstatisticsRepresentantes} />
                ))}
              </div>
          </div>
          )}
          {role === 'Admin' && statisticsUsersInRepresentantes !== undefined && statisticsUsersInRepresentantes.length >= 1 &&   (
            <div className="w-full flex flex-col bg-white shadow-lg rounded-lg gap-4 p-6">
              <strong className="text-xl text-black font-bold">Estatísticas dos Usuários</strong> 
              <div className="w-full flex flex-col gap-8">
                {statisticsUsersInRepresentantes.map(item => (
                  <div className="w-full flex flex-col gap-4">
                    {item.users.length >= 1 && (
                      <>
                        <strong className="text-lg text-black font-normal">Representante: {item.representante}</strong> 
                        <div className="w-full hidden lg:flex overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="p-[0.2rem]">
                                <th className="p-2 border-b-2 border-b-gray-200 font-normal text-gray-400 text-lg text-start">Usuário</th>
                                <th className="p-2 border-b-2 border-b-gray-200 font-normal text-gray-400 text-lg text-center">Vendas</th>
                                <th className="p-2 border-b-2 border-b-gray-200 font-normal text-gray-400 text-lg text-center">Finalizado/Cancelado</th>
                                <th className="p-2 border-b-2 border-b-gray-200 font-normal text-gray-400 text-lg text-center">Progresso</th>
                                <th className="p-2 border-b-2 border-b-gray-200 font-normal text-gray-400 text-lg text-center">Ação</th>
                              </tr>
                            </thead>
                            {item.users.map(item => (
                              <TableUsers key={item.id} user={item} refetchUsers={refetch} refetchStatistics={refetchStatisticsUsers} refetchStatisticsUsers={refetchStatisticsUsersInRepresentantes} />
                            ))}
                          </table>
                        </div>
                        {item.users.map(item => (
                          <UsersBoxMobile key={item.id} user={item} refetchUsers={refetch} refetchStatistics={refetchStatisticsUsers} refetchStatisticsUsers={refetchStatisticsUsersInRepresentantes} />
                        ))}
                      </>
                    )}
                  </div>
                ))}
              </div>
          </div>
          )}
          {topTenGreen !== undefined && topTenGreen.length >= 3 && (
             <div className="w-full flex flex-col bg-white shadow-lg rounded-lg gap-4 p-6">
              <strong className="text-xl text-black font-bold">Estatística - To-dos Concluídos</strong>
              <div className="w-full">
                <ResponsiveContainer width="100%" height="100%" className="min-h-[300px]">
                  <AreaChart width={500} height={400} data={newTopArray} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="total" stroke="#000000" fill="#000000" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
          </div>
          )}
          {topTenRed !== undefined && topTenRed.length >= 3 && (
            <div className="w-full flex flex-col bg-white shadow-lg rounded-lg gap-4 p-6">
            <strong className="text-xl text-black font-bold">Estatística - To-dos Cancelados</strong>
            <div className="w-full">
              <ResponsiveContainer width="100%" height="100%" className="min-h-[300px]">
                  <AreaChart width={500} height={400} data={newWorseArray} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="total" stroke="#000000" fill="#000000" />
                  </AreaChart>
                </ResponsiveContainer>
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