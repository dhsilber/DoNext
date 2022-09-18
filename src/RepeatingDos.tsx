import { dayNowStartMilliseconds } from "./DateUtilities"
import { ToDoData } from "./DoData"
import ToDo from "./ToDo"

interface RepeatingDosProps {
    data: ToDoData[]
}

const RepeatingDos = ({ data }: RepeatingDosProps) => {
    const dayStart = dayNowStartMilliseconds()

    return <ul className="todo">
        {
            data
                .filter(todo => todo.done < dayStart)
                .map((todo) => <ToDo key={todo.text} todo={todo} />)
        }
    </ul>

}

export default RepeatingDos
