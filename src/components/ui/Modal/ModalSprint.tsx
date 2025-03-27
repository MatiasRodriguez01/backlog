import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { ISprint } from "../../../types/ISprint";
import styles from "./ModalSprint.module.css";
import { sprintStore } from "../../../store/sprintStore";
import { useSprints } from "../../../hooks/useSprints";

type IModal = {
    handleCloseModal: VoidFunction;
}

const initialState: ISprint = {
    nombre: "",
    fechaInicio: "",
    fechaCierre: "",
};

export const ModalSprint: FC<IModal> = ({handleCloseModal}) => {
    
    const sprintActivo = sprintStore ((state)=>state.sprintActivo)
    
    const setSprintActivo = sprintStore((state)=>state.setSprintActivo)
    
    const {crearSprint, putSprintEditar} = useSprints()
    
    const [formValues, setFormValues] = useState<ISprint>(initialState);
    
    useEffect(() => {
        if (sprintActivo) setFormValues(sprintActivo);
      }, []);
    
      
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
    
        setFormValues((prev) => ({ ...prev, [`${name}`]: value }));
    };

    const handleSubmit = (e:FormEvent)=>{
        e.preventDefault()
        if (sprintActivo){
          putSprintEditar(formValues)
        }else{
          crearSprint({...formValues, id: new Date().toDateString()})
        }
        setSprintActivo(null)
        handleCloseModal()
      }

  return (
    <div>
        <div>
        <div>
          <h3>{sprintActivo ? "Editar sprint" : "Crear sprint"}</h3>
        </div>
        <form onSubmit={handleSubmit} className={styles.formContent}>
          <div>
            <input
              placeholder="Ingrese un titulo"
              type="text"
              required
              onChange={handleChange}
              value={formValues.nombre}
              autoComplete="off"
              name="nombre"
            />
            <input
              type="date"
              required
              onChange={handleChange}
              value={formValues.fechaInicio}
              autoComplete="off"
              name="fechaLimite"
            />
            {/* <input
              type="date"
              required
              onChange={handleChange}
              value={formValues.fechaCierre}
              autoComplete="off"
              name="fechaLimite"
            /> */}
          </div>
          <div className={styles.buttonCard}>
            <button className={styles.buttonCancel} onClick={handleCloseModal}>Cancelar</button>
            <button className={styles.buttonSubmit} type="submit">
              {sprintActivo ? "Editar sprint" : "Crear sprint"}
            </button>
          </div>
        </form>
        </div>
    </div>
  )
}
