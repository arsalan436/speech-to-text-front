import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabaseClient';
import { AuthContext } from '../../utils/AuthContext';

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();


  // Handle logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/'); // redirect to login page
  };

  const redirecttobody = () => {
    navigate("/body");
  };

  return (
    <div className='flex justify-between m-2 items-center'>
      <div onClick={redirecttobody} className='logo px-4 py-2 bg-green-500 text-white font-medium rounded-lg cursor-pointer'>
        Speech to Text App
      </div>

       <div className='flex items-center gap-4'>
        <div className='nav-items flex gap-2'>
          {user && (<Link to="/createnote" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition">
            Create Note
          </Link>
          )}
          {user && (<Link to="/allnotes" className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition">
            Saved Notes
          </Link>
          )}
          {user && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-lg transition cursor-pointer"
            >
              Logout
            </button>
            
          )}

          {user && (
          <div className='text-sm  font-medium flex flex-col border rounded-sm p-1'><div className='flex justify-center'>Welcome,</div> {user.email.split('@')[0]}</div>
        )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
