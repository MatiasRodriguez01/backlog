import { create } from "zustand";
import { IProyecto, ITarea } from "../types/IInterfaces";

interface ITareaStore {
    tareas: ITarea[],
    tareasPorProyecto: ITarea[],
    tareaActiva: ITarea | null,
    setTareaActiva: (tarea: ITarea | null) => void,
    setTareas: (arrayTareas: ITarea[]) => void,
    setTareasPorProyecto: (proyectoActivo: IProyecto) => void,
    setAgregarTarea: (nuevaTarea: ITarea) => void;
    setEditarTarea: (tareaEditada: ITarea) => void;
    setEliminarTarea: (idTarea: string) => void;
}

export const tareaStore = create<ITareaStore>((set)=>({
    tareas: [],
    tareasPorProyecto: [],
    tareaActiva: null,
    setTareaActiva: (tarea) => set(() => ({
        tareaActiva: tarea
    })),
    setTareas: (arrayTareas: ITarea[]) => set(() => ({
        tareas: arrayTareas 
    })),
    setTareasPorProyecto: (proyectoActivo: IProyecto) => set(() => {
        const tareas_nuevas = proyectoActivo.tareas?.filter((tarea) => (tarea?.idProyecto === proyectoActivo?.id));
        return { tareasPorProyecto: tareas_nuevas }
    
    }),
    setAgregarTarea : (nuevaTarea) => set((state) => ({
        tareas: [...state.tareasPorProyecto, nuevaTarea]
    })),
    setEditarTarea: (tareaEditada) => set((state) => {
        const result = state.tareasPorProyecto.map((tarea) => 
            tarea.id === tareaEditada.id ? { ...tarea, tareaEditada } : tarea
        );
        return { tareasPorProyecto: result }
    }), 
    setEliminarTarea: (idTarea) => set((state) => {
        const result = state.tareasPorProyecto.filter((tarea) => 
            tarea.id !== idTarea 
        );
        return { tareasPorProyecto: result }
    })
}
))