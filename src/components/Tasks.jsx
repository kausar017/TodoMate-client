import axios from "axios";
import { format } from "date-fns";
import Loader from "./Loader";
import { useQuery } from "@tanstack/react-query";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
const Tasks = () => {
  const [deletedTask, setDeletedTask] = useState(null);
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

  if (isLoading) {
    return <Loader />;
  }

  const tasks = AllTasks.filter((item) => item?.email === user?.email);

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
      bgClass: "bg-black/10 p-4 rounded-lg shadow-black shadow-md",
    },
    {
      name: "In Progress",
      bgClass: "bg-blue-200 p-4 rounded-lg shadow-black shadow-md",
    },
    {
      name: "Done",
      bgClass: "bg-green-200 p-4 rounded-lg shadow-black shadow-md",
    },
  ];

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) return;

    const draggedTask = tasks.find((task) => task._id === result.draggableId);

    if (draggedTask) {
      try {
        await axios.put(
          `http://localhost:5000/updateDrag/${draggedTask._id}`,
          {
            category: destination.droppableId,
          }
        );

        toast.success("Task moved successfully!");
        refetch();
      } catch (error) {
        console.error("Failed to update task category", error);
      }
    }
  };

  return (
    <>
      <h1 className="text-center pt-10 font-bold text-5xl underline">Task</h1>
      <div className="container mx-auto pt-10">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {categories.map((category, index) => (
              <Droppable key={index} droppableId={category.name}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`${category.bgClass} min-h-screen`}
                  >
                    {category.name}
                    {tasks
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
                              className="bg-white p-2 my-6 shadow-sm shadow-black rounded-md relative"
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
                                className="border p-2 rounded-full absolute -top-5 right-8 shadow-sm shadow-black hover:bg-red-300 text-red-600"
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

// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// import { useNavigate } from "react-router-dom";
// import { FaEdit, FaTasks, FaTrash } from "react-icons/fa";

// const Tasks = () => {
//     const navigate = useNavigate();

//     const { data: tasks = [], refetch } = useQuery({
//         queryKey: ["tasks"],
//         queryFn: async () => {
//             const res = await axios.get("http://localhost:5000/tasks");
//             return res.data;
//         },
//     });

//     const [localTasks, setLocalTasks] = useState([]);

//     useEffect(() => {
//         setLocalTasks(tasks);
//     }, [tasks]);

//     const handleUpdate = (taskId) => {
//         navigate(`/tasks/update/${taskId}`);
//     };

//     // const handleDelete = (taskId) => {
//     //     Swal.fire({
//     //         title: "Are you sure?",
//     //         text: "You won't be able to revert this!",
//     //         icon: "warning",
//     //         showCancelButton: true,
//     //         confirmButtonColor: "#3085d6",
//     //         cancelButtonColor: "#d33",
//     //         confirmButtonText: "Yes, delete it!",
//     //     }).then((result) => {
//     //         if (result.isConfirmed) {
//     //             axios.delete(`http://localhost:5000/tasks/${taskId}`)
//     //                 .then((res) => {
//     //                     refetch();
//     //                     if (res.data.deletedCount > 0) {
//     //                         Swal.fire({
//     //                             title: "Deleted!",
//     //                             text: "Your task has been deleted.",
//     //                             icon: "success",
//     //                         });
//     //                     }
//     //                 })
//     //                 .catch((error) => console.error(error));
//     //         }
//     //     });
//     // };

//     const onDragEnd = async (result) => {
//         const { source, destination, draggableId } = result;
//         if (!destination) return;

//         if (source.droppableId === destination.droppableId) {
//             const tasksInColumn = localTasks.filter(task => task.category === source.droppableId);
//             const otherTasks = localTasks.filter(task => task.category !== source.droppableId);
//             const newTasksInColumn = Array.from(tasksInColumn);
//             const [movedTask] = newTasksInColumn.splice(source.index, 1);
//             newTasksInColumn.splice(destination.index, 0, movedTask);
//             setLocalTasks([...otherTasks, ...newTasksInColumn]);
//         } else {
//             const sourceTasks = localTasks.filter(task => task.category === source.droppableId);
//             const destinationTasks = localTasks.filter(task => task.category === destination.droppableId);
//             const otherTasks = localTasks.filter(task => task.category !== source.droppableId && task.category !== destination.droppableId);

//             const [movedTask] = sourceTasks.splice(source.index, 1);
//             movedTask.category = destination.droppableId;
//             destinationTasks.splice(destination.index, 0, movedTask);

//             setLocalTasks([...otherTasks, ...sourceTasks, ...destinationTasks]);

//             try {
//                 await axios.put(`http://localhost:5000/tasks/${draggableId}`, {
//                     category: destination.droppableId,
//                 });
//                 refetch();
//             } catch (error) {
//                 console.error("Error updating task category:", error);
//             }
//         }
//     };

//     const categories = [
//         { name: "To-Do", bgClass: "bg-gray-100 border border-gray-300 shadow-md" },
//         { name: "In Progress", bgClass: "bg-blue-100 border border-blue-300 shadow-md" },
//         { name: "Done", bgClass: "bg-green-100 border border-green-300 shadow-md" },
//     ];

//     return (
//         <div className="container mx-auto">
//             <h2 className="text-3xl font-bold mt-4 mb-6 text-center flex items-center justify-center gap-2">
//                 <FaTasks /> All Tasks
//             </h2>
//             <DragDropContext onDragEnd={onDragEnd}>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                     {categories.map((column) => (
//                         <Droppable key={column.name} droppableId={column.name}>
//                             {(provided) => (
//                                 <div
//                                     className={`${column.bgClass} p-5 rounded-lg min-h-[300px]`}
//                                     ref={provided.innerRef}
//                                     {...provided.droppableProps}
//                                 >
//                                     <h2 className="text-xl font-bold text-center mb-3 text-gray-700">{column.name}</h2>
//                                     {localTasks
//                                         .filter((task) => task.category === column.name)
//                                         .map((task, index) => (
//                                             <Draggable
//                                                 key={task._id}
//                                                 draggableId={task._id}
//                                                 index={index}
//                                             >
//                                                 {(provided) => (
//                                                     <div
//                                                         ref={provided.innerRef}
//                                                         {...provided.draggableProps}
//                                                         {...provided.dragHandleProps}
//                                                         className="bg-white p-4 my-3 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition duration-300"
//                                                     >
//                                                         <h3 className="font-semibold text-lg text-gray-800">{task.title}</h3>
//                                                         <p className="text-gray-600 mb-3">{task.description}</p>
//                                                         <div className="flex justify-between">
//                                                             <button
//                                                                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
//                                                                 onClick={() => handleUpdate(task._id)}
//                                                             >
//                                                                 <FaEdit className="inline mr-2" /> Update
//                                                             </button>
//                                                             <button
//                                                                 className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
//                                                                 onClick={() => handleDelete(task._id)}
//                                                             >
//                                                                 <FaTrash className="inline mr-2" /> Delete
//                                                             </button>
//                                                         </div>
//                                                     </div>
//                                                 )}
//                                             </Draggable>
//                                         ))}
//                                     {provided.placeholder}
//                                 </div>
//                             )}
//                         </Droppable>
//                     ))}
//                 </div>
//             </DragDropContext>
//         </div>
//     );
// };

// export default Tasks;

// <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-h-screen">
//   {/* To-Do */}
//   <div className="bg-black/10 p-4 rounded-lg shadow-black shadow-md">
//     <h2 className="text-lg font-bold">To-Do</h2>
//     {tasks
//       .filter((task) => task.category === "To-Do")
//       .map((task) => (
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           whileHover={{
//             scale: 1.02,
//             boxShadow: "0px 5px 10px rgba(0,0,0,0.2)",
//           }}
//           key={task._id}
//         >
//           <motion.div
//             initial={{ opacity: 1, x: 0 }}
//             animate={
//               deletedTask === task._id
//                 ? { opacity: 0, x: 100 }
//                 : { opacity: 1, x: 0 }
//             }
//             transition={{ duration: 0.5 }}
//             className="bg-white p-2 my-6 shadow-sm shadow-black rounded-md relative"
//           >
//             <h3 className="font-semibold">{task.title}</h3>
//             <p>{task.description}</p>
//             <p>Date: {format(new Date(task?.timestamp), "P")}</p>
//             <button
//               htmlFor="my_modal_7"
//               onClick={() => handleDelete(task?._id)}
//               className="border p-2 rounded-full absolute -top-5 -right-2 shadow-sm shadow-black hover:bg-red-300 text-red-600"
//             >
//               <MdDelete />
//             </button>
//             <Link
//               to={`/update/${task._id}`}
//               className="border p-2 rounded-full absolute -top-5 right-8 shadow-sm shadow-black hover:bg-red-300 text-red-600"
//             >
//               <BiEdit />
//             </Link>
//           </motion.div>
//         </motion.div>
//       ))}
//   </div>

//   {/* In Progress */}
//   <div className="bg-blue-200 p-4 rounded-lg shadow-black shadow-md">
//     <h2 className="text-lg font-bold">In Progress</h2>
//     {tasks
//       .filter((task) => task.category === "In Progress")
//       .map((task) => (
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           whileHover={{
//             scale: 1.02,
//             boxShadow: "0px 5px 10px rgba(0,0,0,0.2)",
//           }}
//           key={task._id}
//         >
//           <motion.div
//             initial={{ opacity: 1, x: 0 }}
//             animate={
//               deletedTask === task._id
//                 ? { opacity: 0, x: 100 }
//                 : { opacity: 1, x: 0 }
//             }
//             transition={{ duration: 0.5 }}
//             className="bg-white p-2 my-6 shadow-sm shadow-black rounded-md relative"
//           >
//             <h3 className="font-semibold">{task.title}</h3>
//             <p>{task.description}</p>
//             <p>Date: {format(new Date(task?.timestamp), "P")}</p>
//             <button
//               onClick={() => handleDelete(task?._id)}
//               className="border p-2 rounded-full absolute -top-5 -right-2 shadow-sm shadow-black hover:bg-red-300 text-red-600"
//             >
//               <MdDelete />
//             </button>
//             <Link
//               to={`/update/${task._id}`}
//               className="border p-2 rounded-full absolute -top-5 right-8 shadow-sm shadow-black hover:bg-red-300 text-red-600"
//             >
//               <BiEdit />
//             </Link>
//           </motion.div>
//         </motion.div>
//       ))}
//   </div>

//   {/* Done */}
//   <div className="bg-green-200 p-4 rounded-lg shadow-black shadow-md">
//     <h2 className="text-lg font-bold">Done</h2>
//     {tasks
//       .filter((task) => task.category === "Done")
//       .map((task) => (
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           whileHover={{
//             scale: 1.02,
//             boxShadow: "0px 5px 10px rgba(0,0,0,0.2)",
//           }}
//           key={task._id}
//         >
//           <motion.div
//             initial={{ opacity: 1, x: 0 }}
//             animate={
//               deletedTask === task._id
//                 ? { opacity: 0, x: 100 }
//                 : { opacity: 1, x: 0 }
//             }
//             transition={{ duration: 0.5 }}
//             className="bg-white p-2 my-6 shadow-sm shadow-black rounded-md relative"
//           >
//             <h3 className="font-semibold">{task.title}</h3>
//             <p>{task.description}</p>
//             <p>Date: {format(new Date(task?.timestamp), "P")}</p>
//             <button
//               onClick={() => handleDelete(task?._id)}
//               className="border p-2 rounded-full absolute -top-5 -right-2 shadow-sm shadow-black hover:bg-red-300 text-red-600"
//             >
//               <MdDelete />
//             </button>
//             <Link
//               to={`/update/${task._id}`}
//               className="border p-2 rounded-full absolute -top-5 right-8 shadow-sm shadow-black hover:bg-red-300 text-red-600"
//             >
//               <BiEdit />
//             </Link>
//           </motion.div>
//         </motion.div>
//       ))}
//   </div>
// </div>;
