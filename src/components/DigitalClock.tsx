import { useState, useEffect } from 'react'
import { useSubscribeDev } from '@subscribe.dev/react'
import './DigitalClock.css'

function DigitalClock() {
  const {
    signOut,
    user,
    usage,
    subscribe,
    subscriptionStatus,
    useStorage
  } = useSubscribeDev()

  const [currentTime, setCurrentTime] = useState(new Date())
  const [is24Hour, setIs24Hour] = useStorage!('is24Hour', true)
  const [showDate, setShowDate] = useStorage!('showDate', true)
  const [syncStatus] = useStorage!('preferences', {})

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()

    if (is24Hour) {
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    } else {
      const period = hours >= 12 ? 'PM' : 'AM'
      const displayHours = hours % 12 || 12
      return `${String(displayHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${period}`
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="digital-clock-container">
      <header className="clock-header">
        <div className="header-left">
          <h1 className="app-title">Digital Clock</h1>
          {user && <span className="user-email">{user.email}</span>}
        </div>
        <div className="header-right">
          <button onClick={signOut} className="btn btn-secondary">
            Sign Out
          </button>
        </div>
      </header>

      <main className="clock-main">
        <div className="clock-display">
          <div className="time">{formatTime(currentTime)}</div>
          {showDate && <div className="date">{formatDate(currentTime)}</div>}
        </div>

        <div className="clock-controls">
          <div className="control-group">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={is24Hour}
                onChange={(e) => setIs24Hour(e.target.checked)}
                className="toggle-checkbox"
              />
              <span className="toggle-text">24-Hour Format</span>
            </label>
          </div>

          <div className="control-group">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={showDate}
                onChange={(e) => setShowDate(e.target.checked)}
                className="toggle-checkbox"
              />
              <span className="toggle-text">Show Date</span>
            </label>
          </div>
        </div>
      </main>

      <footer className="clock-footer">
        <div className="subscription-info">
          <div className="info-card">
            <span className="info-label">Plan</span>
            <span className="info-value">{subscriptionStatus?.plan?.name ?? 'Free'}</span>
          </div>
          <div className="info-card">
            <span className="info-label">Status</span>
            <span className="info-value status-badge">
              {subscriptionStatus?.status ?? 'none'}
            </span>
          </div>
          <div className="info-card">
            <span className="info-label">Credits</span>
            <span className="info-value">{usage?.remainingCredits ?? 0}</span>
          </div>
        </div>
        <button onClick={subscribe!} className="btn btn-primary">
          Manage Subscription
        </button>
      </footer>
    </div>
  )
}

export default DigitalClock
