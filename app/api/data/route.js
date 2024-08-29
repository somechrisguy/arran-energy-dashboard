import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get("file");

  if (file) {
    // Return content of a specific file
    const filePath = path.join(process.cwd(), "public", file);
    try {
      const content = await fs.readFile(filePath, "utf-8");
      return NextResponse.json(JSON.parse(content));
    } catch (error) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
  } else {
    // Return list of JSON files
    const directory = path.join(process.cwd(), "public");
    const files = await fs.readdir(directory);
    const jsonFiles = files.filter((file) => file.endsWith(".json"));
    return NextResponse.json({ files: jsonFiles });
  }
}

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const buffer = await file.arrayBuffer();
  const text = new TextDecoder().decode(buffer);

  // Parse CSV and convert to JSON
  // (You'll need to implement the CSV parsing logic here)
  const jsonData = {
    title: "",
    description: "",
    data: {
      headers: [],
      rows: [],
    },
  };

  // Save JSON file
  const fileName = `${file.name.replace(".csv", "")}.json`;
  const filePath = path.join(process.cwd(), "public", fileName);
  await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2));

  return NextResponse.json({
    message: "File uploaded and converted successfully",
    fileName,
  });
}

export async function PUT(request) {
  const { filename, content } = await request.json();
  const filePath = path.join(process.cwd(), "public", filename);

  try {
    await fs.writeFile(filePath, JSON.stringify(content, null, 2));
    return NextResponse.json({ message: "File updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Error updating file" }, { status: 500 });
  }
}
