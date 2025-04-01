
"use server";
import { neon } from "@neondatabase/serverless";

const db_url = process.env.DATABASE_URL as string;

export async function getData() {
  const sql = neon(db_url);
  const data = await sql`...`;
  return data;
}
