// app/api/books/route.js
import { neon } from "@neondatabase/serverless";

export async function GET() {
  const sql = neon(process.env.DATABASE_URL);

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
