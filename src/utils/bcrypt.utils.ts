import bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
    const SALT_ROUNDS = 10
    return await bcrypt.hash(password, SALT_ROUNDS);
}

export const verifyPassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
}