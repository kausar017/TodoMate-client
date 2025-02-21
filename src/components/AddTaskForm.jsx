import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const AddTaskForm = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/tasks";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("To-Do");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    setTitle("");
    setDescription("");
    setCategory("To-Do");

    const newTask = {
      title,
      description,
      timestamp: new Date().toISOString(),
      category,
      email: user?.email,
    };
    console.log(newTask);
    axios.post("http://localhost:5000/tasks", newTask).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        toast.success("Task added successfully");
        navigate(from);
      }
    });
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-auto p-6 rounded-lg shadow-lg shadow-gray-500 border"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Add Task</h2>

        {/* Title Field */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text font-semibold">Title</span>
          </label>
          <input
            type="text"
            placeholder="Task title"
            className="input input-bordered"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={50}
            required
          />
          <label className="label">
            <span className="label-text-alt">Maximum 50 characters</span>
          </label>
        </div>

        {/* Description Field */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text font-semibold">Description</span>
          </label>
          <textarea
            placeholder="Task description (optional)"
            className="textarea textarea-bordered"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={200}
          ></textarea>
          <label className="label">
            <span className="label-text-alt">Maximum 200 characters</span>
          </label>
        </div>

        {/* Category Field */}
        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text font-semibold">Category</span>
          </label>
          <select
            className="select select-bordered"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="To-Do">To-Do (Tasks to be done)</option>
            <option value="In Progress">In Progress (Ongoing tasks)</option>
            <option value="Done">Done (Completed tasks)</option>
          </select>
        </div>
        <button type="submit" className="btn bg-[#0E5128] text-white w-full">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTaskForm;
