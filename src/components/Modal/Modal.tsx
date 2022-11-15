import { FC , useState} from "react"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { convertTimestampToDate } from "../../hooks/convertTimestampToDate";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useSnackbar } from "notistack";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface ModalWindowProps {
    open: boolean;
    handleClose: () => void
    id: string;
    createdAt: Date;
    description: string
}

const ModalWindow: FC<ModalWindowProps> = ({open, handleClose, id, createdAt, description}) =>{
    const [desc, setDesc] = useState<string>(description)
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient()
    
    const updateTodo = async(id: string) =>{
        const data  = await axios.put(`https://6371ffa2078587786187b961.mockapi.io/todos/${id}`, {description: desc})
        return data
    }

    const mutation = useMutation(updateTodo, {
        onSuccess: (data: {}) =>{
            queryClient.setQueryData(['todo', id], data)
            queryClient.invalidateQueries(['todos'])
            enqueueSnackbar('Заметка изменена')
        },
        onError: (error: unknown | any) => {
            console.log(error.message)
            enqueueSnackbar('Не удалось изменить заметку')
        }
    })

    const handleClick = () =>{
        handleClose()
        mutation.mutate(id)
    }

    return(
    <Modal
        open={open}
        onClose={handleClick}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <Typography suppressContentEditableWarning={true} contentEditable  onInput={(e: any)=> setDesc(e.target.textContent)} id="modal-modal-title" variant="h6" component="h2">
                {description}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Дата создания: {convertTimestampToDate(createdAt)}
            </Typography>
        </Box>
    </Modal>
    )
}

export default ModalWindow