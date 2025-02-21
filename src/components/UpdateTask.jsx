import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { useForm } from "react-hook-form";

export default function UpdateTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Form submission function
  const onSubmit = async (data) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/updatTask/${id}`,
        data
      );
      console.log(res.data);

      navigate("/tasks");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["task"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/tasks`);
      return res.data;
    },
  });

  // Loading state
  if (isLoading) {
    return <Loader />;
  }

  // Filtering the task by id
  const filteredTask = tasks.find((task) => task._id === id);

  if (!filteredTask) {
    return <div>Task not found</div>; // If task is not found
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md mx-auto p-6 rounded-lg shadow-lg shadow-gray-500 border"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Update Task</h2>

        {/* Title Field */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text font-semibold">Title</span>
          </label>
          <input
            type="text"
            placeholder="Task title"
            className="input input-bordered"
            defaultValue={filteredTask.title}
            {...register("title", { required: true })}
            maxLength={50}
            required
          />
        </div>

        {/* Description Field */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text font-semibold">Description</span>
          </label>
          <textarea
            placeholder="Task description (optional)"
            className="textarea textarea-bordered"
            defaultValue={filteredTask.description}
            {...register("description", { required: true })}
            maxLength={200}
          ></textarea>
        </div>

        {/* Category Field */}
        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text font-semibold">Category</span>
          </label>
          <select
            defaultValue={filteredTask.category}
            {...register("category", { required: true })}
            className="select select-bordered"
          >
            <option value="To-Do">To-Do (Tasks to be done)</option>
            <option value="In Progress">In Progress (Ongoing tasks)</option>
            <option value="Done">Done (Completed tasks)</option>
          </select>
        </div>

        <button type="submit" className="btn bg-[#0E5128] text-white w-full">
          Update Task
        </button>
      </form>
    </div>
  );
}
