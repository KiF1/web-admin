'use client'

import Link from "next/link";
import { BarChart3, Beer, LayoutDashboard, LogOut, Store, Users } from "lucide-react";
import { usePathname } from 'next/navigation';

export function HeaderLinkMobile(){
  const currentRoute = usePathname();
  const dashboardRouteActive: boolean = currentRoute === '/dashboard' 
  const statisticsRouteActive: boolean = currentRoute === '/dashboard/statistics' 
  const productsRouteActive: boolean = currentRoute === '/dashboard/products' 
  const vendorsRouteActive: boolean = currentRoute === '/dashboard/vendors' 
  const teamsRouteActive: boolean = currentRoute === '/dashboard/teams'

  return(
    <div className="w-full flex flex-col gap-4 p-4 sm:p-8">
      <Link href="/dashboard" data-active={dashboardRouteActive} className="w-full flex items-center px-4 py-4 rounded-lg font-bold data-[active=true]:bg-white gap-4 text-white data-[active=true]:text-red ">
        {dashboardRouteActive ? <LayoutDashboard color="#FF0000" /> : <LayoutDashboard color="#ffffff" />  } 
        Dashboard
      </Link>
      <Link href="/dashboard/statistics" data-active={statisticsRouteActive} className="w-full flex items-center px-4 py-4 rounded-lg font-bold data-[active=true]:bg-white gap-4 text-white data-[active=true]:text-red ">
      {statisticsRouteActive ? <BarChart3 color="#FF0000" /> : <BarChart3 color="#ffffff" />  } 
        Estatísticas
      </Link>
      <Link href="/dashboard/products" data-active={productsRouteActive} className="w-full flex items-center px-4 py-4 rounded-lg font-bold data-[active=true]:bg-white gap-4 text-white data-[active=true]:text-red ">
      {productsRouteActive ? <Beer color="#FF0000" /> : <Beer color="#ffffff" />  } 
        Produtos
      </Link>
      <Link href="/dashboard/vendors" data-active={vendorsRouteActive} className="w-full flex items-center px-4 py-4 rounded-lg font-bold data-[active=true]:bg-white gap-4 text-white data-[active=true]:text-red ">
      {vendorsRouteActive ? <Store color="#FF0000" /> : <Store color="#ffffff" />  } 
        Fornecedores
      </Link>
      <Link href="/dashboard/teams" data-active={teamsRouteActive} className="w-full flex items-center px-4 py-4 rounded-lg font-bold data-[active=true]:bg-white gap-4 text-white data-[active=true]:text-red ">
        {teamsRouteActive ? <Users color="#FF0000" /> : <Users color="#ffffff" />  }
        Equipes
      </Link>
      <Link href="/api/logout" className="w-full flex items-center font-bold px-4 py-4 rounded-lg  gap-4 text-white ">
        <LogOut color="#ffffff" />
        Sair
      </Link>
    </div>
  )
}