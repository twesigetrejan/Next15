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

    const { data, error } = await supabase
      .from("todos")
      .insert([{ task: newTask }])
      .select();

    if (error) {
      console.error(error);
    } else {
      setData((prevData) => [...prevData, ...data]);
      setNewTask("");
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
        <h1 className="mb-4">You can add some tasks over here</h1>
        <form onSubmit={addTodo}>
          <input
            className="border p-2 mb-4 w-full rounded-lg"
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter task"
          />
          <div className="py-2">
            <button
              type="submit"
              className="bg-blue-400 py-1 px-3 rounded-md hover:scale-105"
            >
              Add task
            </button>
          </div>
        </form>

        <h2 className="mb-4">Todo list as of 1/10/2025</h2>
        <div className="flex gap-4 flex-col">
          {data.map((item) => (
            <div key={item.id} className="flex gap-2 ">
              <p className="border-2 p-2 rounded-md">{item.task}</p>
              <button className="">Edit</button>
              <button className="">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
