import axios from 'axios'

export const getTodos = async () => {
    const {data} = await axios.get('https://6371ffa2078587786187b961.mockapi.io/todos')
    return data
}