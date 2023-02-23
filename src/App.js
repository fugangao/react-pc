
import Login from "./pages/login/login"
import Layout from "./pages/layout/layout"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App () {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout></Layout>}></Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>
      </div>
    </BrowserRouter>

  )
}

export default App
