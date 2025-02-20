import axios from "axios";
import { format } from "date-fns";
import Loader from "./Loader";
import { useQuery } from "@tanstack/react-query";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import UpdateTask from "./UpdateTask";

const Tasks = () => {
  const [deletedTask, setDeletedTask] = useState(null);

  const {
    data: tasks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["task"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/tasks");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  const handleDelete = async (id) => {
    setDeletedTask(id);
    try {
      setTimeout(async () => {
        await axios.delete(`http://localhost:5000/deletTasks/${id}`);
        toast.success("Task deleted");
        refetch();
      }, 500);
    } catch (error) {
      console.log("Data not deleted");
    }
  };

  const handaleEdite = (id) => {
    console.log(id);
  };

  return (
    <div className="container mx-auto pt-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-h-screen">
        {/* To-Do */}
        <div className="bg-black/10 p-4 rounded-lg shadow-black shadow-md">
          <h2 className="text-lg font-bold">To-Do</h2>
          {tasks
            .filter((task) => task.category === "To-Do")
            .map((task) => (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0px 5px 10px rgba(0,0,0,0.2)",
                }}
                key={task._id}
              >
                <motion.div
                  initial={{ opacity: 1, x: 0 }}
                  animate={
                    deletedTask === task._id
                      ? { opacity: 0, x: 100 }
                      : { opacity: 1, x: 0 }
                  }
                  transition={{ duration: 0.5 }}
                  className="bg-white p-2 my-6 shadow-sm shadow-black rounded-md relative"
                >
                  <h3 className="font-semibold">{task.title}</h3>
                  <p>{task.description}</p>
                  <p>Date: {format(new Date(task?.timestamp), "P")}</p>
                  <button
                    htmlFor="my_modal_7"
                    onClick={() => handleDelete(task?._id)}
                    className="border p-2 rounded-full absolute -top-5 -right-2 shadow-sm shadow-black hover:bg-red-300 text-red-600"
                  >
                    <MdDelete />
                  </button>
                  <button
                    onClick={() => handaleEdite(task?._id)}
                    className="border p-2 rounded-full absolute -top-5 right-8 shadow-sm shadow-black hover:bg-red-300 text-red-600"
                  >
                    <BiEdit />
                  </button>
                </motion.div>
              </motion.div>
            ))}
        </div>

        {/* In Progress */}
        <div className="bg-blue-200 p-4 rounded-lg shadow-black shadow-md">
          <h2 className="text-lg font-bold">In Progress</h2>
          {tasks
            .filter((task) => task.category === "In Progress")
            .map((task) => (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0px 5px 10px rgba(0,0,0,0.2)",
                }}
                key={task._id}
              >
                <motion.div
                  initial={{ opacity: 1, x: 0 }}
                  animate={
                    deletedTask === task._id
                      ? { opacity: 0, x: 100 }
                      : { opacity: 1, x: 0 }
                  }
                  transition={{ duration: 0.5 }}
                  className="bg-white p-2 my-6 shadow-sm shadow-black rounded-md relative"
                >
                  <h3 className="font-semibold">{task.title}</h3>
                  <p>{task.description}</p>
                  <p>Date: {format(new Date(task?.timestamp), "P")}</p>
                  <button
                    onClick={() => handleDelete(task?._id)}
                    className="border p-2 rounded-full absolute -top-5 -right-2 shadow-sm shadow-black hover:bg-red-300 text-red-600"
                  >
                    <MdDelete />
                  </button>
                  <button
                    onClick={() => handaleEdite(task?._id)}
                    className="border p-2 rounded-full absolute -top-5 right-8 shadow-sm shadow-black hover:bg-red-300 text-red-600"
                  >
                    <BiEdit />
                  </button>
                </motion.div>
              </motion.div>
            ))}
        </div>

        {/* Done */}
        <div className="bg-green-200 p-4 rounded-lg shadow-black shadow-md">
          <h2 className="text-lg font-bold">Done</h2>
          {tasks
            .filter((task) => task.category === "Done")
            .map((task) => (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0px 5px 10px rgba(0,0,0,0.2)",
                }}
                key={task._id}
              >
                <motion.div
                  initial={{ opacity: 1, x: 0 }}
                  animate={
                    deletedTask === task._id
                      ? { opacity: 0, x: 100 }
                      : { opacity: 1, x: 0 }
                  }
                  transition={{ duration: 0.5 }}
                  className="bg-white p-2 my-6 shadow-sm shadow-black rounded-md relative"
                >
                  <h3 className="font-semibold">{task.title}</h3>
                  <p>{task.description}</p>
                  <p>Date: {format(new Date(task?.timestamp), "P")}</p>
                  <button
                    onClick={() => handleDelete(task?._id)}
                    className="border p-2 rounded-full absolute -top-5 -right-2 shadow-sm shadow-black hover:bg-red-300 text-red-600"
                  >
                    <MdDelete />
                  </button>
                  <button
                    onClick={() => handaleEdite(task?._id)}
                    className="border p-2 rounded-full absolute -top-5 right-8 shadow-sm shadow-black hover:bg-red-300 text-red-600"
                  >
                    <BiEdit />
                  </button>
                </motion.div>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
