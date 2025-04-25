
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ITarea } from "../types/IInterfaces";

interface ITareaStore {
  tareas: ITarea[],
  tareaActiva: ITarea | null,
  setTareaActiva: (tarea: ITarea | null) => void,
  setTareas: (arrayTareas: ITarea[]) => void,
  setAgregarTarea: (nuevaTarea: ITarea) => void;
  setEditarTarea: (tareaEditada: ITarea) => void;
  setEliminarTarea: (idTarea: string) => void;
}

export const tareaStore = create(
  persist<ITareaStore>(
    (set) => ({
      tareas: [],
      tareaActiva: null,

      setTareaActiva: (tarea) => set(() => ({
        tareaActiva: tarea
      })),

      setTareas: (arrayTareas) => set(() => ({
        tareas: arrayTareas
      })),

      setAgregarTarea: (nuevaTarea) => set((state) => ({
        tareas: [...state.tareas, nuevaTarea]
      })),

      setEditarTarea: (tareaEditada) => set((state) => {
        const result = state.tareas.map((tarea) =>
          tarea.id === tareaEditada.id ? { ...tarea, ...tareaEditada } : tarea
        );
        return { tareas: result };
      }),

      setEliminarTarea: (idTarea) => set((state) => {
        const result = state.tareas.filter((tarea) =>
          tarea.id !== idTarea
        );
        return { tareas: result };
      }),
    }),
    {
      name: 'tarea-storage',
    }
  )
);
