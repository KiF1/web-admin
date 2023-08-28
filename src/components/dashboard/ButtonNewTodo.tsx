'use client'

import { api } from '@/lib/api';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { useQuery } from '@tanstack/react-query';
import { ClipboardList, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const validationTodoFormSchema = z.object({
  product_id: z.number().min(1, { message: 'Informe um id válido' }),
  cod: z.string().min(1, { message: 'Informe um código válido' }),
  price: z.string().min(1, "Informe um preço"),
});

type validationFormData = z.infer<typeof validationTodoFormSchema>

export function ButtonNewTodo(){
  const [error, setError] = useState<boolean | null>(null);
  const { handleSubmit, register, reset, formState: { isSubmitting, errors } } = useForm<validationFormData>({
    resolver: zodResolver(validationTodoFormSchema)
  });

  const { data  } = useQuery(['groups'], async () => {
    const response = await api.get('/admin/representantes');
    return response.data.data;
  });

  console.log(data)

  async function handleTodo(data: validationFormData){
    try {
      await api.post('/admin/to-dos', data, { headers: { 'Content-Type': 'application/json' } }).then(() => {
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

  return(
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button type='submit' className='w-full p-4 bg-black text-white rounded-md flex justify-center items-center gap-4'>
            <ClipboardList className="w-6 h-6" color="white" />
            <span>Novo To-do</span>
          </button>
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
            <form onSubmit={handleSubmit(handleTodo)} className='flex flex-col gap-4'>
              <div className="w-full flex flex-col gap-2">
                <input {...register('product_id')}  type='number' placeholder='Id do produto' className='w-full px-2 py-2 text-black text-sm font-normal rounded-lg border-2 border-grayBorder focus:outline-black'  />
                {errors.product_id && <span className="text-sm text-black font-normal">{errors.product_id.message}</span>}
              </div>
              <div className="w-full flex flex-col gap-2">
                <input {...register('cod')} type='text' placeholder='Código' className='w-full px-2 py-2 text-black text-sm font-normal rounded-lg border-2 border-grayBorder focus:outline-black'  />
                {errors.cod && <span className="text-sm text-black font-normal">{errors.cod.message}</span>}
              </div>
              <div className="w-full flex flex-col gap-2">
                <input {...register('price')} type='number' placeholder='Preço' className='w-full px-2 py-2 text-black text-sm font-normal rounded-lg border-2 border-grayBorder focus:outline-black'  />
                {errors.price && <span className="text-sm text-black font-normal">{errors.price.message}</span>}
              </div>
              <select className='w-full bg-grayBack text-black text-sm px-4 py-2 rounded-lg'>
                  <option value="">Escolha um Grupo</option>
                  <option value="1">Kifizin</option>
                  <option value="2">LLucas Semana</option>
                  <option value="3">KAXHS</option>
              </select>
              {error ? <span className="w-full text-sm text-black font-normal">Erro ao realizar atividade</span> : error === false ? <span className="w-full text-sm text-black font-normal">Sucesso ao realizar atividade</span> : <></>}
              <button disabled={isSubmitting} data-disabled={isSubmitting} type='submit' className='w-full px-8 py-3 bg-black text-white rounded-lg text-lg font-bold font-serif text-center data-[disabled=true]:cursor-not-allowed data-[disabled=true]:bg-black'>Criar</button>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
  )
}