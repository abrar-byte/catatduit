import { NextRequest, NextResponse } from "next/server";
import { handleError, restrictedFields } from "@/lib/server";
import { restrict } from "@/lib/server/auth";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { READ, REMOVE } from "@/lib/server/crud";

export const maxDuration = 60;
export const dynamic = "force-dynamic";
export const GET = async (req: NextRequest, params: any) => {
  try {
 
        return READ(req, { ...params });
    
  } catch (error) {
    return handleError(error);
  }
};

export const PATCH = async (req: NextRequest, { params }: any) => {
  try {
    await restrict();
    const data: Prisma.UserUncheckedUpdateInput = await req.json();
    if (data.email) {
      delete data.email;
    }
    const result = await prisma.user.update({
      where: { id: (await params).id },
      data,
    });
    return NextResponse.json(result);
    // return UPDATE(req, { ...params });
  } catch (error) {
    return handleError(error);
  }
};

export const DELETE = async (req: NextRequest, { params }: any) => {
  try {
    await restrict();
    // adding remove user auth from supaabse

    return REMOVE(req, { ...params });
  } catch (error) {
    return handleError(error);
  }
};

// export const PATCH = UPDATE;
// export const DEACTIVATE_USER = DEACTIVATE;
