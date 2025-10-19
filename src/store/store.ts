import { create } from "zustand";

export interface Mesite {
  id: number;
  name: string;
  address: string;
  evangelizationDate: string;
  contact: string;
  evangelizerName: string;
}

interface MesitesState {
  mesites: Mesite[];
  addMesite: (mesite: Omit<Mesite, "id">) => void;
  removeMesite: (id: number) => void;
}

export const useMesitesStore = create<MesitesState>((set) => ({
  mesites: [
    {
      id: 1,
      name: "Ethan Carter",
      address: "123 Maple Street, Anytown",
      evangelizationDate: "2024-07-20",
      contact: "555-1234",
      evangelizerName: "Pastor David",
    },
    {
      id: 2,
      name: "Olivia Bennett",
      address: "456 Oak Avenue, Anytown",
      evangelizationDate: "2024-07-15",
      contact: "555-5678",
      evangelizerName: "Sister Mary",
    },
  ],
  addMesite: (mesite) =>
    set((state) => ({
      mesites: [...state.mesites, { id: Date.now(), ...mesite }],
    })),
  removeMesite: (id) =>
    set((state) => ({
      mesites: state.mesites.filter((m) => m.id !== id),
    })),
}));
