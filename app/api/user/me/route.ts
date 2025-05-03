import { handleError } from "@/lib/server";
import { restrict } from "@/lib/server/auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, params: any) => {
  try {
    const user = await restrict();
    return NextResponse.json(user);
    
  } catch (error) {
    return handleError(error);
  }
};