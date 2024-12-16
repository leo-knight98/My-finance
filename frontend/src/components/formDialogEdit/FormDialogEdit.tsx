import { Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, TextField } from "@mui/material";
import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import UseGoalContext from "../../hooks/GoalContext";
import styles from './FormDialogEdit.module.css';

type FormDialogPropsEdit = {
    id: number;
    current: number;
    due_date: string;
    title: string;
    total: number;
};

function FormDialogEdit(props: FormDialogPropsEdit) {
    const context = UseGoalContext();
    const [isToggled, setIsToggled] = useState(false);

    const handleClickOpen = () => setIsToggled(true);
    const handleClickClose = () => setIsToggled(false);

    return (
        <>
            <button onClick={handleClickOpen} className={styles.goalsAction}>
                <FaPencilAlt />
            </button>

            <Dialog
                open={isToggled}
                onClose={handleClickClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const data = Object.fromEntries(formData);
                        const goal = {
                            id: props.id,
                            title: data.title.toString(),
                            total: Number(data.total),
                            current: Number(data.current),
                            due_date: data.due_date.toString(),
                        };
                        context.editGoal(goal);
                        handleClickClose();
                    },
                }}
            >
                <DialogTitle className={styles.dialogTitle}>Editar meta!</DialogTitle>
                <DialogContent className={styles.dialogContent}>
                    <TextField
                        required
                        label="Título"
                        name="title"
                        fullWidth
                        variant="standard"
                        defaultValue={props.title}
                        className={styles.inputField}
                    />
                    <TextField
                        required
                        type="number"
                        label="Monto a alcanzar"
                        name="total"
                        fullWidth
                        variant="standard"
                        defaultValue={props.total}
                        className={styles.inputField}
                    />
                    <TextField
                        required
                        type="number"
                        label="Monto actual"
                        name="current"
                        fullWidth
                        variant="standard"
                        defaultValue={props.current}
                        className={styles.inputField}
                    />
                    <InputLabel className={styles.dueDateLabel}>Vencimiento</InputLabel>
                    <TextField
                        required
                        type="date"
                        name="due_date"
                        fullWidth
                        variant="standard"
                        defaultValue={props.due_date}
                        className={styles.inputField}
                    />
                </DialogContent>
                <DialogActions>
                    <button className={styles.cancelButton} onClick={handleClickClose}>
                        Cancelar
                    </button>
                    <button className={styles.addGoalButton} type="submit">
                        Enviar
                    </button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default FormDialogEdit;
