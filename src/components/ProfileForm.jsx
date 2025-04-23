import { useState, useEffect } from 'react'

const ProfileForm = ({ user, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    photo: '',
    location: '',
    phone: ''
  })

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        username: user.username || '',
        photo: user.photo || '',
        location: user.location || '',
        phone: user.phone || ''
      })
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="p-6 bg-white">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-6 max-w-2xl mx-auto">
        {/* Name Field */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Type Here"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-200 focus:border-rose-300"
            required
          />
        </div>

        {/* Email Field */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Type Here"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-200 focus:border-rose-300"
            required
          />
        </div>

        {/* Username Field */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Type Here"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-200 focus:border-rose-300"
            required
          />
        </div>

        {/* Photo Field */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-700">Photo URL</label>
          <input
            type="url"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
            placeholder="https://example.com/photo.jpg"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-200 focus:border-rose-300"
          />
        </div>

        {/* Location Field */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Type Here"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-200 focus:border-rose-300"
          />
        </div>

        {/* Contact Number Field */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-700">Contact Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Type Here"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-200 focus:border-rose-300"
          />
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="w-full bg-rose-500 hover:bg-rose-600 text-white py-3 px-4 rounded-full font-medium transition-colors mt-6"
        >
          Save
        </button>
      </form>
    </div>
  )
}

export default ProfileForm