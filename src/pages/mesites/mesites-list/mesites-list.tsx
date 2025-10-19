import { Table } from '../../../components';
import { useMesitesStore } from '../../../store/store';

export const MesitesList = () => {

  const mesitesData = useMesitesStore((state) => state.mesites);

  const columns = [
    { key: "name", label: "Nombre" },
    { key: "address", label: "Direccion" },
    { key: "evangelizationDate", label: "Fecha de Evangelizacion" },
    { key: "contact", label: "Contacto" },
    { key: "evangelizerName", label: "Evangelizador" }
  ];

  return (
    <>
      <h2 className="text-left text-3xl font-bold text-gray-800 pb-4">Personas Evangelizadas</h2>
      <Table columns={columns} data={mesitesData} />
    </>
  )
}
