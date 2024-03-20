import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import { Note } from "./Note"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Welcome to Protected Text</div>} />
        <Route path="/:noteTitle" element={<Note />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
