// app/api/books/route.js
import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";
const db_url = process.env.DATABASE_URL as string;

export async function GET() {
  const sql = neon(db_url);

  // Example: Get all books with author names and genres
  const books = await sql`
    SELECT 
      b.book_id,
      b.title,
      b.published_year,
      a.name AS author_name,
      STRING_AGG(g.name, ', ') AS genres
    FROM 
      books b
    JOIN 
      authors a ON b.author_id = a.author_id
    LEFT JOIN 
      book_genres bg ON b.book_id = bg.book_id
    LEFT JOIN 
      genres g ON bg.genre_id = g.genre_id
    GROUP BY 
      b.book_id, a.name
    ORDER BY 
      b.title;
  `;

  return Response.json({ books });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { bookId:number } }
) {
  const { bookId } = params;
  const sql = neon(db_url);

  try {
    // Delete book from database
    await sql`DELETE FROM books WHERE book_id = ${bookId}`;

    return NextResponse.json(
      { message: "Book deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting book:", error);
    return NextResponse.json(
      { error: "Failed to delete book" },
      { status: 500 }
    );
  }
}
