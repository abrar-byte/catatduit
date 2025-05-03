import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var globalPrisma: PrismaClient | undefined;
}
let conn: PrismaClient;
if (process.env.NODE_ENV === "production") {
  conn = new PrismaClient();
} else {
  if (!global.globalPrisma) {
    global.globalPrisma = new PrismaClient();
  }
  conn = global.globalPrisma;
}
export const prismaAny = conn as any;
export const prisma = conn as PrismaClient;

// import client, { PrismaClient } from '@prisma/client';

// interface CustomNodeJsGlobal {
//   prisma: PrismaClient;
// }
// declare const global: CustomNodeJsGlobal;
// export const prisma = global.prisma || new PrismaClient();
// if (process.env.NODE_ENV === 'development') global.prisma = prisma;
