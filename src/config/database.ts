import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from '../generated/prisma/client'
import { Env } from "@/utils/env.utils";

const connectionString = `${Env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma }