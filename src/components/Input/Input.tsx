import { FC, useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { useSnackbar } from 'notistack';
import { useForm, SubmitHandler } from "react-hook-form";
import { useQueryClient } from "react-query";
import { useMutation } from "react-query";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { postTodo } from "../../api/postTodo";

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { TextField, Typography } from "@mui/material";

interface IFormInput {
    title: string
    desc: string
}

const schema = z.object({
    title: z.string().min(6).max(20),
    desc: z.string().min(6).max(32),
});

const Input: FC = () =>{
    const queryClient = useQueryClient()
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>(' ')
    const { enqueueSnackbar} = useSnackbar();

    const { register, formState: { errors }, handleSubmit, } = useForm<IFormInput>({
        resolver: zodResolver(schema)
    });

    const onSubmit: SubmitHandler<IFormInput> = (data: any)  => {
        mutate({id: uuidv4(),createdAt: new Date(),description, title }) 
    }

    const { mutate } = useMutation(postTodo, {
        onSuccess: () => {
            queryClient.invalidateQueries('todos')
            enqueueSnackbar('Todo added');
            setTitle('')
            setDescription('')
        },
        onError: (error: unknown | any) => {
            console.log(error.message)
            enqueueSnackbar('Не удалось создать заметку')
        }
    })

    return  <Box sx={{ display: 'flex', mb: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ p: '2px 4px', dispay: "flex",  alignItems: "center"}}>
                <TextField id="standard-basic" variant="standard"  placeholder="Title" 
                    value={title}
                    sx={{width: "420px", marginBottom: "15px"}}
                    {...register("title", {
                        required: true,
                        onChange: (e) => {setTitle(e.target.value)},
                })}/><br/>
                {errors?.title?.message  &&  <Typography sx={{color: "red"}}>Title {errors.title.message.slice(6)}</Typography>} 
                <TextField id="standard-basic" variant="standard"  placeholder="Description" 
                    value={description}
                    sx={{width: "420px"}}
                    {...register("desc", {
                        required: true,
                        onChange: (e) => {setDescription(e.target.value)},
                })}/>
                <Button type="submit" 
                        sx={{ml: 3, width: "30px"}} variant="contained" 
                >
                    Add
                </Button>
                {errors?.desc?.message  &&  <Typography sx={{color: "red"}}>Description {errors.desc.message.slice(6)}</Typography>} 
            </Box>
        </form> 
    </Box>
}


export default Input