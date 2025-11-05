import { create } from "zustand";
import type { Mesite } from "../types/mesites";

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
