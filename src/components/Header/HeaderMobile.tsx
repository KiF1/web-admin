'use client'

import * as Dialog from '@radix-ui/react-dialog';
import { AlignJustify, X } from 'lucide-react';
import { HeaderLinkMobile } from './HeaderLinkMobile';
import Logo from "../../assets/logo.png"
import Image from "next/image";

export function HeaderMobile(){
  return(
    <div className='flex lg:hidden'>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <AlignJustify className='w-12 h-12' color='#ffff' />
        </Dialog.Trigger>
        <Dialog.Portal className='w-full h-screen'>
          <Dialog.Content className="w-full h-full bg-red top-0 fixed z-[100] focus-visible:outline-0 transition-all">
              <div className='w-full justify-between flex items-center gap-8 top-4 h-[150px] p-4 sm:p-8'>
                <Image src={Logo} width={150} height={150} alt="logo" className="w-fit lg:w-full object-contain h-fit" />
                <Dialog.Close asChild>
                    <X className="w-12 h-12 right-4 cursor-pointer" color='#ffff' aria-label="Close"/>
                </Dialog.Close>
              </div>
            <HeaderLinkMobile />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}