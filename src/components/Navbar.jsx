
const Navbar = () => {
    return (
        <div className="bg-blue-700 text-white py-4">
            <div className="container mx-auto flex justify-between items-center">
                <h3 className="font-bold text-2xl">Task Manage</h3>
                <button className="btn btn-secondary">Login</button>
            </div>
        </div>
    );
};

export default Navbar;