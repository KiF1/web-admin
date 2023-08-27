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
import { UsersBoxMobile } from "@/components/dashboard/UsersBoxMobile";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FileLock2, FolderUp, Pencil, Trash } from "lucide-react";
import ReactLoading from "react-loading";

interface BoxStatistics {
  name: string;
  value: number;
  icon: string;
  currentTotal: number;
  lastTotal: number;
};

export interface ValueGraphics{
  date: string;
  total: number
}

export default function Dashboard(){
  const { data: arrayStatistics  } = useQuery<BoxStatistics[]>(['arrayStatistics'], async () => {
    const response = await axios.get('api/front/statistics');
    return response.data.data;
  }, { refetchInterval: 60000, refetchOnWindowFocus: true });
  

  return(
    <div className="w-full grid grid-cols-1 gap-8 lg:h-screen">
      <div className="h-full flex relative lg:overflow-y-scroll py-4">
        <div className="w-full absolute flex flex-col gap-12 p-4 lg:pr-8 pb-12">
          {arrayStatistics !== undefined ? (
            <>
              <HeaderDashBoard title="Dashboard" icon="home" />
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {arrayStatistics.map((item, index) => (
                  <BoxStatistics name={item.name} key={index} value={item.value} icon={item.icon} currentTotal={item.currentTotal} lastTotal={item.lastTotal}  />
                ))}
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
              <div className="w-full flex flex-col bg-white shadow-lg rounded-lg gap-4 p-6">
                <div className="w-full flex justify-between items-center gap-8">
                  <strong className="text-xl text-black font-bold">Usuários</strong>
                  <ButtonNewUser />
                </div>
                <div className="w-full grid grid-cols-1 gap-8">
                  <TableUsers />
                  <UsersBoxMobile />
                </div>
              </div>
              <div className="w-full flex flex-col bg-white shadow-lg rounded-lg gap-4 p-6">
                <div className="w-full flex justify-between items-center gap-8">
                  <strong className="text-xl text-black font-bold">Grupos</strong>
                  <ButtonNewGroup />
                </div>
                <div className="w-full grid grid-cols-1 gap-8">
                  <TableGroups />
                  <GroupsBoxMobile />
                </div>
              </div>
              <div className="w-full flex flex-col bg-white shadow-lg rounded-lg gap-4 p-6">
                <strong className="text-xl text-black font-bold">A Fazeres</strong>
                <Tasks />
              </div>
            </>
          ) : (
            <div className="w-full h-[70vh] flex items-center justify-center">
              <ReactLoading className="w-fit" type="spinningBubbles" color="#000000" height='80px' width='100px' />
            </div>
          ) }
        </div>
      </div>
    </div>
  )
}