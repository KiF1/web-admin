'use client'

import { HeaderDashBoard } from "@/components/Header/HeaderDashboard";
import { ButtonNewGroup } from "@/components/dashboard/ButtonNewGroup";
import { ButtonNewPass } from "@/components/dashboard/ButtonNewPass";
import { ButtonNewUser } from "@/components/dashboard/ButtonNewUser";
import { GroupsBoxMobile } from "@/components/dashboard/GroupsBoxMobile";
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

export interface RepresentanteStatistics{
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
  total_red:  number
}

export default function Dashboard(){
  const tokenRole = Cookies.get('token_role');
  const value = tokenRole?.split('|');
  const token = value !== undefined ? value[0] : '';
  const role = value !== undefined ? value[1] : ''

  const { refetch } = useQuery<User[]>(['users'], async () => {
    const responseMe = await api.post('/me', { headers: { 'Authorization': `Bearer ${token}` } });
    const response = await api.get(`/users/representante/${responseMe.data.id}`, { headers: { 'Authorization': `Bearer ${token}` } });
    return response.data;
  });

  const { data: representantes } = useQuery<Representante[]>(['representantes'], async () => {
    const response = await api.get('/admin/representantes/all', { headers: { 'Authorization': `Bearer ${token}` } });
    return response.data;
  });

  const { data: statisticsRepresentantes, refetch: refetchstatisticsRepresentantes } = useQuery<RepresentanteStatistics[]>(['statisticsRepresentantes'], async () => {
    const response = await api.get('/admin/representantes', { headers: { 'Authorization': `Bearer ${token}` } });
    return response.data;
  });

  const { data: statisticsUsers } = useQuery<RepresentanteStatistics[]>(['statisticsUsers'], async () => {
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

  return(
    <div className="w-full grid grid-cols-1 gap-8 lg:h-screen">
      <div className="h-full flex relative lg:overflow-y-scroll py-4">
        <div className="w-full absolute flex flex-col gap-12 p-4 lg:pr-8 pb-12">
          <HeaderDashBoard title="Dashboard" />
          {role === 'Admin' && (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
                <strong className="text-xl text-black font-bold">Estatísticas dos Usuários</strong>
                <ButtonNewUser refetch={refetch} />
              </div>
              <div className="w-full grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {statisticsUsers !== undefined && statisticsUsers.map(item => (
                  <UsersBoxMobile key={item.representante_id} user={item} refetch={refetch} />
                ))}
              </div>
            </div>
          )}
          {role === 'Admin' && (
            <div className="w-full flex flex-col bg-white shadow-lg rounded-lg gap-4 p-6">
              <div className="w-full flex justify-between items-center gap-8">
                <strong className="text-xl text-black font-bold">Estatísticas dos Representantes</strong>
                <ButtonNewGroup refetch={refetchstatisticsRepresentantes} />
              </div>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {statisticsRepresentantes !== undefined && statisticsRepresentantes.map(item => (
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
                    <span className="text-lg text-black font-normal">{item.total_red}</span>
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