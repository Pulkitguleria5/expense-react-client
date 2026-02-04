import { Link } from "react-router-dom";
import { useState } from "react";

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-gray-100 border-b">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between relative">

        {/* Brand */}
        <Link to="/" className="text-xl font-bold">
          Expense Tracker
        </Link>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {/* Menu */}
        <div
          className={`
            ${open ? "block" : "hidden"}
            absolute top-16 left-0 w-full bg-gray-100
            lg:static lg:block lg:w-auto
          `}
        >
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 p-4 lg:p-0">
            <Link
              to="/"
              className="hover:text-blue-600 font-medium"
            >
              Home
            </Link>

            <Link
              to="/login"
              className="hover:text-blue-600 font-medium"
            >
              Login
            </Link>
          </div>
        </div>

      </div>
    </nav>
  );
}

export default Header;
