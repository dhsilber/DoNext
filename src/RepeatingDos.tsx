import { DoNextData, ToDoData } from "./DoData"
import ToDo from "./ToDo"

interface RepeatingDosProps {
    data: ToDoData[]
    store: (data: DoNextData) => void
}

export const checker = (
    // event: React.MouseEvent<HTMLInputElement, MouseEvent>,
    item: ToDoData,
    data: ToDoData[],
    store: (data: DoNextData) => void
) => {

}

const RepeatingDos = ({ data, store }: RepeatingDosProps) => {
    return <ul>
        {/* {data.map((todo) => <li key={todo.text}>{todo.text}</li>)} */}
        {data.map((todo) => <ToDo key={todo.text} todo={todo} checker={checker} data={data} store={store} />)}
    </ul>
}

export default RepeatingDos
