import { useMesitesStore } from "../../../store/store";
import { Table } from "../../../components";
import { useEffect } from "react";
import supabase from "../../../supabase-client";
import type { Column } from "../../../types/mesites";

interface MesitesListProps {
  searchTerm: string;
}

export const MesitesList = ({ searchTerm }: MesitesListProps) => {
  const mesites = useMesitesStore((state) => state.mesites);
  const { setAllMesites } = useMesitesStore();

  useEffect(() => {
    // Fetch mesites from Supabase and set in store
    const fetchMesites = async () => {
      const { data, error } = await supabase.from('mesites').select('*');
      if (error) {
        console.error('Error fetching mesites:', error);
      } else if (data) {
        const formattedMesites = data.map((item) => ({
          id: item.id,
          name: item.name,
          address: item.address,
          evangelizationDate: item.evangelization_date,
          contact: item.contact,
          evangelizerName: item.evangelizer_name
        }));
        setAllMesites(formattedMesites);
      }
    };

    fetchMesites();
  }, [setAllMesites]);

  // Filter mesites based on search term
  const filteredMesites = (mesites ?? []).filter((mesite) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      mesite.name.toLowerCase().includes(searchLower) ||
      mesite.address.toLowerCase().includes(searchLower) ||
      mesite.contact.toLowerCase().includes(searchLower) ||
      mesite.evangelizerName.toLowerCase().includes(searchLower) ||
      mesite.evangelizationDate.includes(searchTerm)
    );
  });

  const columns = [
    { key: "name", label: "Nombre" },
    { key: "address", label: "Dirección" },
    { key: "evangelizationDate", label: "Fecha de Evangelización" },
    { key: "contact", label: "Contacto" },
    { key: "evangelizerName", label: "Evangelizador" }
  ];

  return (
    <div>
      {filteredMesites.length > 0 ? (
        <Table columns={columns as unknown as Column[]} data={filteredMesites} />
      ) : (
        <div className="text-center py-8 text-gray-500">
          {searchTerm ?
            `No se encontraron resultados para "${searchTerm}"` :
            "No hay personas registradas"
          }
        </div>
      )}
    </div>
  );
};