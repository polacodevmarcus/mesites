import { useState } from "react";
import { Button, Input } from "../../components"
import { MesitesForm } from "./mesites-form"
import { MesitesList } from "./mesites-list"

export const Mesites = () => {
  const [isModalFormOpen, setIsModalFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <h1 className="text-4xl font-light bg-clip-text bg-gradient-to-r text-primary">
        MESITES
      </h1>

      <div className="mt-8">
        <h2 className="text-left text-3xl font-bold text-gray-800 pb-4">Personas Evangelizadas</h2>
        <div className="flex flex-row justify-between items-center gap-2 mb-4">
          <div className="w-full">
            <Input
              id="search"
              icon="search"
              type="text"
              placeholder="Buscar por nombre, direccion, etc."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div>
            <Button
              icon="add"
              name="Agregar"
              onClick={() => setIsModalFormOpen(true)}
            />
          </div>
        </div>
        <MesitesForm
          isOpen={isModalFormOpen}
          onClose={() => setIsModalFormOpen(false)}
        />
        <MesitesList searchTerm={searchTerm} />
      </div>
    </>
  )
}