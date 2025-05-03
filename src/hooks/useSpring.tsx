import { useShallow } from "zustand/shallow"
import Swal from "sweetalert2";
import { ISpring } from "../types/IInterfaces";
import { springStore } from "../store/springStore";
import { createSpringController, deleteSpringController, editSpringController, getSpringsController } from "../https/proyectos/proyectoController";


export const useSpring = () => {


  const {
    springs,
    setSprings,
    setCrearSpring,
    setEditarSpring,
    setEliminarSpring
  } = springStore(
    useShallow((state) => ({
      springs: state.springs,
      setSprings: state.setSprings,
      setCrearSpring: state.setCrearSpring,
      setEditarSpring: state.setEditarSpring,
      setEliminarSpring: state.setEliminarSpring
    }))
  )

  const getSprings = async () => {
    try {
      const data = await getSpringsController();
      if (data) setSprings(data);
    } catch (err) {
      console.error("Error al mostrar los proyectos", err)
    }
  };

  const crearSpring = async (nuevoSprint: ISpring) => {
    setCrearSpring(nuevoSprint);
    try {
      await createSpringController(nuevoSprint)
      Swal.fire("Exito", "proyecto creado correctamente", "success")
    } catch (err) {
      if (nuevoSprint) setEliminarSpring(nuevoSprint._id!)
      console.error("Error al crear un proyecto", err);
    }
  };

  const editarSpring = async (sprintEditado: ISpring) => {

    const estadoPrevio = springs.find((spring) => spring._id === sprintEditado._id);
    setEditarSpring(sprintEditado)

    try {
      await editSpringController(sprintEditado)
      Swal.fire("Exito", "proyecto actualizado correctamente", "success")
    } catch (err) {
      if (estadoPrevio) setEditarSpring(estadoPrevio);
      console.error("Error al editar un proyecto", err)
    }
  };

  const eliminarString = async (idSprint: string) => {
    const estadoPrevio = springs.find((el) => el._id === idSprint);

    const confirm = await Swal.fire({
      title: "¿Estas seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    })

    if (!confirm.isConfirmed) return;
    setEliminarSpring(idSprint)
    try {
      await deleteSpringController(idSprint)
      Swal.fire("Eliminado", "El proyecto se elimino correctamente", "success")
    } catch (error) {
      if (estadoPrevio) setCrearSpring(estadoPrevio)
      console.log("Algo salio mal al eliminar: ", error);

    }
  };

  return {
    springs,
    getSprings,
    crearSpring,
    editarSpring,
    eliminarString,
  }

}

