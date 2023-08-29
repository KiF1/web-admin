'use client'

import { FolderUp, Pencil, Trash } from "lucide-react";
import { ButtonNewTodo } from "./ButtonNewTodo";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { RepresentanteStatistics } from "@/app/dashboard/page";
import { TodoWithoutRepresentante } from "./TodoWithoutRepresentante";
import { useEffect, useState } from "react";

interface Props{
  representantes: RepresentanteStatistics[]
}

export interface Todo{
  id: number;
  cod: string;
  product_id: string;
  price: string;
}

export function Tasks({ representantes }: Props){
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<boolean | null>(null);

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const { data: todosWithoutRepresentantes, refetch: refetchTodosWithoutRepresentantes } = useQuery<Todo[]>(['todosWithoutRepresentantes'], async () => {
    const response = await api.get('/to-dos/without-representante');
    return response.data;
  });

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('txt_file', selectedFile);

      api.post('admin/save-todo-file', formData)
        .then(() => {
          setError(false)
          refetchTodosWithoutRepresentantes()
        })
        .catch(() => setError(true));
      }
    };

    useEffect(() => {
      setTimeout(() => {
        setError(null)
        setSelectedFile(null)
      }, 5000)
    }, [error])


  return(
    <div className="w-full flex flex-col bg-white shadow-lg rounded-lg gap-4 p-6">
      <strong className="text-xl text-black font-bold">A Fazeres</strong>
      <div className="w-full flex flex-col gap-4 pb-8 border-b-2 border-b-gray-200">
        <input name="coverUrl" accept=".txt" type="file" id="media" onChange={handleFileChange} className="invisible h-0 w-0" />
          <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-8">
            <ButtonNewTodo refetch={refetchTodosWithoutRepresentantes} />
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="media" className="w-full p-4 bg-black text-white rounded-md flex justify-center items-center gap-4">
                <FolderUp className="w-6 h-6" color="white" />
                Upload Lista
              </label>
              {selectedFile && <span className="w-full text-sm text-black font-normal">Arquivo selecionado: {selectedFile.name}</span>}
              {selectedFile && <button onClick={handleUpload} className="w-full p-4 bg-black text-white rounded-md text-center">Enviar Arquivo</button>}
              {error ? <span className="w-full text-sm text-black font-normal">Erro ao realizar atividade</span> : error === false ? <span className="w-full text-sm text-black font-normal">Sucesso ao realizar atividade</span> : <></>}
            </div>
          </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {todosWithoutRepresentantes !== undefined && todosWithoutRepresentantes.map(item => (
            <TodoWithoutRepresentante key={item.id} todo={item} representantes={representantes} refetch={refetchTodosWithoutRepresentantes} />
          ))}
        </div>
    </div>
  </div>
  )
}