export class Env {
    private static get(key: string): string {
        const value = process.env[key];
        if (!value) {
            throw new Error(`La variable de entorno ${key} no está definida.`);
        }
        return value;
    }

    static readonly AUTH_JWT_KEY = Env.get('AUTH_JWT_KEY');
    static readonly DATABASE_URL = Env.get('DATABASE_URL');
    static readonly PORT = Env.get('PORT');
    static readonly NODE_ENV = Env.get('NODE_ENV');
}