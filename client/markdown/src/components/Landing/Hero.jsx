import React from 'react'
import heroGIF from '../../Images/heroImage.gif'

const Hero = () => {
  return (
    // <div className='  flex justify-between bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900 via-blue-900 to-black  h-svh'>
    <div className='flex bg-slate-300 h-svh'>
    {/* <div className='flex rounded-full bg-blue-300 w-24 h-20'></div> */}
    <div className='flex w-[60%] justify-center items-center flex-col p-12'> <h2 className='flex text-5xl text-white font-mono'>Simplify your format Process: Your Ideas, Your texts, Our Syntax</h2>
   <button className='flex bg-zinc-50 w-32 items-center justify-center p-4 mr-auto mt-12 '> <a href='/login'> Login</a></button>
   
<h2 className='flex fill-emerald-100'> Illustration by <a href="https://icons8.com/illustrations/author/Go8GMpKPAq1W">Polina M.</a> from <a href="https://icons8.com/illustrations">Ouch!</a></h2>  
</div>
        <img src={heroGIF} className='flex ml-auto w-[40%]'></img>
        {/* <div className='flex rounded-full  bg-blue-300 w-24 h-20 mt-52 mr-40'></div> */}


    </div> 
  )
}

export default Hero