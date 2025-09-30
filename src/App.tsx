import { useSubscribeDev } from '@subscribe.dev/react'
import './App.css'
import DigitalClock from './components/DigitalClock'

function SignInScreen() {
  const { signIn } = useSubscribeDev()

  return (
    <div className="sign-in-screen">
      <div className="sign-in-card">
        <h1 className="app-title">Digital Clock</h1>
        <p className="sign-in-message">Sign in to access your personalized digital clock</p>
        <button onClick={signIn} className="sign-in-button">
          Sign In
        </button>
      </div>
    </div>
  )
}

function App() {
  const { isSignedIn } = useSubscribeDev()

  if (!isSignedIn) {
    return <SignInScreen />
  }

  return <DigitalClock />
}

export default App
