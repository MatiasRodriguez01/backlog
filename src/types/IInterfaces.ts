export interface IProyectosList {
    proyectos: IProyecto[]
}

export interface IProyecto {
    id?: string,
    nombre: string
    descripcion: string
    fechaInicio: string
    fechaCierre: string
    tareas: ITareas[]
}

export interface ITareas {
    id?:string
    titulo:string
    descripcion: string
    fechaInicio: string
    fechaFin:string
}

