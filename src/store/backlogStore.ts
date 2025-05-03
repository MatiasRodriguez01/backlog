
import { create } from 'zustand'
import { ITarea } from '../types/IInterfaces'

interface IBacklogStore {
    tareasBacklog: ITarea[];
    tareaBacklogActiva: ITarea | null;
    setTareasBacklog: (arrayTareas: ITarea[]) => void;
    setTareaActivaBacklog: (tarea: ITarea | null) => void;
    setAgregarTarea: (nuevaTarea: ITarea) => void;
    setEditarTarea: (tareaEditada: ITarea) => void;
    setEliminarTarea: (idTarea: string) => void;
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
            tarea._id === tareaActualizada._id ? {...tarea, ...tareaActualizada} : tarea
        );
        return { tareasBacklog: result };
    }),
    setEliminarTarea: (tareaEliminada) => set((state) => {
        const result = state.tareasBacklog.filter((tarea) => 
            tarea._id !== tareaEliminada
        );
        return { tareasBacklog: result };
    })
})
)

export default backlogStore
