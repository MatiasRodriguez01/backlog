import { useState } from 'react';
import styles from './Backlog.module.css'
import ModalTarea from '../ModalBacklog/ModalTarea';
import backlogStore from '../../../store/backlogStore';

const Backlog = () => {

  const [openPopUp, setOpenPopUP] = useState<boolean>(false)
  const setTareaActiva = backlogStore((state) => state.setTareaActiva)

  const handleCreateTarea = () => {
    setOpenPopUP(true)
    setTareaActiva(null)
  }

  return (
    <>
      <div className={styles.container}>
        <h2>Backlog</h2>
        <p>crear una tarea</p>
        <button onClick={handleCreateTarea}>crear tarea</button>
      </div>
      {
      openPopUp && <ModalTarea idValue={undefined} handleCloseModal={() => setOpenPopUP(false)}/>

      }
    </>
  );
};

export default Backlog;