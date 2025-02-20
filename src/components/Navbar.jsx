import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout().then(() => {
      toast.success("Logout success");
    });
  };

  const link = (
    <div className="lg:flex space-x-2 lg:text-white md:text-black max-sm:text-black">
      <li>
        <Link className="btn btn-sm btn-ghost" to={"/tasks"}>
          Tasks
        </Link>
      </li>

      <li>
        <Link className="btn btn-sm btn-ghost" to={"/addTask"}>
          Add a Task
        </Link>
      </li>
    </div>
  );

  return (
    <div className="bg-[#0e5128] shadow-md text-white">
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-32 p-2 shadow"
            >
              {link}
            </ul>
          </div>
          <div className="flex items-center">
            <img
            className="w-full max-w-10"
              src="https://i.postimg.cc/htJhYBKH/c4dc0c567ebcfe0e6e85dcc47baa8f6f-removebg-preview-removebg-preview.png"
              alt=""
            />
            <a className="btn btn-ghost text-xl">TodoMate</a>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{link}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <button onClick={handleLogout} className="btn btn-sm btn-warning hover:scale-105 transition duration-300">
              Logout
            </button>
          ) : (
            <Link to={"/login"}>
              <button className="btn btn-success btn-sm text-white hover:scale-105 transition duration-300">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
