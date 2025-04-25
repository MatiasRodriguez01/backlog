
import { create } from 'zustand'
import { ITareaBacklog } from '../types/IInterfaces'

interface IBacklogStore {
    tareasBacklog: ITareaBacklog[];
    tareaBacklogActiva: ITareaBacklog | null;
    setTareasBacklog: (arrayTareas: ITareaBacklog[]) => void;
    setTareaActivaBacklog: (tarea: ITareaBacklog | null) => void;
    setAgregarTarea: (nuevaTarea: ITareaBacklog) => void;
    setEditarTarea: (tareaEditada: ITareaBacklog) => void;
    setEliminarTarea: (idTarea: number) => void;
}

export const backlogStore = create<IBacklogStore>((set) => ({
    tareasBacklog: [],
    tareaBacklogActiva: null,
    setTareasBacklog: (arrayTareas) => set(() => ({
        tareasBacklog: arrayTareas
    })), 
    setTareaActivaBacklog: (tarea) => set(() => ({
        tareaBacklogActiva: tarea
    })),
    setAgregarTarea: (nuevaTarea) => set((state) => ({
        tareasBacklog: [...state.tareasBacklog, nuevaTarea]
    })), 
    setEditarTarea: (tareaActualizada) => set((state) => {
        const result = state.tareasBacklog.map((tarea) => 
            tarea.id === tareaActualizada.id ? {...tarea, ...tareaActualizada} : tarea
        );
        return { tareasBacklog: result };
    }),
    setEliminarTarea: (tareaEliminada) => set((state) => {
        const result = state.tareasBacklog.filter((tarea) => 
            tarea.id !== tareaEliminada
        );
        return { tareasBacklog: result };
    })
})
)

export default backlogStore
