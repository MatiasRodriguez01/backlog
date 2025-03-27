import { useShallow } from "zustand/shallow"
import { sprintStore } from "../store/sprintStore"
import Swal from "sweetalert2";
import { ISprint } from "../types/ISprint";
import { editarSprint, eliminarSprintPorNombre, getAllSprints, postNuevoSprint } from "../https/sprint";


export const useSprints = () => {

    const {
      sprints,
      setArraySprint, 
      agregarNuevoSprint, 
      eliminarUnSprint, 
      editarUnSprint, 
    } = sprintStore(
        useShallow((state)=>({
        sprints: state.sprints,
        setArraySprint: state.setArraySprint,
        agregarNuevoSprint: state.agregarNuevoSprint,
        eliminarUnSprint: state.eliminarUnSprint,
        editarUnSprint: state.editarUnSprint
    })))

    const getSprints = async () => {
        const data = await getAllSprints();
        if (data) setArraySprint(data);
      };


      const crearSprint = async (nuevoSprint: ISprint)=>{
        agregarNuevoSprint(nuevoSprint);
        try {
          await postNuevoSprint(nuevoSprint)
          Swal.fire("Exito", "Sprint creado correctamente", "success")
        } catch (error) {
          eliminarUnSprint(nuevoSprint.nombre!)
          console.log("Algo salio mal al crear la tarea");
        }
      }

      const putSprintEditar = async (sprintEditado: ISprint)=>{

        const estadoPrevio = sprints.find((el)=>el.nombre === sprintEditado.nombre)
        editarUnSprint(sprintEditado)
        
        try {
          await editarSprint(sprintEditado) 
          Swal.fire("Exito", "Sprint actualizado correctamente", "success")
        } catch (error) {
          if (estadoPrevio) editarUnSprint(estadoPrevio);
          console.log("Algo salio mal al editar");
        }
      }

      const eliminarSprint = async (idSprint: string)=>{
        const estadoPrevio = sprints.find((el)=>el.nombre === idSprint);

        const confirm = await Swal.fire({
          title: "¿Estas seguro?",
          text: "Esta acción no se puede deshacer",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText:"Si, eliminar",
          cancelButtonText: "Cancelar",
        })

        if(!confirm.isConfirmed) return;
        eliminarUnSprint(idSprint)
        try {
          await eliminarSprintPorNombre(idSprint)
          Swal.fire("Eliminado", "La tarea se elimino correctamente", "success")
        } catch (error) {
          if (estadoPrevio) agregarNuevoSprint(estadoPrevio)
            console.log("Algo salio mal al editar");
          
        }
      }

  return {
    getSprints,
    crearSprint,
    putSprintEditar,
    eliminarSprint,
    sprints,
  }

}

