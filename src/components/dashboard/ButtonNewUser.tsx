'use client'

import * as Dialog from '@radix-ui/react-dialog';
import { UserPlus, X } from 'lucide-react';

export function ButtonNewUser(){
  return(
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button type='submit' className='w-fit px-4 py-2 bg-black text-white rounded-lg text-lg font-bold font-serif text-center'><UserPlus className='w-6 h-6' color='white' /></button>
        </Dialog.Trigger>
        <Dialog.Portal className='w-full h-screen'>
          <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          <Dialog.Content className="w-[85%] md:w-[65%] lg:w-[30%] h-fit p-8 rounded-md top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white fixed z-[100] focus-visible:outline-0 transition-all">
              <div className='w-full flex justify-between items-center mb-8'>
                <h1 className='text-2xl text-center flex-1 font-sans font-bold text-black'>Criar Usuário</h1>
                <Dialog.Close asChild>
                    <X className="w-12 h-12 right-4 cursor-pointer" color='#000000' aria-label="Close"/>
                </Dialog.Close>
              </div>
            <form className='flex flex-col gap-4'>
              <div className="w-full flex flex-col gap-2">
                <input  type='email' placeholder='E-mail' className='w-full px-2 py-2 text-black text-sm font-normal rounded-lg border-2 border-grayBorder focus:outline-black'  />
                {/* {errors.email && <span className="text-sm text-black font-normal">{errors.email.message}</span>} */}
              </div>
              <div className="w-full flex flex-col gap-2">
                <input type='password' placeholder='Senha' className='w-full px-2 py-2 text-black text-sm font-normal rounded-lg border-2 border-grayBorder focus:outline-black'  />
                {/* {errors.password && <span className="text-sm text-black font-normal">{errors.password.message}</span>} */}
              </div>
              <div className="w-full flex flex-col gap-2">
                <input type='password' placeholder='Confirmar Senha' className='w-full px-2 py-2 text-black text-sm font-normal rounded-lg border-2 border-grayBorder focus:outline-black'  />
                {/* {errors.password && <span className="text-sm text-black font-normal">{errors.password.message}</span>} */}
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
  )
}