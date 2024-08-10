import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const result = await sql(``);
  } catch (err: any) {
    return NextResponse.json({ err }, { status: 500 });
  }
}
