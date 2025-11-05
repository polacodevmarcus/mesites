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
  setAllMesites: (mesites: Mesite[]) => void;
  addMesite: (mesite: Omit<Mesite, "id">) => void;
  removeMesite: (id: number) => void;
}

export const useMesitesStore = create<MesitesState>((set) => ({
  mesites: [],
  setAllMesites: (mesites) =>
    set(() => ({
      mesites: mesites,
    })),
  addMesite: (mesite) =>
    set((state) => ({
      mesites: [...state.mesites, { id: Date.now(), ...mesite }],
    })),
  removeMesite: (id) =>
    set((state) => ({
      mesites: state.mesites.filter((m) => m.id !== id),
    })),
}));
