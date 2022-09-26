import { dayNowStartMilliseconds } from "../DateUtilities"
import { Todo } from "../DoData"
import ToDo from "./ToDo"

interface RepeatingDosProps {
    data: Todo[]
}

const RepeatingDos = ({ data }: RepeatingDosProps) => {
    const dayStart = dayNowStartMilliseconds()
    const today = new Date().getDay()

    return <ul className="todo">
        {
            data
                .filter(todo => todo.done < dayStart)
                .filter(todo => todo.days.length === 0 || todo.days.includes(today))
                .map((todo) => <ToDo key={todo.text} todo={todo} />)
        }
    </ul>

}

export default RepeatingDos
