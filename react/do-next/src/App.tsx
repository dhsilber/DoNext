
import { Routes, Route, BrowserRouter } from "react-router-dom"
import DoNext from './DoNext'
import Edit from './Edit'

function App() {


  return <BrowserRouter>
    <Routes>
      <Route path="/" >
        <Route index element={<DoNext />} />
        <Route path="edit" element={<Edit />} />
      </Route>
    </Routes>
  </BrowserRouter>
}

export default App
