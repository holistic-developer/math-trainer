import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {Example} from "./Example";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Example />
  </React.StrictMode>,
)
