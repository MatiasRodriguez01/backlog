

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ITareaBacklog } from '../types/IInterfaces';

interface IBacklogStore {

    tareasBacklog: ITareaBacklog[];
    tareaBacklogActiva: ITareaBacklog | null;
    setTareasBacklog: (arrayTareas: ITareaBacklog[]) => void;
    setTareaActivaBacklog: (tarea: ITareaBacklog | null) => void;
    setAgregarTarea: (nuevaTarea: ITareaBacklog) => void;
    setEditarTarea: (tareaEditada: ITareaBacklog) => void;
    setEliminarTarea: (idTarea: number) => void;

}

export const backlogStore = create<IBacklogStore>()(
  persist(
    (set) => ({
      tareasBacklog: [],
      tareaBacklogActiva: null,

      setTareasBacklog: (arrayTareas) =>
        set(() => ({ tareasBacklog: arrayTareas })),

      setTareaActivaBacklog: (tarea) =>
        set(() => ({ tareaBacklogActiva: tarea })),

      setAgregarTarea: (nuevaTarea) =>
        set((state) => ({
          tareasBacklog: [...state.tareasBacklog, nuevaTarea],
        })),

      setEditarTarea: (tareaActualizada) =>
        set((state) => ({
          tareasBacklog: state.tareasBacklog.map((tarea) =>
            tarea.id === tareaActualizada.id
              ? { ...tarea, ...tareaActualizada }
              : tarea
          ),
        })),

      setEliminarTarea: (idTarea) =>
        set((state) => ({
          tareasBacklog: state.tareasBacklog.filter(
            (tarea) => tarea.id !== idTarea
          ),
        })),
    }),
    {
      name: 'backlog-storage'
    }
  )
);

export default backlogStore;

