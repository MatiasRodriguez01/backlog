import { create } from "zustand";
import { ITarea } from "../types/ITarea";


interface ITareaStore {
    tareas: ITarea[]
    tareaActiva: ITarea|null;
    setTareaActiva:(tareaActiva: ITarea|null)=>void
    setArrayTareas: (arrayDeTareas:ITarea[])=>void
    agregarNuevaTarea: (nuevaTarea:ITarea)=>void
    editarUnaTarea: (tareaActualizada:ITarea)=>void
    eliminarUnaTarea: (nombreTarea: string)=>void

}

export const tareaStore = create<ITareaStore>((set)=>({
    tareas:[],
    tareaActiva: null,

    setArrayTareas: (arrayDeTareas)=>set(()=>({tareas: arrayDeTareas})),

    agregarNuevaTarea:(nuevaTarea) =>
        set((state) => ({ tareas: [...state.tareas, nuevaTarea]} )),

    editarUnaTarea: (tareaEditada) =>
        set((state)=>{
            const arregloTareas = state.tareas.map((tarea)=>tarea.titulo===tareaEditada.titulo ? {...tarea, tareaEditada}: tarea)
            return { tareas: arregloTareas}
        }),
    eliminarUnaTarea: (nombreTarea)=>
        set((state)=>{
            const arregloTareas = state.tareas.filter(
                (tarea) => tarea.titulo!==nombreTarea
            );
            return{tareas: arregloTareas}
        }),

    setTareaActiva:(tareaActivaIn)=> set(()=>({tareaActiva: tareaActivaIn})),

    
}))