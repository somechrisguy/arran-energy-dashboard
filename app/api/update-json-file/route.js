import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(request) {
  try {
    debugger;
    const { filename, content } = await request.json();

    if (!filename || !content) {
      return NextResponse.json(
        { error: "Filename and content are required" },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), "public", "data", filename);

    await fs.writeFile(filePath, JSON.stringify(content.data, null, 2));

    return NextResponse.json({ message: "File updated successfully" });
  } catch (error) {
    console.error("Error updating file:", error);
    return NextResponse.json(
      { error: "Failed to update file" },
      { status: 500 }
    );
  }
}
