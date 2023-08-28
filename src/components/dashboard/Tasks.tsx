import { FolderUp, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { ButtonNewTodo } from "./ButtonNewTodo";

export function Tasks(){

  return(
    <div className="w-full flex flex-col bg-white shadow-lg rounded-lg gap-4 p-6">
      <strong className="text-xl text-black font-bold">A Fazeres</strong>
      <div className="w-full flex flex-col gap-4 pb-8 border-b-2 border-b-gray-200">
        <input name="coverUrl" accept=".txt" type="file" id="media" className="invisible h-0 w-0" />
        <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-8">
          <ButtonNewTodo />
          <label htmlFor="media" className="w-full p-4 bg-black text-white rounded-md flex justify-center items-center gap-4">
            <FolderUp className="w-6 h-6" color="white" />
            Upload Lista
          </label>
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="w-full shadow-2xl bg-white p-8 flex flex-col justify-center rounded-md items-center gap-2">
              <strong className="text-lg font-bold">Id: 1339-1094-1449-2</strong>
              <span className="text-lg font-bold">Código: 222030</span>
              <span className="text-lg font-bold">R$ 1200</span>
              <select className='w-full bg-grayBack text-black text-sm px-4 py-2 rounded-lg'>
                <option value="">Escolha o Grupo</option>
                <option value="1">Kifizin</option>
                <option value="2">LLucas Semana</option>
                <option value="3">KAXHS</option>
            </select>
          </div>
        </div>
    </div>
  </div>
  )
}