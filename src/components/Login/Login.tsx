'use client'


import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

const validationLoginFormSchema = z.object({
  email: z.string().min(1, { message: 'Informe um email válido' }).email(),
  password: z.string().min(6, "Informe a Senha correta"),
}); 

type validationFormData = z.infer<typeof validationLoginFormSchema>

export function Login(){
  const [error, setError] = useState(false);
  const { handleSubmit, register, formState: { isSubmitting, errors } } = useForm<validationFormData>({
    resolver: zodResolver(validationLoginFormSchema)
  });
  const router = useRouter();

  async function handleLogin(data: validationFormData){

    try {
      await api.post('/login', data, { headers: { 'Content-Type': 'application/json' } }).then(response => {
        const combinedValue =  response.data.access_token + '|' + response.data.role
        Cookies.set('token_role', combinedValue , { expires: 5, path: '/' })
        router.push('/dashboard');
      });
    }catch{
      setError(true);
    }
  }
  
  return(
    <div className="w-full min-h-screen relative">
      <form onSubmit={handleSubmit(handleLogin)} className='w-[85%] md:w-[65%] lg:w-[30%] m-auto rounded-2xl flex flex-col p-10 items-center gap-8 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[rgb(240, 242, 245)] shadow-2xl'>
        <h1 className='text-xl  font-serif text-black'>Fazer login</h1>
        <fieldset className='w-full flex flex-col gap-6 m-auto items-center'>
          <div className="w-full flex flex-col gap-2">
            <input {...register('email')} type='email' placeholder='E-mail' className='w-full px-2 py-2 text-black text-sm font-normal rounded-lg border-2 border-grayBorder focus:outline-black'  />
            {errors.email && <span className="text-sm text-black font-normal">{errors.email.message}</span>}
          </div>
          <div className="w-full flex flex-col gap-2">
            <input {...register('password')} type='password' placeholder='Senha' className='w-full px-2 py-2 text-black text-sm font-normal rounded-lg border-2 border-grayBorder focus:outline-black'  />
            {errors.password && <span className="text-sm text-black font-normal">{errors.password.message}</span>}
          </div>
          {error && <span className="w-full text-sm text-black font-normal">Email ou senha inválidos</span>}
          <button disabled={isSubmitting} data-disabled={isSubmitting} type='submit' className='w-full px-8 py-3 bg-black text-white rounded-lg text-lg font-bold font-serif text-center data-[disabled=true]:cursor-not-allowed data-[disabled=true]:bg-black'>Entrar</button>
        </fieldset>
      </form>
    </div>
  )
}