import { ToDo } from "./DoData"

interface RepeatingDosProps {
    data: ToDo[]
}

const RepeatingDos = ({ data }: RepeatingDosProps) => {
    return <ul>
        {data.map((todo) => <li key={todo.text}>{todo.text}</li>)}
    </ul>
}

export default RepeatingDos
