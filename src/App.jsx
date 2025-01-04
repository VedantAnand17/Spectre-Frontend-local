import { Route, Routes } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Landing from "./pages/Landing"
import DashboardPage from "./pages/DashboardPage"
import EditProfile from "./pages/EditProfile"
import TeamPage from "./pages/TeamPage"
import NotFoundPage from "./pages/NotFoundPage"
import { AuthContext } from "./context/AuthContext"
import { useContext } from "react"
import Navbar from "./components/Navbar"

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <>
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
