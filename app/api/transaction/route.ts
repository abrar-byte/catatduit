import { handleError } from "@/lib/server";
import { restrict } from "@/lib/server/auth";
import { CREATE, LIST } from "@/lib/server/crud";
import { Prisma } from "@prisma/client";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest, params: any) => {
  try {
    const user = await restrict();
    const include:Prisma.TransactionInclude = {
      category:{
        select:{id:true,name:true}
      }
    }
    return LIST(req, { where: { userId: user.id },include, ...params });
  } catch (error) {
    return handleError(error);
  }
};

export const POST = async (req: NextRequest, params: any) => {
  try {
    const data: Prisma.TransactionUncheckedCreateInput = await req.json();
    if (!data.userId) {
      data.userId = (await restrict()).id;
    }

    // await restrict();
    return CREATE(req, { ...params, body: data });
  } catch (error) {
    return handleError(error);
  }
};
