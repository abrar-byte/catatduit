import { handleError } from "@/lib/server";
import { CREATE, LIST } from "@/lib/server/crud";
import { NextRequest } from "next/server";


export const GET = async (req: NextRequest, params: any) => {
  try {
    // await restrict();
    return LIST(req, { ...params });
  } catch (error) {
    return handleError(error);
  }
};

export const POST = async (req: NextRequest, params: any) => {
  try {
    // await restrict();
    return CREATE(req, { ...params });
  } catch (error) {
    return handleError(error);
  }
};
