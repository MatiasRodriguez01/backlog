import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import styles from "./ModalProyecto.module.css";
import { IProyecto } from "../../../types/IInterfaces";
import { proyectoStrore } from "../../../store/proyectoStore";
import { useProyecto } from "../../../hooks/useProyecto";

type IModal = {
  handleCloseModal: VoidFunction;
}

const initialState: IProyecto = {
  id : "",
  nombre: "",
  descripcion: "",
  fechaInicio: "",
  fechaCierre: "",
  tareas: []
};

export const ModalProyecto: FC<IModal> = ({ handleCloseModal }) => {

  const proyectoActivo = proyectoStrore((state) => state.proyectoActivo)
  // const proyectoActivo = proyectoStrore((state) => state.proyectoActivo)

  const setProyectotActivo = proyectoStrore((state) => state.setProyectotActivo)

  const { crearProyecto, editarProyecto } = useProyecto()

  const [formValues, setFormValues] = useState<IProyecto>(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormValues((prev) => ({ ...prev, [`${name}`]: value }));
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (proyectoActivo) {
      editarProyecto(formValues)
    } else {
      crearProyecto({ ...formValues, id: new Date().toISOString() })
    }
    setProyectotActivo(null)
    handleCloseModal()
  }

  useEffect(() => {
    if (proyectoActivo) setFormValues(proyectoActivo);
  }, []);
  
  return (
    <div className={styles.containerPrincipalModal}>
      <div className={styles.contentPopUp}>
        <div>
          <h3>{proyectoActivo ? "Editar sprint" : "Crear sprint"}</h3>
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
            <textarea
              placeholder="Ingrese una descripcion"
              value={formValues.descripcion}
              onChange={handleChange}
              required name="descripcion" />
            <input
              type="date"
              value={formValues.fechaInicio}
              required
              onChange={handleChange}
              autoComplete="off"
              name="fechaInicio"
            />
            <input
              type="date"
              value={formValues.fechaCierre}
              required
              onChange={handleChange}
              autoComplete="off"
              name="fechaCierre"
            />
          </div>
          <div className={styles.buttonCard}>
            <button className={styles.buttonCancel} onClick={handleCloseModal}>Cancelar</button>
            <button className={styles.buttonSubmit} type="submit">
              {proyectoActivo ? "Editar proyecto" : "Crear proyecto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
