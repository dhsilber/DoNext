import dayStartMilliseconds from "./DayStartMillisocnds"
import { ToDoData } from "./DoData"
import ToDo from "./ToDo"

interface RepeatingDosProps {
    data: ToDoData[]
}

const RepeatingDos = ({ data }: RepeatingDosProps) => {
    const dayStart = dayStartMilliseconds()

    return <ul>
        {
            data
                .filter(todo => todo.done < dayStart)
                .map((todo) => <ToDo key={todo.text} todo={todo} />)
        }
    </ul>

}

export default RepeatingDos