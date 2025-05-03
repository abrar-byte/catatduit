import jwt from "jsonwebtoken";
import { headers } from "next/headers";
import { prisma } from "../prisma";
import { Prisma,  User } from "@prisma/client";
import { isObjectEmpty } from "./index";
type P = {
  adminOnly?: boolean; // todo: ganti jadi roles utk handle staff
  ignoreInactive?: boolean;
};
export const restrict = async ({
  adminOnly = false,
  ignoreInactive = false,
}: P = {}) => {
  const headerStore = await headers();
  const auth = headerStore?.get("Authorization");
  const token = auth?.split(" ")?.[1];
  if (!token) throw new Error("404-Unauthorized");
  const decoded: any = verifyJwtToken(token);
  const user = await prisma.user.findFirstOrThrow({
    where: { email: decoded.email },
  });
//   if (!user.active && !ignoreInactive) throw new Error("You were inactive");
//   if (adminOnly && user.role === "USER") throw new Error("Unauthorized"); 
  return user as User;
};

export function verifyJwtToken(token: string) {
  const secret: any = process.env.SUPABASE_JWT_SECRET;
  console.log("secret",secret);
  console.log("token",token);
  
  
  const payload = jwt.verify(token, secret);
  return payload;
}
