import { create } from "zustand";
import { IProyecto } from "../types/IInterfaces";

interface IProyectoStore {
    proyectos: IProyecto[]
    proyectoActivo: IProyecto | null;
    setProyectotActivo: (proyectoActivo: IProyecto | null) => void
    setArrayProyectos: (arrayDeSprint: IProyecto[]) => void
    setAgregarProyecto: (nuevoSprint: IProyecto) => void
    setEditarProyecto: (sprintActualizado: IProyecto) => void
    setEliminarProyecto: (idProyecto: string) => void
 
}

export const proyectoStrore = create<IProyectoStore>((set) => ({

    proyectos: [], // proyectos
    proyectoActivo: null,  // proyecto activo

    // setear un proyecto activo
    setProyectotActivo: (nuevoProyectoActivo) => set(() => ({
        proyectoActivo: nuevoProyectoActivo
    })),

    setArrayProyectos: (arrayProyectos) => set(() => ({
        proyectos: arrayProyectos
    })),

    setAgregarProyecto: (nuevoProyecto) => set((state) => ({
        proyectos: [...state.proyectos, nuevoProyecto]
    })),

    setEditarProyecto: (proyectoEditado) => set((state) => {
        const arregloProyecto = state.proyectos.map((proyecto) =>
            proyecto.id === proyectoEditado.id ? { ...proyecto, ...proyectoEditado } : proyecto
        );
        return { proyectos: arregloProyecto }
    }),

    setEliminarProyecto: (idProyecto) => set((state) => {
        const arregloProyecto = state.proyectos.filter((proyecto) => proyecto.id !== idProyecto);
        return { proyectos: arregloProyecto }
    })
}
))