
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IProyecto } from "../types/IInterfaces";

interface IProyectoStore {

    proyectos: IProyecto[];
    proyectoActivo: IProyecto | null;
    setProyectoActivo: (proyectoActivo: IProyecto | null) => void;
    setArrayProyectos: (arrayDeSprint: IProyecto[]) => void;
    setAgregarProyecto: (nuevoSprint: IProyecto) => void;
    setEditarProyecto: (sprintActualizado: IProyecto) => void;
    setEliminarProyecto: (idProyecto: number) => void;
}

export const proyectoStrore = create<IProyectoStore>()(
  persist(
    (set) => ({
      proyectos: [],
      proyectoActivo: null,

      setProyectoActivo: (nuevoProyectoActivo) =>
        set(() => ({ proyectoActivo: nuevoProyectoActivo })),

      setArrayProyectos: (arrayProyectos) =>
        set(() => ({ proyectos: arrayProyectos })),

      setAgregarProyecto: (nuevoProyecto) =>
        set((state) => ({
          proyectos: [...state.proyectos, nuevoProyecto],
        })),

      setEditarProyecto: (proyectoEditado) =>
        set((state) => ({
          proyectos: state.proyectos.map((proyecto) =>
            proyecto.id === proyectoEditado.id
              ? { ...proyecto, ...proyectoEditado }
              : proyecto
          ),
        })),

      setEliminarProyecto: (idProyecto) =>
        set((state) => ({
          proyectos: state.proyectos.filter(
            (proyecto) => proyecto.id !== idProyecto
          ),
        })),
    }),
    {
      name: "proyecto-storage"
    }
  )
);