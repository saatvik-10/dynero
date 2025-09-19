import { PrismaClient } from '@prisma/client';

//next js has hard reloading and we dont want to initialize prisma client multiple times
declare global {
    var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = db;
}