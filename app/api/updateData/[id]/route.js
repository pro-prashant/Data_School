import { NextResponse } from "next/server";
import db from "@/lib/Db";
import { v2 as cloudinary } from "cloudinary";
export const runtime = "nodejs";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function uploadToCloudinary(buffer, folder) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder }, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
    stream.end(buffer);
  });
}

// ✅ PUT method
export async function PUT(req, { params }) {
  try {
    const { id } = params; // 👈 dynamic id from URL
    const formData = await req.formData();

    const name = formData.get("name");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const contact = formData.get("contact");
    const email_id = formData.get("email_id");
    const imageFile = formData.get("image");

    let imageUrl = null;
    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const uploaded = await uploadToCloudinary(buffer, "school_images");
      imageUrl = uploaded.secure_url;
    }

    const fields = [];
    const values = [];

    if (name) { fields.push("name=?"); values.push(name); }
    if (address) { fields.push("address=?"); values.push(address); }
    if (city) { fields.push("city=?"); values.push(city); }
    if (state) { fields.push("state=?"); values.push(state); }
    if (contact) { fields.push("contact=?"); values.push(contact); }
    if (email_id) { fields.push("email_id=?"); values.push(email_id); }
    if (imageUrl) { fields.push("image=?"); values.push(imageUrl); }

    if (fields.length === 0) {
      return NextResponse.json({ success: false, msg: "No fields provided" }, { status: 400 });
    }

    values.push(id);

    const query = `
      UPDATE schools 
      SET ${fields.join(", ")} 
      WHERE id = ?
    `;
    const [result] = await db.execute(query, values);

    return NextResponse.json({ success: true, msg: "School updated successfully", result });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 404 });
  }
}
