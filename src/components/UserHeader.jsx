import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function UserHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const userdetails = useSelector((state) => state.user);

  return (
    <nav className="w-full bg-gray-900 text-white border-b">
      <div className="max-w-7xl mx-auto px-4 flex items-center h-16">
        
        {/* Brand */}
        <Link to="/dashboard" className="text-lg font-semibold">
          Dashboard
        </Link>

        {/* Toggler */}
        <button
          className="ml-auto lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Collapse Section */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } absolute top-16 left-0 w-full bg-gray-900 lg:static lg:block lg:w-auto lg:ml-auto`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-6 p-4 lg:p-0">
            
            {/* Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="py-2"
              >
                {userdetails?.name || "Account"}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white text-black rounded shadow min-w-[120px]">
                  <Link
                    to="/logout"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
}

export default UserHeader;
