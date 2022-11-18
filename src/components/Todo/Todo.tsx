import { Box, Button, Modal, Typography } from "@mui/material";
import { FC, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import ModalWindow from "../Modal/Modal";
import axios from 'axios'
import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from "react-query";

interface TodoProps {
    id: string;
    createdAt: Date;
    title: string;
    description: string;
}

const Todo: FC<TodoProps> = ({id, createdAt, description, title}) => {
    const queryClient = useQueryClient()
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    const deleteTodo = (id: string) => {
        enqueueSnackbar('Todo deleted');
        return axios.delete('https://6371ffa2078587786187b961.mockapi.io/todos/' + id)
    }

    const mutation = useMutation(deleteTodo, {
        onSuccess: () => {
            queryClient.invalidateQueries('todos')
        },
        onError: (error: unknown | any) => {
            console.log(error.message)
            enqueueSnackbar('Не удалось удалить задачу')
        }
    })

    return(
        <Box  sx={{display: "flex", justifyContent: "space-between", height: 50, borderBottom: 1,  alignItems: "center"}}>
            <Typography onClick={handleOpen} sx={{cursor: "pointer"}}>{title}</Typography>
            <Button onClick={()=> mutation.mutate(id)}>
                <DeleteIcon  />
            </Button>
            <ModalWindow open={open} handleClose={()=> handleClose()} id={id} createdAt={createdAt} description={description}  />
        </Box>
    )
}

export default Todo