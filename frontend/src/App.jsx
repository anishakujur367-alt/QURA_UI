import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import ReceptionistDashboard from './components/ReceptionistDashboard'
import UserDashboard from './components/UserDashboard'
import './index.css'

function App() {
    const [user, setUser] = useState(null)

    return (
        <BrowserRouter>
            <div className="container">
                <header className="header">
                    <h1>QURA</h1>
                    <p>Smart Clinic Queue System</p>
                    {user && (
                        <div className="user-profile">
                            <span>Logged in as <b>{user.name}</b> ({user.role})</span>
                            <button className="btn-logout" onClick={() => setUser(null)}>Logout</button>
                        </div>
                    )}
                </header>

                <Routes>
                    <Route
                        path="/"
                        element={user ? <Navigate to={`/${user.role}`} /> : <LoginPage onLogin={setUser} />}
                    />
                    <Route
                        path="/receptionist"
                        element={user?.role === 'receptionist' ? <ReceptionistDashboard /> : <Navigate to="/" />}
                    />
                    <Route
                        path="/user"
                        element={user?.role === 'user' ? <UserDashboard user={user} /> : <Navigate to="/" />}
                    />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
