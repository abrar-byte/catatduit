import { handleError, restrictedFields } from "@/lib/server";
import { restrict } from "@/lib/server/auth";
import { CREATE, LIST } from "@/lib/server/crud";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, params: any) => {
  try {
    const user = await restrict();
    return LIST(req, {
      where: { userId: user.id },
      withoutLimitPagination: true,
      select: {
        id: true,
        name: true,
        type: true,
        createdAt: true,
      },
      ...params,
    });
  } catch (error) {
    return handleError(error);
  }
};

export const POST = async (req: NextRequest, params: any) => {
  try {
    const user=await restrict();
    const data: Prisma.CategoryUncheckedCreateInput = await req.json();
if(!data.userId){
  data.userId=user.id
}
    return CREATE(req, { ...params, body: data });
  } catch (error) {
    return handleError(error);
  }
};
