import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
    const { user } = useContext(AuthContext);
    console.log(user);
    return (
        <div className="bg-blue-700 text-white py-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to={'/'}>
                    <h3 className="font-bold text-2xl">Task Manage</h3>
                </Link>
                <Link to={'/login'}>
                    <button className="btn btn-secondary">Login</button>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;