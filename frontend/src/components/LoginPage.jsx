import { useState } from 'react'

export default function LoginPage({ onLogin }) {
    const [user, setUser] = useState(null)
    const [formData, setFormData] = useState({ name: '', number: '' })

    const handleLoginSubmit = (e) => {
        e.preventDefault()
        if (!formData.name.trim() || !formData.number.trim()) return

        // Simulate login by setting user state
        setUser({
            name: formData.name.trim(),
            number: formData.number.trim(),
            picture: `https://api.dicebear.com/7.x/initials/svg?seed=${formData.name}` // Optional: Avatar generation
        })
    }

    const selectRole = (role) => {
        if (user) {
            onLogin({ ...user, role })
        }
    }

    return (
        <div className="login-container">
            {!user ? (
                <div className="login-card card">
                    <h2>Welcome to Qura</h2>
                    <p>Please enter your details to continue</p>

                    <form onSubmit={handleLoginSubmit} className="login-form">
                        <div className="form-group text-left">
                            <label>Full Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Ex. John Doe"
                                required
                            />
                        </div>
                        <div className="form-group text-left">
                            <label>Phone Number</label>
                            <input
                                type="tel"
                                value={formData.number}
                                onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                                placeholder="Ex. +1 234 567 8900"
                                required
                            />
                        </div>
                        <button type="submit" className="btn-primary mt-4">
                            Continue
                        </button>
                    </form>
                </div>
            ) : (
                <div className="role-selection-card card">
                    <h2>Welcome, {user.name}!</h2>
                    <img src={user.picture} alt="Profile" className="profile-img" />
                    <p>Please select your role to continue:</p>
                    <div className="role-buttons">
                        <button
                            className="btn-primary role-btn"
                            onClick={() => selectRole('user')}
                        >
                            I am a User
                        </button>
                        <button
                            className="btn-secondary role-btn"
                            onClick={() => selectRole('receptionist')}
                        >
                            I am a Receptionist
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
