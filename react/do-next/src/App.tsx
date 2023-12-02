
import { Routes, Route, BrowserRouter } from "react-router-dom"
import DoNext from './DoNext'
import Edit from './Edit'
import DataInterchange from "./DataInterchange"

function App() {


  return <BrowserRouter>
    <Routes>
      <Route path="/" >
        <Route index element={<DoNext />} />
        <Route path="edit" element={<Edit />} />
        <Route path="data-interchange" element={<DataInterchange />} />
      </Route>
    </Routes>
  </BrowserRouter>
}

export default App
