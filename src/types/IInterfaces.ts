export interface IProyectosList {
    proyectos: IProyecto[]
}

export interface IBacklog {
    tareas: ITarea[]
}

export interface IProyecto {
    id?: string,
    nombre: string
    descripcion: string
    fechaInicio: string
    fechaCierre: string
    tareas: ITarea[]
}

export interface ITarea {
    id?:string
    idProyecto?: string
    titulo:string
    estado: string
    descripcion: string
    fechaLimite: string
}

export interface ITareaBacklog {
    id?:string
    idProyecto?: string
    titulo:string
    estado: string
    string: string
    descripcion: string
    fechaLimite: string
}
