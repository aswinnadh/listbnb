import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import AdDetail from './pages/AdDetail'
import Dashboard from './pages/Dashboard'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import Footer from './components/Footer'

function App() {
  return (
    
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ads/:id" element={<AdDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App