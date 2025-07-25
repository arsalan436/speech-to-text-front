import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate  = useNavigate();
  const redirecttobody = ()=>{
    navigate("/body");
  }
  return (
    <div className='flex justify-between m-2'>
      <div onClick={redirecttobody}  className='logo px-4 py-2 bg-green-500  text-white font-medium rounded-lg cursor-pointer'>Speech to Text App</div>
      <div className='nav-items flex mx-2 gap-2'>
        
          <Link to={"/createnote"}  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition">
          Create New Notes
        </Link>
        

        
        <Link to={"/allnotes"} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition">
          See All Notes
        </Link>
        
      </div>
    </div>
  )
}

export default Navbar
