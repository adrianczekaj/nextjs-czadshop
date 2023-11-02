import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/configs/dbConfig";
import Category from "@/models/categoryModel";
import { validateJWT } from "@/helpers/validateJWT";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const userId = await validateJWT(request);
    const reqBody = await request.json();
    const categoryExist = await Category.findOne({
      name: reqBody.name,
    });
    if (categoryExist) {
      throw new Error("Category already exist");
    }

    reqBody.createdBy = userId;
    const category = new Category(reqBody);
    await category.save();

    return NextResponse.json({
      message: "Category created successfully",
    });
  } catch (e: any) {
    return NextResponse.json(
      {
        message: e.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await validateJWT(request);
    const categories = await Category.find().populate("createdBy", "name");
    return NextResponse.json({
      data: categories,
    });
  } catch (e: any) {
    return NextResponse.json(
      {
        message: e.message,
      },
      {
        status: 500,
      }
    );
  }
}
