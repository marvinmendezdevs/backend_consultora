import { prisma } from "@/config/database";
import type { User } from "@/generated/prisma/client";

export const DashboardService = {
    stadistics: async (companyId: User['companyId']) => {
        const [clients] = await Promise.all([
            prisma.clients.count({
                where: {
                    companyId,
                }
            }),
        ]);

        return {
            clients
        }
    }
}