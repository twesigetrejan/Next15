"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";

interface Todo {
  id: number;
  task: string;
}

export default function DashboardPage() {
  const [data, setData] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTask, setEditingTask] = useState("");

  // Add a new todo
  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask) return;

    const { data: insertedData, error } = await supabase
      .from("todos")
      .insert([{ task: newTask }])
      .select();

    if (error) {
      console.error("Error adding todo:", error);
    } else {
      setData((prevData) => [...prevData, ...insertedData]);
      setNewTask("");
    }
  };

  // Edit an existing todo
  const startEditing = (id: number, task: string) => {
    setEditingId(id);
    setEditingTask(task);
  };

  const updateTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTask || editingId === null) return;

    const { error } = await supabase
      .from("todos")
      .update({ task: editingTask })
      .eq("id", editingId);

    if (error) {
      console.error("Error updating todo:", error);
    } else {
      setData((prevData) =>
        prevData.map((todo) =>
          todo.id === editingId ? { ...todo, task: editingTask } : todo
        )
      );
      setEditingId(null);
      setEditingTask("");
    }
  };

  // Delete a todo
  const deleteTodo = async (id: number) => {
    const { error } = await supabase.from("todos").delete().eq("id", id);
    if (error) {
      console.error("Error deleting todo:", error);
    } else {
      setData((prevData) => prevData.filter((todo) => todo.id !== id));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from("todos").select("*");
        if (error) {
          console.error("Error fetching todos:", error.message);
        } else {
          setData(data);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex items-center flex-col justify-center h-screen">
      <div className="border-2 px-20 py-16 rounded-lg flex flex-col gap-4">
        <h1 className="text-lg font-semibold">Todo Dashboard</h1>

        {/* Add Todo Form */}
        <form onSubmit={addTodo} className="flex flex-col gap-4">
          <input
            className="border p-2 rounded-lg w-full"
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task"
          />
          <button
            type="submit"
            className="bg-blue-400 text-white py-2 px-4 rounded-md hover:bg-blue-500"
          >
            Add Task
          </button>
        </form>

        <h2 className="text-lg font-semibold mt-4">Todo List</h2>
        <div className="flex flex-col gap-2">
          {data.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border p-4 rounded-lg"
            >
              {editingId === item.id ? (
                <form onSubmit={updateTodo} className="flex gap-2 w-full">
                  <input
                    className="border p-2 rounded-lg w-full"
                    type="text"
                    value={editingTask}
                    onChange={(e) => setEditingTask(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="bg-green-400 text-white py-1 px-3 rounded-md hover:bg-green-500"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    className="bg-gray-400 text-white py-1 px-3 rounded-md hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  <p className="w-[350px]">{item.task}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEditing(item.id, item.task)}
                      className="bg-green-400 text-white py-1 px-3 rounded-md hover:bg-green-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTodo(item.id)}
                      className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
