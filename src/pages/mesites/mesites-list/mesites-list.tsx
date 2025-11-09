import { useMesitesStore } from "../../../store/store";
import { Table } from "../../../components";
import { useEffect, useState } from "react";
import supabase from "../../../supabase-client";
import type { Column } from "../../../types/mesites";
import { columns } from "./constant";
import { MesitesDelete } from "../mesites-delete";

interface MesitesListProps {
  searchTerm: string;
}

export const MesitesList = ({ searchTerm }: MesitesListProps) => {
  const mesites = useMesitesStore((state) => state.mesites);
  const { setAllMesites, removeMesite } = useMesitesStore();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [nameToDelete, setNameToDelete] = useState('');
  const [idToDelete, setIdToDelete] = useState<number | null>(null);

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

  const handleDelete = async (id: number, name: string) => {
    setIsDeleteModalOpen(true);
    setIdToDelete(id);
    setNameToDelete(name);
  };

  const handleConfirmDelete = async () => {
    const { error } = await supabase
      .from('mesites')
      .delete()
      .eq('id', idToDelete);
    if (!error) {
      // Remove from store
      removeMesite(idToDelete ?? 0);
    }
    setIsDeleteModalOpen(false);
  };

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

  return (
    <div>
      {filteredMesites.length > 0 ? (
        <>
          <Table
            columns={columns as unknown as Column[]}
            data={filteredMesites}
            onDelete={handleDelete}
          />
          <MesitesDelete
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onDelete={handleConfirmDelete}
            nameToDelete={nameToDelete} />
        </>
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
