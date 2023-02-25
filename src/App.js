
import Login from "./pages/login"
import Layout from "./pages/layout/layout"
import Home from "./pages/home"
import Article from "./pages/article"
import Publish from "./pages/publish"
import {  Routes, Route, unstable_HistoryRouter as HistoryRouter } from "react-router-dom"
import AuthComponent from "./components/authRoute.js"
import { history } from "./utils"
function App () {
  return (
    <HistoryRouter history={history}>
      <div className="App">
        <Routes >
          <Route path='/login' element={<Login />}></Route>
          <Route path="/" element={<AuthComponent><Layout /></AuthComponent>}>
            <Route index element={<Home />}></Route>
            <Route path="article" element={<Article />}></Route>
            <Route path="publish" element={<Publish />}></Route>
          </Route>
        </Routes>
      </div>
    </HistoryRouter>

  )
}

export default App
