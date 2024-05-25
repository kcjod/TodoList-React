import React from 'react'

export const Navbar = () => {

  const elemClicked = ()=>{
    alert("We won't work bro😊")
  }

  return (
    <nav className='w-full bg-cyan-500'>
      <div className='w-3/4 flex justify-between py-4 mx-auto'>
      <div className='text-xl font-bold text-white'>
          ToDo
      </div>
      <ul className="flex text-white gap-5">
        <li className='cursor-pointer' onClick={elemClicked}>Home</li>
        <li className='cursor-pointer' onClick={elemClicked}>Tasks</li>
      </ul>
      </div>
    </nav>
  )
}
