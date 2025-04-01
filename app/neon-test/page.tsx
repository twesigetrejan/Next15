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
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch("/api/books");
        const data = await response.json();
        setBooks(data.books);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }

    fetchBooks();
  }, []);

  const deleteBook = async (bookId: number) => {
    try {
      const response = await fetch(`/api/books/${bookId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setBooks(books.filter((book) => book.book_id !== bookId));
      } else {
        console.error("Failed to delete book");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between mb-4 items-center">
        <h1 className="text-2xl font-bold">Book List</h1>
        <button className="bg-blue-500 px-4 rounded-lg hover:bg-blue-700 text-white py-2">
          Add a book
        </button>
      </div>

      <ul className="space-y-4">
        {books.map((book: Book) => (
          <li key={book.book_id} className="p-4 border rounded-lg shadow-md bg-white">
            <h2 className="text-xl font-semibold">{book.title}</h2>
            <p className="text-gray-600">Author: {book.author_name}</p>
            <p className="text-gray-500">Published: {book.published_year}</p>
            <p className="text-gray-700">Genres: {book.genres || "N/A"}</p>
            <button
              onClick={() => deleteBook(book.book_id)}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
