import { DoData } from "./DoData"

const RepeatingDos = () => {
    const dos = new DoData

    return <ul>
        {dos.list.map((todo) =>
            <li key={todo.text}>{todo.text}</li>)}
    </ul>
}

export default RepeatingDos