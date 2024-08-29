// app/api/convert-csv/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import Papa from "papaparse";

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("file");
  const filename = formData.get("filename");
  const title = formData.get("title");
  const description = formData.get("description");

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const csvContent = await file.text();

  const result = Papa.parse(csvContent, { header: true });

  const jsonContent = JSON.stringify(
    {
      title,
      description,
      headers: result.meta.fields,
      data: result.data,
    },
    null,
    2
  );

  const filePath = path.join(process.cwd(), "public/data", `${filename}.json`);

  try {
    await fs.writeFile(filePath, jsonContent);
    return NextResponse.json({
      message: "File converted and saved successfully",
      data: JSON.parse(jsonContent),
    });
  } catch (error) {
    console.error("Error writing file:", error);
    return NextResponse.json({ error: "Failed to save file" }, { status: 500 });
  }
}
