import { PrismaClient } from '@prisma/client';
export declare function createContext(prisma: PrismaClient): Promise<{
    prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
}>;
export type Context = Awaited<ReturnType<typeof createContext>>;
