import { create } from "zustand";
import { ISpring } from "../types/IInterfaces";

interface IProyectoStore {
    springs: ISpring[];
    springActivo: ISpring | null;
    setSpringActivo: (springActivo: ISpring | null) => void;
    setSprings: (arraySprings: ISpring[]) => void;
    setCrearSpring: (nuevoSprint: ISpring) => void;
    setEditarSpring: (sprintActualizado: ISpring) => void;
    setEliminarSpring: (idSpring: string) => void;
}

export const springStore = create<IProyectoStore>((set) => ({

    springs: [], // proyectos
    springActivo: null,  // proyecto activo

    // setear un proyecto activo
    setSpringActivo: (springActivo) => set(() => ({
        springActivo: springActivo
    })),

    setSprings: (arraySprings) => set(() => ({
        springs: arraySprings
    })),

    setCrearSpring: (nuevoSpring) => set((state) => ({
        springs: [...state.springs, nuevoSpring]
    })),

    setEditarSpring: (sprintActualizado) => set((state) => {
        const arregloSprings = state.springs.map((spring) =>
            spring._id === sprintActualizado._id ? { ...spring, ...sprintActualizado } : spring
        );
        return { springs: arregloSprings }
    }),

    setEliminarSpring: (idSpring) => set((state) => {
        const arregloSprings = state.springs.filter((spring) => spring._id !== idSpring);
        return { springs: arregloSprings }
    })
}
))