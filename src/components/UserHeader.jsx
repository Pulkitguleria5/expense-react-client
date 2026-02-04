import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function UserHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const userdetails = useSelector((state) => state.user);

  return (
    <nav className="w-full bg-gray-900 text-white border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center relative">

        {/* Brand */}
        <Link to="/dashboard" className="text-lg font-semibold">
          Dashboard
        </Link>

        {/* Mobile Toggle */}
        <button
          className="ml-auto lg:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Desktop Links */}
        <div className="hidden lg:flex ml-auto items-center gap-6">
          <Link
            to="/groups"
            className="text-sm font-medium hover:text-gray-300"
          >
            Groups
          </Link>

          {/* Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="font-medium"
            >
              {userdetails?.name || "Account"}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded shadow min-w-[140px]">
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

        {/* Mobile Menu */}
        <div
          className={`
            ${menuOpen ? "block" : "hidden"}
            absolute top-16 left-0 w-full bg-gray-900
            lg:hidden
          `}
        >
          <div className="flex flex-col gap-4 p-4">
            <Link to="/groups">Groups</Link>

            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-left"
            >
              {userdetails?.name || "Account"}
            </button>

            {dropdownOpen && (
              <Link
                to="/logout"
                className="pl-2 text-sm text-gray-300"
              >
                Logout
              </Link>
            )}
          </div>
        </div>

      </div>
    </nav>
  );
}

export default UserHeader;
