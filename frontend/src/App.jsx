import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './Pages/Signup'
import Signin from './Pages/Signin'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Signup />
      <Signin/>
    </div>
  )
}

export default App
