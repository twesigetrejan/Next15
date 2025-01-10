"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";

interface Todo {
  id: number;
  task: string;
}

export default function DashboardPage() {
  const [data, setData] = useState<Todo[]>([]);
  const [name, setName] = useState("");

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
    <div className="p-4">
      <h1 className="mb-4">Name please</h1>
      <input
        className="border p-2 mb-4"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <p className="mb-4">Hello {name}</p>

      <h2 className="mb-4">Todos</h2>
      <ul className="list-disc pl-4">
        {data.map((todo) => (
          <li key={todo.id}>{todo.task}</li>
        ))}
      </ul>
    </div>
  );
}
