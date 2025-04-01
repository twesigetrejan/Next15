import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

const db_url = process.env.DATABASE_URL as string;

export async function DELETE(
  req: NextRequest,
  { params }: { params: { bookId: string } }
) {
  const { bookId } = params;
  const sql = neon(db_url);

  try {
    const bookIdNum = parseInt(bookId);
    if (isNaN(bookIdNum)) {
      return NextResponse.json({ error: "Invalid book ID" }, { status: 400 });
    }

    await sql`DELETE FROM books WHERE book_id = ${bookIdNum}`;

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
