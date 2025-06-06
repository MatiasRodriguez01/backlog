import { useShallow } from "zustand/shallow"
import Swal from "sweetalert2";
import { IProyecto } from "../types/IInterfaces";
import { createProyectoController, deleteProyectoController, editProyectoController, getProyectosController } from "../https/proyectos/proyectoController";
import { proyectoStrore } from "../store/proyectoStore";


export const useProyecto = () => {

  const {
    proyectos,
    proyectoActivo,
    setArrayProyectos,
    setProyectoActivo,
    setAgregarProyecto,
    setEditarProyecto,
    setEliminarProyecto
  } = proyectoStrore(
    useShallow((state) => ({
      proyectos: state.proyectos,
      proyectoActivo: state.proyectoActivo,
      setProyectoActivo: state.proyectoActivo,
      setArrayProyectos: state.setArrayProyectos,
      setAgregarProyecto: state.setAgregarProyecto,
      setEditarProyecto: state.setEditarProyecto,
      setEliminarProyecto: state.setEliminarProyecto
    }))
  )

  const getProyectos = async () => {
    try {
      const data = await getProyectosController();
      if (data) setArrayProyectos(data);
    } catch (err) {
      console.error("Error al mostrar los proyectos", err)
    }
  };

  const crearProyecto = async (nuevoSprint: IProyecto) => {
    setAgregarProyecto(nuevoSprint);
    try {
      await createProyectoController(nuevoSprint)
      Swal.fire("Exito", "proyecto creado correctamente", "success")
    } catch (err) {
      setEliminarProyecto(nuevoSprint.id!)
      console.error("Error al crear un proyecto", err);
    }
  };

  const editarProyecto = async (sprintEditado: IProyecto) => {

    const estadoPrevio = proyectos.find((el) => el.nombre === sprintEditado.nombre)
    setEditarProyecto(sprintEditado)

    try {
      await editProyectoController(sprintEditado)
      Swal.fire("Exito", "proyecto actualizado correctamente", "success")
    } catch (err) {
      if (estadoPrevio) setEditarProyecto(estadoPrevio);
      console.error("Error al editar un proyecto", err)
    }
  };

  const eliminarProyecto = async (idSprint: number) => {
    const estadoPrevio = proyectos.find((el) => el.id === idSprint);

    const confirm = await Swal.fire({
      title: "¿Estas seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    })

    if (!confirm.isConfirmed) return;
    setEliminarProyecto(idSprint)
    try {
      await deleteProyectoController(idSprint)
      Swal.fire("Eliminado", "El proyecto se elimino correctamente", "success")
    } catch (error) {
      if (estadoPrevio) setAgregarProyecto(estadoPrevio)
      console.log("Algo salio mal al eliminar: ", error);

    }
  };

  return {
    getProyectos,
    crearProyecto,
    editarProyecto,
    eliminarProyecto,
    proyectos,
    proyectoActivo,
    setProyectoActivo
  }

}

