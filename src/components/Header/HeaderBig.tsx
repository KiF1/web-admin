'use client'

import Image from "next/image";
import Logo from '../../assets/logo.png'
import { HeaderLinks } from "./HeaderLinks";
import { HeaderMobile } from "./HeaderMobile";

export function HeaderBig(){
  return(
    <div className="w-full fixed z-50 top-0 lg:relative flex items-center justify-between lg:justify-start lg:flex-col gap-12 lg:gap-4 p-4 sm:p-8 lg:p-6 bg-red h-[150px] lg:h-full">
      <div className="w-full flex items-center lg:border-b-2 lg:border-b-white lg:pb-4">
        <Image src={Logo} width={150} height={150} alt="logo" className="w-fit lg:w-full object-contain h-fit" />
      </div>
      <HeaderLinks />
      <HeaderMobile />
    </div>
  )
}