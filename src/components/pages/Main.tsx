import { FC,  } from "react"
import { getTodos } from "../../api/getTodos";

import Input from "../Input/Input";
import Box from '@mui/material/Box';
import Todo from "../Todo/Todo";
import { useQuery } from "react-query";
import { TodoType } from "../../types/Todo";
import { Grid } from "@mui/material";



const Main: FC = () => {

    const { isLoading, error, data } = useQuery('todos', getTodos)
    if (isLoading) return <div>Loading...</div>

    if (error) return <div>An error has occurred:</div>

    return (
        <Grid 
            container
            display="flex"
            justifyContent="center"
            >
            <Box sx={{ boxShadow: 1, p:2, marginTop: "100px"}}>
                <Input />
                {data.map((el: TodoType) =>  <Todo key={el.id} id={el.id} createdAt={el.createdAt} description={el.description} />  )}
            </Box>
        </Grid>
    )
}


export default Main