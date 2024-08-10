import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await sql`SELECT * FROM notes;`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ err }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { title, body } = await req.json();
    const result =
      await sql`INSERT INTO notes(title, body) VALUES(${title}, ${body});`;

    return NextResponse.json({ result }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ err }, { status: 500 });
  }
}
