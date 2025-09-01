import db from "@/lib/Db";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const id = Number(params.id); 

    if (!id) {
      return NextResponse.json(
        { success: false, msg: "School ID is required" },
        { status: 400 }
      );
    }

    const query = `DELETE FROM schools WHERE id=?`;
    const [result] = await db.execute(query, [id]);

    return NextResponse.json({
      success: true,
      msg: "School deleted successfully",
      result,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 404 }
    );
  }
}
