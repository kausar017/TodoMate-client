import axios from "axios";
import { format } from "date-fns";
import Loader from "./Loader";
import { useQuery } from "@tanstack/react-query";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const Tasks = () => {
  const [deletedTask, setDeletedTask] = useState(null);
  const [localTasks, setLocalTasks] = useState([]);
  const { user } = useContext(AuthContext);

  const {
    data: AllTasks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["task"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/tasks");
      return res.data;
    },
  });

  useEffect(() => {
    if (AllTasks && user) {
      const filteredTasks = AllTasks.filter(
        (item) => item?.email === user?.email
      );
      if (JSON.stringify(filteredTasks) !== JSON.stringify(localTasks)) {
        setLocalTasks(filteredTasks);
      }
    }
  }, [AllTasks, user, localTasks]);

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

  const categories = [
    {
      name: "To-Do",
      bgClass:
        " p-4 rounded-lg shadow-black shadow-md shadow-md shadow-gray-500 border",
    },
    {
      name: "In Progress",
      bgClass:
        " p-4 rounded-lg shadow-black shadow-md shadow-md shadow-gray-500 border",
    },
    {
      name: "Done",
      bgClass: " p-4 rounded-lg shadow-md shadow-gray-500 border",
    },
  ];

  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const updatedTasks = [...localTasks];
    const movedTaskIndex = updatedTasks.findIndex(
      (task) => task._id === draggableId
    );
    if (movedTaskIndex === -1) return;

    updatedTasks[movedTaskIndex].category = destination.droppableId;
    setLocalTasks(updatedTasks);

    try {
      await axios.put(`http://localhost:5000/updateDrag/${draggableId}`, {
        category: destination.droppableId,
      });
      refetch();
    } catch (error) {
      console.error("Error updating task category:", error);
    }
  };

  return (
    <>
      <h1 className="text-center pt-10 font-bold text-5xl underline">Task</h1>
      <div className="container mx-auto pt-10">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-2">
            {categories.map((category, index) => (
              <Droppable key={index} droppableId={category.name}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`${category.bgClass} min-h-screen`}
                  >
                    <p className="text-xl font-bold"> {category.name}</p>
                    {localTasks
                      .filter((task) => task.category === category.name)
                      .map((task, index) => (
                        <Draggable
                          key={task._id}
                          draggableId={task._id}
                          index={index}
                        >
                          {(provided) => (
                            <motion.div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="p-2 my-6 shadow-md shadow-gray-500 rounded-md relative border backdrop-blur-md"
                            >
                              <h3 className="font-semibold text-xl">
                                {task.title}
                              </h3>
                              <p>{task.description}</p>
                              <p>
                                Date: {format(new Date(task?.timestamp), "P")}
                              </p>
                              <button
                                onClick={() => handleDelete(task?._id)}
                                className="border p-2 rounded-full absolute -top-5 -right-2 shadow-sm shadow-black hover:bg-red-300 text-red-600"
                              >
                                <MdDelete />
                              </button>
                              <Link
                                to={`/update/${task._id}`}
                                className="border p-2 rounded-full absolute -top-5 right-8 shadow-sm shadow-black hover:bg-white/20 "
                              >
                                <BiEdit />
                              </Link>
                            </motion.div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>
    </>
  );
};

export default Tasks;
