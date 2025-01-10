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

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask) {
      return;
    }

    const { data: insertedData, error } = await supabase
      .from("todos")
      .insert([{ task: newTask }])
      .select();

    if (error) {
      console.error(error);
    } else {
      setData((prevData) => [...prevData, ...insertedData]);
      setNewTask("");
    }
  };

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
          console.log("Error fetching todos:", error.message);
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
              <p className="w-[350px]">{item.task}</p>
              <div className="flex gap-2">
                <button className="bg-green-400 text-white py-1 px-3 rounded-md hover:bg-green-500">
                  Edit
                </button>
                <button
                  onClick={() => deleteTodo(item.id)}
                  className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
