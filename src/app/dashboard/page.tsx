'use client'

import { HeaderDashBoard } from "@/components/Header/HeaderDashboard";
import { BoxStatistics } from "@/components/dashboard/BoxStatistics";
import { ButtonNewGroup } from "@/components/dashboard/ButtonNewGroup";
import { ButtonNewUser } from "@/components/dashboard/ButtonNewUser";
import { GroupsBoxMobile } from "@/components/dashboard/GroupsBoxMobile";
import { Tasks } from "@/components/dashboard/Tasks";
import { TodoGroups } from "@/components/dashboard/TodosGroups";
import { UsersBoxMobile } from "@/components/dashboard/UsersBoxMobile";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export interface User{
  id: number;
  name: string;
  email: string;
}

export interface RepresentanteStatistics{
  representante_id: number;
  representante_name: string;
  total_greens: string;
  total_reds: string;
  value_of_greens: string
}

export interface UserStatistics{
  id: number;
  representante_id: number;
  representante_name: string;
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

  const { data: statisticsUsers } = useQuery<UserStatistics[]>(['statisticsUsers'], async () => {
    const response = await api.get('/users', { headers: { 'Authorization': `Bearer ${token}` } });
    return response.data;
  });

  const { data: topTenGreen } = useQuery<TopGreen[]>(['topTenGreen'], async () => {
    const response = await api.get('/to-dos/top10green', { headers: { 'Authorization': `Bearer ${token}` } });
    return response.data;
  });

  const { data: topTenRed } = useQuery<TopRed[]>(['topTenRed'], async () => {
    const response = await api.get('/to-dos/top10red', { headers: { 'Authorization': `Bearer ${token}` } });
    return response.data;
  });

  const { data: statistics } = useQuery<Statistics>(['statistics'], async () => {
    const response = await api.get('/to-dos/concluded-finalized', { headers: { 'Authorization': `Bearer ${token}` } });
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
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {statisticsUsers.map(item => (
                  <UsersBoxMobile key={item.representante_id} user={item} refetch={refetch} />
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
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {statisticsRepresentantes.map(item => (
                  <GroupsBoxMobile key={item.representante_id} representante={item}  refetchStatistics={refetchstatisticsRepresentantes} />
                ))}
              </div>
          </div>
          )}
          {topTenGreen !== undefined && topTenGreen.length >= 1 && (
             <div className="w-full flex flex-col bg-white shadow-lg rounded-lg gap-4 p-6">
              <strong className="text-xl text-black font-bold">Ranking - To-dos Concluídos</strong>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {topTenGreen.map((item, index) => (
                  <div className="w-full flex flex-col gap-2 shadow-2xl p-8">
                    <strong className="text-lg text-black font-bold">{index + 1}º</strong>
                    <div className="w-full">
                      <strong className="text-lg text-black font-bold relative float-left mr-2">Nome:</strong>
                      <span className="text-lg text-black font-normal">{item.name}</span>
                    </div>
                    <div className="w-full">
                      <strong className="text-lg text-black font-bold relative float-left mr-2">To-dos Concluidos:</strong>
                      <span className="text-lg text-black font-normal">{item.total_greens}</span>
                    </div>
                  </div>
                ))}
              </div>
          </div>
          )}
          {topTenRed !== undefined && topTenRed.length >= 1 && (
            <div className="w-full flex flex-col bg-white shadow-lg rounded-lg gap-4 p-6">
            <strong className="text-xl text-black font-bold">Ranking - To-dos Cancelados</strong>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {topTenRed.map((item, index) => (
                <div className="w-full flex flex-col gap-2 shadow-2xl p-8">
                  <strong className="text-lg text-black font-bold">{index + 1}º</strong>
                  <div className="w-full">
                    <strong className="text-lg text-black font-bold relative float-left mr-2">Nome:</strong>
                    <span className="text-lg text-black font-normal">{item.name}</span>
                  </div>
                  <div className="w-full">
                    <strong className="text-lg text-black font-bold relative float-left mr-2">To-dos Cancelados:</strong>
                    <span className="text-lg text-black font-normal">{item.total_reds}</span>
                  </div>
                </div>
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