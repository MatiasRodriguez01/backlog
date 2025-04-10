export interface IProyectosList {
    proyectos: IProyecto[]
}

export interface IBacklog {
    tareas: ITarea[]
}

export interface IProyecto {
    id?: number,
    nombre: string
    descripcion: string
    fechaInicio: string
    fechaCierre: string
    tareas: ITarea[]
}

export interface ITarea {
    id?:number
    idProyecto?: string
    titulo:string
    estado: string
    descripcion: string
    fechaLimite: string
}

export interface ITareaBacklog {
    id?:number
    idProyecto?: string
    titulo:string
    estado: string
    string: string
    descripcion: string
    fechaLimite: string
}
