import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import styles from "./ModalProyecto.module.css";
import { ISpring } from "../../../types/IInterfaces";
import { springStore } from "../../../store/springStore";
import { useSpring } from "../../../hooks/useSpring";
import { ObjectId } from "bson";

type IModal = {
  handleCloseModal: VoidFunction;
}

const initialState: ISpring = {
  _id : "",
  nombre: "",
  fecha_inicio: "",
  fecha_cierre: "",
  tareas: [],
  color: ""
};

export const ModalProyecto: FC<IModal> = ({ handleCloseModal }) => {

  const springActivo = springStore((state) => state.springActivo)
  // const proyectoActivo = proyectoStrore((state) => state.proyectoActivo)

  const setSpringActivo = springStore((state) => state.setSpringActivo)

  const { crearSpring, editarSpring } = useSpring()

  const [formValues, setFormValues] = useState<ISpring>(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormValues((prev) => ({ ...prev, [`${name}`]: value }));
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (springActivo) {
      editarSpring(formValues)
    } else {
      const generatedId = new ObjectId().toString()
      crearSpring({ ...formValues, _id: generatedId })
    }
    setSpringActivo(null)
    handleCloseModal()
  }

  useEffect(() => {
    if (springActivo) setFormValues(springActivo);
  }, []);
  
  return (
    <div className={styles.containerPrincipalModal}>
      <div className={styles.contentPopUp}>
        <div>
          <h3>{springActivo ? "Editar sprint" : "Crear sprint"}</h3>
        </div>
        <form onSubmit={handleSubmit} className={styles.formContent}>
          <div>
          <input
              type="text"
              value={formValues.nombre}
              onChange={handleChange}
              name="nombre"
              required
            />
            <input
              type="date"
              value={formValues.fecha_inicio}
              required
              onChange={handleChange}
              autoComplete="off"
              name="fecha_inicio"
            />
            <input
              type="date"
              value={formValues.fecha_cierre}
              required
              onChange={handleChange}
              autoComplete="off"
              name="fecha_cierre"
            />
            <input
              type="text"
              value={formValues.color}
              onChange={handleChange}
              name="color"
              required
            />
          </div>
          <div className={styles.buttonCard}>
            <button className={styles.buttonCancel} onClick={handleCloseModal}>Cancelar</button>
            <button className={styles.buttonSubmit} type="submit">
              {springActivo ? "Editar proyecto" : "Crear proyecto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
