import { create } from "zustand";
import { ISprint } from "../types/ISprint";



interface ISprintStore {
    sprints: ISprint[]
    sprintActivo: ISprint|null;
    setSprintActivo:(sprintActivo: ISprint|null)=>void
    setArraySprint: (arrayDeSprint:ISprint[])=>void
    agregarNuevoSprint: (nuevoSprint:ISprint)=>void
    editarUnSprint: (sprintActualizado:ISprint)=>void
    eliminarUnSprint: (nombreSprint: string)=>void

}

export const sprintStore = create<ISprintStore>((set)=>({
    sprints:[],
    sprintActivo: null,

    setArraySprint: (arrayDeSprint)=>set(()=>({sprints: arrayDeSprint})),

    //agregamos una sprint

    agregarNuevoSprint:(nuevoSprint) =>
        set((state) => ({ sprints: [...state.sprints, nuevoSprint]} )),


    //editamos una sprint

    editarUnSprint: (sprintEditado) =>
        set((state)=>{
            const arregloSprint = state.sprints.map((sprint)=>sprint.nombre===sprintEditado.nombre ? {...sprint, sprintEditado}: sprint)
            return { sprints: arregloSprint}
        }),
 
    //eliminamos una sprint

    eliminarUnSprint: (nombreSprint)=>
        set((state)=>{
            const arregloSprint = state.sprints.filter(
                (sprint) => sprint.nombre!==nombreSprint
            );
            return{sprints: arregloSprint}
        }),


    //setear la sprint activa
     setSprintActivo:(sprintActivoIn)=> set(()=>({sprintActivo: sprintActivoIn})),

    
}
))