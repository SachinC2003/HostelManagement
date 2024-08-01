import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Layout from './Pages/Layout.jsx'
import Home from "../src/Pages/Home.jsx"
import { RecoilRoot } from 'recoil'
import Demo from "./Pages/Landing.jsx"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
