import axios from "axios"

interface objType {
    id: string;
    desc: string;
}

export const updateTodo = async (obj: objType): Promise<{}> => {
    const data  = await axios.put(`https://6371ffa2078587786187b961.mockapi.io/todos/${obj.id}`, {description: obj.desc})
    return data
}