import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { images } from '../utils/constants'
import PersonIcon from '@mui/icons-material/Person' // Material icon for Sign In

const Header = () => {
  const { user } = useAuth()

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/">
          <img 
            src={images.logo} 
            alt="Buy & Sell" 
            className="h-10" 
          />
        </Link>
        
        <nav className="flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
                <img 
                  src={user.profileImage || images.man}
                  alt="User Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </Link>
              <Link to="/dashboard?tab=create" className="bg-rose-500 text-sm text-white px-4 py-2 rounded-full">
                Post Your Ad {' >'}
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600 flex items-center gap-1">
                <PersonIcon className="text-gray-500" fontSize="small" />
                Sign In
              </Link>
              <Link to="/dashboard?tab=create" className="bg-rose-500 text-sm text-white px-4 py-2 rounded-full">
                Post Your Ad {' >'}
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
