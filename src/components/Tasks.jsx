import axios from "axios";
import { useEffect, useState } from "react";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/tasks")
            .then(data => setTasks(data?.data));
    }, []);
    console.log(tasks);
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* To-Do */}
            <div className="bg-gray-200 p-4">
                <h2 className="text-lg font-bold">To-Do</h2>
                {tasks.filter(task => task.category === "To-Do").map(task => (
                    <div key={task._id} className="bg-white p-2 my-2 shadow rounded">
                        <h3 className="font-semibold">{task.title}</h3>
                        <p>{task.description}</p>
                    </div>
                ))}
            </div>

            {/* In Progress */}
            <div className="bg-blue-200 p-4">
                <h2 className="text-lg font-bold">In Progress</h2>
                {tasks.filter(task => task.category === "In Progress").map(task => (
                    <div key={task._id} className="bg-white p-2 my-2 shadow rounded">
                        <h3 className="font-semibold">{task.title}</h3>
                        <p>{task.description}</p>
                    </div>
                ))}
            </div>

            {/* Done */}
            <div className="bg-green-200 p-4">
                <h2 className="text-lg font-bold">Done</h2>
                {tasks.filter(task => task.category === "Done").map(task => (
                    <div key={task._id} className="bg-white p-2 my-2 shadow rounded">
                        <h3 className="font-semibold">{task.title}</h3>
                        <p>{task.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tasks;