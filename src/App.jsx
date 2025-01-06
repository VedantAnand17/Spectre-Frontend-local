import { Route, Routes, Navigate } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Landing from "./pages/Landing"
import TeamPage from "./pages/TeamPage"
import NotFoundPage from "./pages/NotFoundPage"
import { AuthContext } from "./context/AuthContext"
import { useContext } from "react"
import Navbar from "./components/Navbar"

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <div className="min-h-screen max-w-screen">
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
