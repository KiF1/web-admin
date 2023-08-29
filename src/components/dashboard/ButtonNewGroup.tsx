'use client'

import { api } from '@/lib/api';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { Users, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface Props {
  refetch : () => void;
}

const validationGroupFormSchema = z.object({
  name: z.string().min(1, { message: 'Informe um nome válido' }),
  email: z.string().min(1, { message: 'Informe um email válido' }).email(),
  password: z.string().min(6, "Informe a Senha correta"),
});

type validationFormData = z.infer<typeof validationGroupFormSchema>

export function ButtonNewGroup({ refetch }: Props){
  const [error, setError] = useState<boolean | null>(null);
  const { handleSubmit, register, reset, formState: { isSubmitting, errors } } = useForm<validationFormData>({
    resolver: zodResolver(validationGroupFormSchema)
  });

  async function handleGroup(data: validationFormData){
    try {
      await api.post('/admin/representantes', data, { headers: { 'Content-Type': 'application/json' } }).then(() => {
        setError(false);
        reset();
        refetch();
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

  return(
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button type='submit' className='w-fit px-4 py-2 bg-black text-white rounded-lg text-lg font-bold font-serif text-center'><Users className='w-6 h-6' color='white' /></button>
        </Dialog.Trigger>
        <Dialog.Portal className='w-full h-screen'>
          <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          <Dialog.Content className="w-[85%] md:w-[65%] lg:w-[30%] h-fit p-8 rounded-md top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white fixed z-[100] focus-visible:outline-0 transition-all">
              <div className='w-full flex justify-between items-center mb-8'>
                <h1 className='text-2xl text-center flex-1 font-sans font-bold text-black'>Criar Representante</h1>
                <Dialog.Close asChild>
                    <X className="w-12 h-12 right-4 cursor-pointer" color='#000000' aria-label="Close"/>
                </Dialog.Close>
              </div>
            <form onSubmit={handleSubmit(handleGroup)} className='flex flex-col gap-4'>
              <div className="w-full flex flex-col gap-2">
                <input {...register('name')}  type='text' placeholder='Nome' className='w-full px-2 py-2 text-black text-sm font-normal rounded-lg border-2 border-grayBorder focus:outline-black'  />
                {errors.name && <span className="text-sm text-black font-normal">{errors.name.message}</span>}
              </div>
              <div className="w-full flex flex-col gap-2">
                <input {...register('email')} type='email' placeholder='E-mail' className='w-full px-2 py-2 text-black text-sm font-normal rounded-lg border-2 border-grayBorder focus:outline-black'  />
                {errors.email && <span className="text-sm text-black font-normal">{errors.email.message}</span>}
              </div>
              <div className="w-full flex flex-col gap-2">
                <input {...register('password')} type='password' placeholder='Senha' className='w-full px-2 py-2 text-black text-sm font-normal rounded-lg border-2 border-grayBorder focus:outline-black'  />
                {errors.password && <span className="text-sm text-black font-normal">{errors.password.message}</span>}
              </div>
              {error ? <span className="w-full text-sm text-black font-normal">Erro ao realizar atividade</span> : error === false ? <span className="w-full text-sm text-black font-normal">Sucesso ao realizar atividade</span> : <></>}
              <button disabled={isSubmitting} data-disabled={isSubmitting} type='submit' className='w-full px-8 py-3 bg-black text-white rounded-lg text-lg font-bold font-serif text-center data-[disabled=true]:cursor-not-allowed data-[disabled=true]:bg-black'>Criar</button>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
  )
}