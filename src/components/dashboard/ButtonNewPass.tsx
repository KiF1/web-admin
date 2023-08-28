'use client'

import { api } from '@/lib/api';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { BookKey, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const validationPassCodeFormSchema = z.object({
  code: z.number().min(1, { message: 'Informe código válido' }),
});

type validationFormData = z.infer<typeof validationPassCodeFormSchema>

export function ButtonNewPass(){
  const [error, setError] = useState<boolean | null>(null);
  const { handleSubmit, register, reset, formState: { isSubmitting, errors } } = useForm<validationFormData>({
    resolver: zodResolver(validationPassCodeFormSchema)
  });

  async function handlePassCode(data: validationFormData){
    try {
      await api.post('/admin/create-code-pass', data, { headers: { 'Content-Type': 'application/json' } }).then(() =>{
        setError(false)
        reset()
      });
    }catch{
      setError(true);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setError(null)
    }, 5000)
  }, [error])
  
  return (
    <Dialog.Root>
        <Dialog.Trigger asChild>
          <button type='submit' className='w-fit px-4 py-2 bg-black text-white rounded-lg text-lg font-bold font-sans text-center mt-2'><BookKey className='w-6 h-6' color='white' /></button>
        </Dialog.Trigger>
        <Dialog.Portal className='w-full h-screen'>
          <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          <Dialog.Content className="w-[85%] md:w-[65%] lg:w-[30%] h-fit p-8 rounded-md top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white fixed z-[100] focus-visible:outline-0 transition-all">
              <div className='w-full flex justify-between items-center mb-8'>
                <h1 className='text-2xl text-center flex-1 font-sans font-bold text-black'>Criar Pass-Code</h1>
                <Dialog.Close asChild>
                    <X className="w-12 h-12 right-4 cursor-pointer" color='#000000' aria-label="Close"/>
                </Dialog.Close>
              </div>
            <form onSubmit={handleSubmit(handlePassCode)} className='flex flex-col gap-4'>
              <div className="w-full flex flex-col gap-2">
                <input {...register('code', { valueAsNumber: true })} type='number' placeholder='Insira o Código' className='w-full px-2 py-2 text-black text-sm font-sans rounded-lg border-2 border-grayBorder focus:outline-black'  />
                {errors.code && <span className="text-sm text-black font-normal">{errors.code.message}</span>}
              </div>
              {error ? <span className="w-full text-sm text-black font-normal">Erro ao realizar atividade</span> : error === false ? <span className="w-full text-sm text-black font-normal">Sucesso ao realizar atividade</span> : <></>}
              <button disabled={isSubmitting} data-disabled={isSubmitting} type='submit' className='w-full px-8 py-3 bg-black text-white rounded-lg text-lg font-bold font-serif text-center data-[disabled=true]:cursor-not-allowed data-[disabled=true]:bg-black'>Criar</button>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
  )
}