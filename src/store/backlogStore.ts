
import { create } from 'zustand'
import { ITarea } from '../types/IInterfaces'

interface IBacklogStore {
    tareas: ITarea[];
    tareaActiva: ITarea | null;
    setTareas: (arrayTareas: ITarea[]) => void;
    setTareaActiva: (tarea: ITarea | null) => void;
    setAgregarTarea: (nuevaTarea: ITarea) => void;
    setEditarTarea: (tareaEditada: ITarea) => void;
    setEliminarTarea: (idTarea: string) => void;
}

export const backlogStore = create<IBacklogStore>((set) => ({
    tareas: [],
    tareaActiva: null,
    setTareas: (arrayTareas) => set(() => ({
        tareas: arrayTareas
    })), 
    setTareaActiva: (tarea) => set(() => ({
        tareaActiva: tarea
    })),
    setAgregarTarea: (nuevaTarea) => set((state) => ({
        tareas: [...state.tareas, nuevaTarea]
    })), 
    setEditarTarea: (tareaActualizada) => set((state) => {
        const result = state.tareas.map((tarea) => 
            tarea.id === tareaActualizada.id ? {...tarea, tareaActualizada} : tarea
        );
        return { tareas: result };
    }),
    setEliminarTarea: (tareaEliminada) => set((state) => {
        const result = state.tareas.filter((tarea) => 
            tarea.id === tareaEliminada
        );
        return { tareas: result };
    })
})
)

export default backlogStore
