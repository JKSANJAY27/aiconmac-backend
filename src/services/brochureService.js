import prisma from '../models/prisma.js';

export const createBrochureRequest = async (email) => {
    return await prisma.brochureRequest.upsert({
        where: { email },
        update: {
            count: { increment: 1 }
        },
        create: { email },
    });
};

export const getAllBrochureRequests = async () => {
    return await prisma.brochureRequest.findMany({
        orderBy: { createdAt: 'desc' },
    });
};
