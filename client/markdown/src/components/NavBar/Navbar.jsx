import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between bg-white  items-center p-2 absolute top-0 z-50 w-[100%] border-b border-neutral-800'>
    <h2 className='flex text-slate-700 text-4xl p-4'> <a href='/'>Tier</a></h2>
    <buttton className ="flex p-4  h-12 items-center bg-transparent border border-slate-900"> <a href='/login'>Login</a></buttton>
    </div>
  )
}

export default Navbar