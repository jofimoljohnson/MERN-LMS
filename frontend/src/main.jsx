import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/auth-context'
import InstructorProvider from './context/Instructor-context'
import StudentProvider from './context/Student-context'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthProvider>
      <InstructorProvider>
 <StudentProvider>
         <App />
 </StudentProvider>
      </InstructorProvider>
  </AuthProvider>
  </BrowserRouter>
)
