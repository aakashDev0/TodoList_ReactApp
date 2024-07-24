import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-purple-400 flex justify-between py-2'>
        <span className='text-xl font-bold mx-8'>iTask</span>
        <ul className='flex justify-between gap-8 mx-9 py-2'>
            <li>Home</li>
            <li>YourTasks</li>
        </ul>
    </nav>
  )
}

export default Navbar