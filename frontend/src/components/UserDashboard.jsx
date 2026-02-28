import { useState, useEffect } from 'react'

export default function UserDashboard({ user }) {
    const [queue, setQueue] = useState([])
    const [isBooked, setIsBooked] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchQueue = async () => {
        try {
            const res = await fetch('http://localhost:8000/queue')
            if (res.ok) {
                const data = await res.json()
                setQueue(data)

                // Auto-detect if current user is already in the queue based on name
                const mypos = data.find(p => p.name.toLowerCase() === user.name.toLowerCase())
                if (mypos) setIsBooked(true)
                else setIsBooked(false)

                setError(null)
            } else {
                throw new Error('Failed to fetch queue')
            }
        } catch (err) {
            setError('Cannot connect to server. Ensure backend is running.')
        }
    }

    useEffect(() => {
        fetchQueue()
        const interval = setInterval(fetchQueue, 3000)
        return () => clearInterval(interval)
    }, [])

    const handleBookAppointment = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await fetch('http://localhost:8000/add_patient', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: user.name, priority: 'Normal' })
            })
            if (res.ok) {
                setIsBooked(true)
                fetchQueue()
            } else {
                throw new Error('Failed to book appointment')
            }
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    // Find users booking info
    const myQueueInfo = queue.find(p => p.name.toLowerCase() === user.name.toLowerCase())

    return (
        <div className="dashboard user-dashboard">
            {error && <div className="error-banner">{error}</div>}

            <div className="main-content">
                <section className="user-action-card card">
                    <h2>Book an Appointment</h2>
                    {!isBooked ? (
                        <form onSubmit={handleBookAppointment}>
                            <p className="booking-info">You will be added to the queue as: <strong>{user.name}</strong></p>
                            <button type="submit" disabled={loading} className="btn-primary btn-large">
                                {loading ? 'Booking...' : 'Book Now'}
                            </button>
                        </form>
                    ) : (
                        <div className="booked-success">
                            <h3>Appointment Confirmed!</h3>
                            {myQueueInfo && (
                                <div className="ticket">
                                    <p>Your Position: <span className="highlight">#{myQueueInfo.position + 1}</span></p>
                                    <p>Estimated Wait: <span className="highlight">{myQueueInfo.estimated_wait_time} mins</span></p>
                                </div>
                            )}
                        </div>
                    )}
                </section>

                <section className="queue-list-card card">
                    <h2>Live Clinic Queue</h2>
                    <div className="queue-list">
                        {queue.length === 0 ? (
                            <p className="empty-state">No one is in the queue right now.</p>
                        ) : (
                            queue.map((patient) => (
                                <div
                                    key={patient.id}
                                    className={`queue-item readonly ${patient.priority.toLowerCase()} ${patient.name === user.name ? 'my-ticket' : ''}`}
                                >
                                    <div className="queue-info">
                                        <div className="queue-header">
                                            <h3>{patient.name === user.name ? '🌟 You' : patient.name}</h3>
                                            <span className={`badge ${patient.priority.toLowerCase()}`}>
                                                {patient.priority}
                                            </span>
                                        </div>
                                        <div className="queue-meta">
                                            <p>Position: <strong>#{patient.position + 1}</strong></p>
                                            <p>Wait Time: <strong>{patient.estimated_wait_time} mins</strong></p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </div>
        </div>
    )
}
