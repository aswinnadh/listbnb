import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../utils/api'
import { useAuth } from '../../context/AuthContext'
import MailIcon from '@mui/icons-material/Mail'
import KeyIcon from '@mui/icons-material/VpnKey'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import titleImg from '../../assets/images/title.png'
import loginImg from '../../assets/images/log.png'

const Login = () => {
  const [error, setError] = useState(null)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (credentials) => {
    try {
      const { user, jwt } = await loginUser(credentials)
      login(user, jwt)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="max-w-5xl mx-auto border border-gray-200 rounded-lg overflow-hidden my-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Section - Login Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <div className="flex flex-col items-center mb-10 space-y-4">
            <img src={titleImg} alt="Listbnb" className="h-10 mb-4" />
            <p className="text-center text-gray-600 text-xs mb-3">
              <span className="font-bold">Listbnb</span> a Largest Classified Listing Marketplace offers perfect Ads classifieds...
            </p>
            <h2 className="text-xl font-semibold">Login To Your Account</h2>
          </div>

          {error && <div className="text-red-500 mb-6 text-center">{error}</div>}

          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit({
                identifier: e.target.username.value,
                password: e.target.password.value
              })
            }}
            className="space-y-6"
          >
            {/* Username Field */}
            <div className="flex flex-col justify-start space-y-2">
              <label htmlFor="username" className="text-gray-700">Username</label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Type here"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-200 focus:border-rose-300 pr-12"
                />
                <MailIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col justify-start space-y-2">
              <label htmlFor="password" className="text-gray-700">Password</label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Type here"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-200 focus:border-rose-300 pr-12"
                />
                <KeyIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-rose-500 hover:bg-rose-600 text-white py-4 px-6 rounded-full font-medium transition-colors flex items-center justify-center gap-2"
            >
              Login
              <ArrowForwardIcon className="text-white" />
            </button>
          </form>
        </div>

        {/* Right Section - Promo Content */}
        <div className="w-full md:w-1/2 bg-rose-50 p-10 flex flex-col items-center justify-center space-y-6">
          <img src={loginImg} alt="Login" className="max-w-xs mb-8" />
          <h2 className="text-2xl font-bold">
            Don't Have an Account<span className="text-rose-500">?</span>
          </h2>
          <p className="text-sm text-gray-600 text-center max-w-md">
            To connect with us please register for a new account if you are not having one already.
          </p>
          <button
            onClick={() => navigate('/register')}
            className="bg-rose-500 hover:bg-rose-600 text-white py-3 px-8 rounded-full font-medium transition-colors flex items-center justify-center gap-2"
          >
            Register
            <ArrowForwardIcon className="text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
