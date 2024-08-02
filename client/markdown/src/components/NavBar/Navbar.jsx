import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between bg-white  items-center p-2   top-0 z-50 w-[100%] border-b border-neutral-200 '>
    <h2 className='flex text-slate-700 text-4xl p-4'> <a href='/'>Tier</a></h2>
    <buttton className ="flex p-4  h-12 items-center bg-transparent border border-slate-100 hover:bg-slate-400 hover:text-slate-900"> <a href='/login'>Get started</a></buttton>
    </div>
  )
}

export default Navbar