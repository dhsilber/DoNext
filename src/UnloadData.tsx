import React from "react"
import { DoNextData } from "./DoData"

function exportUserInfo(data: DoNextData) {
    const fileData = JSON.stringify(data, null, 2) + '\n'
    const blob = new Blob([fileData], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.download = "doNextDownload.json"
    link.href = url
    link.click()
}

export interface UnloadDataProps {
    data: DoNextData
}

const UnloadData = ({ data }: UnloadDataProps) => {
    return <button onClick={() => exportUserInfo(data)}>Download</button>
}

export default UnloadData
