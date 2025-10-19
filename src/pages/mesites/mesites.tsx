import { MesitesForm } from "./mesites-form"
import { MesitesList } from "./mesites-list"

export const Mesites = () => {
  return (
    <>
      <h1 className="text-2xl font-bold text-primary mb-4">Mesites</h1>

      <div className="p-8 bg-white rounded-lg shadow">
        <MesitesForm />
      </div>

      <div className="mt-8">
        <MesitesList />
      </div>
    </>
  )
}
