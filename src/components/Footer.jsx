import React from 'react'
import { images } from '../utils/constants'
import { icons } from '../utils/constants'
const Footer = () => {
  return (
    <footer className="bg-[#212121] text-white py-6 px-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap px-20 gap-4">
        {/* Left Section */}
        <div className="flex items-center space-x-2 text-sm">
          <img src={images.footerLogo} alt="Logo" className="h-6 object-contain" />
          <span className="text-rose-500  text-lg">|</span>
          <span className="text-gray-400 text-md">Copyright 2024</span>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <img src={icons.fb} alt="Facebook" className="h-7 w-7 object-contain" />
          <img src={icons.x} alt="X" className="h-7 w-7 object-contain" />
          <img src={icons.be} alt="Behance" className="h-7 w-7 object-contain" />
          <img src={icons.yt} alt="YouTube" className="h-7 w-7 object-contain" />
        </div>
      </div>
    </footer>
  )
}

export default Footer
