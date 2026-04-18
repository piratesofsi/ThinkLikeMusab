import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className='w-full sticky top-0 backdrop-blur-md bg-black/40  border-b border-white/5 '>
      <div className='w-full max-w-5xl px-4 py-4 flex justify-between items-center mx-auto
      '>
        {/* logo name */}
        <div className='flex'>
          <Link to="/"><h3 className='text-xl font-bold tracking-wide text-white'>ThinkLikeMusab</h3></Link>
        </div>

        {/* desktop links */}
        <div className='hidden md:flex'>
          <ul className='flex justify-center items-center gap-6 text-gray-400'>
            <Link to="/"><li className='hover:text-white transition-all duration-200'>Home</li></Link>
            <Link to="/Categories" className='hover:text-white transition-all duration-200'>Categories</Link>
            <Link to="/about"><li className='hover:text-white transition-all duration-200'>About</li></Link>
          </ul>
        </div>

        {/* mobile menu button */}
        <div className='md:hidden'>
          <button onClick={() => setIsOpen(!isOpen)} className='text-white'>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {isOpen && (
        <div className='md:hidden bg-black border-t border-gray-800'>
          <ul className='flex flex-col items-center gap-4 py-4 text-gray-400'>
            <Link to="/" onClick={() => setIsOpen(false)}><li className='hover:text-white transition-all duration-200'>Home</li></Link>
            <Link to="/Categories" onClick={() => setIsOpen(false)}  className='hover:text-white transition-all duration-200'>Categories</Link>
            <Link to="/about" onClick={() => setIsOpen(false)}><li className='hover:text-white transition-all duration-200'>About</li></Link>
          </ul>
        </div>
      )}
    </section>
  )
}

export default Navbar
