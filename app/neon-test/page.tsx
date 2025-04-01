"use client";

import { useEffect, useState } from "react";

export interface Book {
  book_id: number;
  title: string;
  author_name: string;
  published_year: number;
  genres?: string[] | null;
}

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch("/api/books");
        const data = await response.json();
        setBooks(data.books);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Book List</h1>
      <ul className="space-y-4">
        {books.map((book: Book) => (
          <li key={book.book_id} className="p-4 border rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{book.title}</h2>
            <p className="text-gray-600">Author: {book.author_name}</p>
            <p className="text-gray-500">Published: {book.published_year}</p>
            <p className="text-gray-700">Genres: {book.genres || "N/A"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
