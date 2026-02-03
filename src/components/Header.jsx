import { Link } from 'react-router-dom';
import { useState } from 'react';

function Header() {
    const [open, setOpen] = useState(true);
    return (
        <nav className="w-full bg-gray-100 border-b ">

            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16 relative">
                <Link to="/" className="text-xl font-bold py-4">
                    Expense Tracker
                </Link>

                <button className="ml-auto lg:hidden"
                    onClick={() => setOpen(!open)}>
                    ☰
                </button>


                <div className={`${open ? "block" : "hidden"} absolute top-16 left-0 w-full bg-gray-100 lg:static lg:block lg:w-auto`}>



                    <div className="flex flex-col lg:flex-row lg:ml-auto lg:gap-6 p-4 lg:p-0">
                        <Link to="/">Home</Link>
                        <Link to="/login">login</Link>
                    </div>
                </div>

            </div>

        </nav>
    );
}

export default Header;