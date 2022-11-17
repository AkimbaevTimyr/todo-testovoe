import axios from "axios"

export const postTodo = async (newTodo: any) =>{
    const data = await axios.post('https://6371ffa2078587786187b961.mockapi.io/todos', newTodo)
    return data
}