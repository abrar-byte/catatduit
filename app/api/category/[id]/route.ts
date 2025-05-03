import { NextRequest, NextResponse } from "next/server";
import { handleError, restrictedFields } from "@/lib/server";
import { restrict } from "@/lib/server/auth";

import { READ, REMOVE, UPDATE } from "@/lib/server/crud";

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
    return UPDATE(req, { ...params });
  } catch (error) {
    return handleError(error);
  }
};

export const DELETE = async (req: NextRequest, { params }: any) => {
  try {
    await restrict();

    return REMOVE(req, { ...params });
  } catch (error) {
    return handleError(error);
  }
};
