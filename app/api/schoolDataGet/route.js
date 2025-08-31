
import db from "@/lib/Db";
import { NextResponse } from "next/server";


export async function GET(req){
  try{
         const query = "select * from schools"; 
         const [rows] = await db.execute(query);
          return NextResponse.json(
               { success: true, msg: "School Data Get successfully", rows },
               { status: 202 }
             );

  }catch(error){
          return NextResponse.json(
               { success: false, msg: "Server error", error: error.message },
               { status: 404 }
             );
            }
}