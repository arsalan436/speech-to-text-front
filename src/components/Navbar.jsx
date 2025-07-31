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
  <div className="flex justify-between items-center px-4 py-2 m-2 bg-[#0d1117]/90 backdrop-blur-md shadow-xl rounded-md border border-gray-700">

    <div
      onClick={redirecttobody}
      className="logo px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-700 text-white font-semibold rounded-lg cursor-pointer hover:scale-105 hover:shadow-lg hover:ring-2 hover:ring-teal-300 transition-all duration-300"
    >
      Speech to Text App
    </div>

    <div className="flex items-center gap-4">
      <div className="nav-items flex gap-2">
        {user && (
          <Link
            to="/createnote"
            className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-medium rounded-lg shadow hover:scale-105 hover:ring-2 hover:ring-indigo-300 transition-all duration-300"
          >
            Create Note
          </Link>
        )}

        {user && (
          <Link
            to="/allnotes"
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-700 text-white font-medium rounded-lg shadow hover:scale-105 hover:ring-2 hover:ring-purple-300 transition-all duration-300"
          >
            Saved Notes
          </Link>
        )}

        {user && (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-900 text-white font-medium rounded-lg shadow hover:scale-105 hover:ring-2 hover:ring-gray-400 transition-all duration-300 cursor-pointer"
          >
            Logout
          </button>
        )}

        {user && (
          <div className="text-sm font-medium flex flex-col items-center border border-gray-600 bg-gray-800 text-white rounded-md px-3 py-1 shadow">
            <div className="text-gray-400">Welcome,</div>
            {user.email.split('@')[0]}
          </div>
        )}
      </div>
    </div>
  </div>
);

}

export default Navbar;
