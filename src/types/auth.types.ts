import { User } from "@/generated/prisma/client";

export type LoginData = Pick<User, 'email' | 'password'>
export type CreateTokenJwtType = Omit<User, 'password'>