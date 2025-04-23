import React from 'react'
import navTitle from '../assets/images/nav-title.png'
import fbIcon from '../assets/icon/fb.png'
import xIcon from '../assets/icon/x.png'
import beIcon from '../assets/icon/be.png'
import ytIcon from '../assets/icon/yt.png'

const Footer = () => {
  return (
    <footer className="bg-[#212121] text-white py-6 px-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap px-20 gap-4">
        {/* Left Section */}
        <div className="flex items-center space-x-2 text-sm">
          <img src={navTitle} alt="Logo" className="h-6 object-contain" />
          <span className="text-rose-500  text-lg">|</span>
          <span className="text-gray-400 text-lg">Copyright 2024</span>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <img src={fbIcon} alt="Facebook" className="h-7 w-7 object-contain" />
          <img src={xIcon} alt="X" className="h-7 w-7 object-contain" />
          <img src={beIcon} alt="Behance" className="h-7 w-7 object-contain" />
          <img src={ytIcon} alt="YouTube" className="h-7 w-7 object-contain" />
        </div>
      </div>
    </footer>
  )
}

export default Footer
