import { FormEvent } from "react"
import { DoNextData } from "./DoData"


// Stolen mostly from a StackOverflow article
const fileHandler = async (
    event: FormEvent<HTMLInputElement>,
    setData: (data: DoNextData) => void
) => {
    const target = (event.target as HTMLInputElement)
    const blobData = await target.files?.item(0)?.text()
    if (blobData) {
        const data = JSON.parse(blobData)
        setData(data)
    }
}

export interface LoadDataProps {
    setData: (data: DoNextData) => void
}

const LoadData = ({ setData }: LoadDataProps) => {
    return <div>
        Ingest:
        <input
            type="file"
            accept="text/json"
            onInput={(event) => fileHandler(event, setData)}
        />
    </div>
}

export default LoadData
