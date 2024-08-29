// app/api/list-json-files/route.js
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  const publicDir = path.join(process.cwd(), "public/data");

  try {
    const files = await fs.readdir(publicDir);
    const jsonFiles = files.filter(
      (file) => path.extname(file).toLowerCase() === ".json"
    );
    return NextResponse.json(jsonFiles);
  } catch (error) {
    console.error("Error reading directory:", error);
    return NextResponse.json(
      { error: "Failed to read directory" },
      { status: 500 }
    );
  }
}
