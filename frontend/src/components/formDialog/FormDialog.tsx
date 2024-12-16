import { Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, TextField } from "@mui/material"; 
import { useState } from "react"; 
import styles from './FormDialog.module.css';

type FormDialogProps = { 
  addGoal: (goal: GoalAdded) => void; 
};

type GoalAdded = { 
  current: number; 
  due_date: string; 
  title: string; 
  total: number; 
};

function FormDialog(props: FormDialogProps) { 
  const [isToggled, setIsToggled] = useState(false);

  const handleClickOpen = () => {
    setIsToggled(true);
  };

  const handleClickClose = () => {
    setIsToggled(false);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    const goal = {
      title: data.title.toString(),
      total: Number(data.total),
      current: Number(data.current),
      due_date: data.due_date.toString(),
    };

    // Simulate the goal creation
    try {
      props.addGoal(goal); // Assuming the goal is added successfully
      handleClickClose();
    } catch {
      console.error("Error creating goal!");
    }
  };

  return (
    <>
      <div className={styles.introText}>
        <h1>¡Establece tus metas!</h1>
        <p>Rellena los campos para establecer tus metas financieras. Podrás seguir tu progreso y alcanzar tus objetivos de manera más eficiente.</p>
      </div>
      
      <button onClick={handleClickOpen} className={styles.addGoalButton}>Añade tus metas!...</button>

      <Dialog
        open={isToggled}
        onClose={handleClickClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleFormSubmit,
        }}
      >
        <DialogTitle className={styles.DialogTitle}>Meta por alcanzar!</DialogTitle>
        <DialogContent className={styles.DialogContent}>
          <TextField
            required
            label="Título"
            name="title"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            type="number"
            label="Monto a alcanzar"
            name="total"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            type="number"
            label="Monto actual"
            name="current"
            fullWidth
            variant="standard"
          />
          <InputLabel className={styles.dueDateLabel}>Vencimiento</InputLabel>
          <TextField
            required
            type="date"
            name="due_date"
            variant="standard"
            className={styles.dueDateInput}
          />
        </DialogContent>
        <DialogActions className={styles.DialogActions}>
          <button className={styles.cancelButton} onClick={handleClickClose}>Cancelar</button>
          <button className={styles.submitButton} type="submit">Enviar</button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default FormDialog;
