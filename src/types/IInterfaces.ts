
export interface IProyectosList {
    proyectos: ISpring[]
}

export interface IBacklog {
    tareas: ITarea[]
}

export interface ISpring {
    _id: string
    nombre: string
    fecha_inicio: string
    fecha_cierre: string
    tareas: ITarea[]
    color: string
}

export interface ITarea {
    _id:string
    titulo:string
    descripcion: string
    estado: string
    fechaLimite: string
    color: string
}

