import { DoNextData, ToDoData } from "./DoData"

const checker = (
    // event: React.MouseEvent<HTMLInputElement, MouseEvent>,
    item: ToDoData,
    storedData: DoNextData,
    setStore: (data: DoNextData) => void
) => {
    const data = storedData.todos
    data.forEach(datum => {
        if (datum.text === item.text) {
            datum.done = Date.now()
            setStore(storedData)
            return
        }
    })
}

export default checker
