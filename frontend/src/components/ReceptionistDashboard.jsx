import { useState, useEffect } from 'react'

export default function ReceptionistDashboard() {
    const [queue, setQueue] = useState([])
    const [name, setName] = useState('')
    const [priority, setPriority] = useState('Normal')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchQueue = async () => {
        try {
            const res = await fetch('http://localhost:8000/queue')
            if (res.ok) {
                const data = await res.json()
                setQueue(data)
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

    const handleAddPatient = async (e) => {
        e.preventDefault()
        if (!name.trim()) return
        setLoading(true)
        try {
            const res = await fetch('http://localhost:8000/add_patient', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name.trim(), priority })
            })
            if (res.ok) {
                setName('')
                setPriority('Normal')
                fetchQueue()
            } else {
                throw new Error('Failed to add patient')
            }
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleComplete = async (patientId) => {
        try {
            const res = await fetch('http://localhost:8000/complete_patient', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ patient_id: patientId })
            })
            if (res.ok) {
                fetchQueue()
            } else {
                throw new Error('Failed to complete patient')
            }
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className="dashboard receptionist-dashboard">
            {error && <div className="error-banner">{error}</div>}

            <div className="main-content">
                <section className="add-patient-card card">
                    <h2>Receptionist: Add Walk-in Patient</h2>
                    <form onSubmit={handleAddPatient}>
                        <div className="form-group">
                            <label>Patient Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter patient name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Priority</label>
                            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                                <option value="Normal">Normal</option>
                                <option value="Emergency">Emergency</option>
                            </select>
                        </div>
                        <button type="submit" disabled={loading} className="btn-primary">
                            {loading ? 'Adding...' : 'Add to Queue'}
                        </button>
                    </form>
                </section>

                <section className="queue-list-card card">
                    <h2>Live Queue Info</h2>
                    <div className="queue-list">
                        {queue.length === 0 ? (
                            <p className="empty-state">No patients in the queue.</p>
                        ) : (
                            queue.map((patient) => (
                                <div key={patient.id} className={`queue-item ${patient.priority.toLowerCase()}`}>
                                    <div className="queue-info">
                                        <div className="queue-header">
                                            <h3>{patient.name}</h3>
                                            <span className={`badge ${patient.priority.toLowerCase()}`}>
                                                {patient.priority}
                                            </span>
                                        </div>
                                        <div className="queue-meta">
                                            <p>Position: <strong>#{patient.position + 1}</strong></p>
                                            <p>Wait Time: <strong>{patient.estimated_wait_time} mins</strong></p>
                                        </div>
                                    </div>
                                    <button onClick={() => handleComplete(patient.id)} className="btn-complete">
                                        Complete
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </div>
        </div>
    )
}
