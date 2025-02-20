import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout()
            .then(() => {
                alert('Logout success')
            })
    }

    return (
        <div className="bg-blue-700 text-white py-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to={'/'}>
                    <h3 className="font-bold text-2xl">Task Manage</h3>
                </Link>
                {
                    user ?
                        <>
                            <ul className="flex items-center gap-2">
                                <li>
                                    <Link to={'/tasks'}>
                                        Tasks
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/addTask'}>
                                        Add a Task
                                    </Link>
                                </li>
                            </ul>
                            <button onClick={handleLogout} className="btn btn-outline text-white">Logout</button>
                        </>
                        :
                        <Link to={'/login'}>
                            <button className="btn btn-secondary">Login</button>
                        </Link>
                }
            </div>
        </div>
    );
};

export default Navbar;