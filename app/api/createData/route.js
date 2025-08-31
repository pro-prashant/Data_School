
import { NextResponse } from "next/server";
import db from "@/lib/Db";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload buffer to Cloudinary
function uploadToCloudinary(buffer, folder) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder }, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
    stream.end(buffer);
  });
}

export async function POST(req) {
  try {
    // Get form data
    const formData = await req.formData();

    const name = formData.get("name");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const contact = formData.get("contact");
    const email_id = formData.get("email_id");
    const imageFile = formData.get("image");

    // Validation
    if (!name || !address || !city || !state || !contact || !email_id || !imageFile) {
      return NextResponse.json(
        { success: false, msg: "Missing required fields" },
        { status: 400 }
      );
    }

    // Upload image to Cloudinary
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const uploaded = await uploadToCloudinary(buffer, "school_images");

    // Insert into MySQL
    const query = `
      INSERT INTO schools
      (name, address, city, state, contact, email_id, image) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.execute(query, [
      name,
      address,
      city,
      state,
      contact,
      email_id,
      uploaded.secure_url, // Cloudinary image URL
    ]);

    return NextResponse.json(
      { success: true, msg: "School created successfully", result },
      { status: 202 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, msg: "Server error", error: error.message },
      { status: 404 }
    );
  }
}
