import prisma from '../models/prisma.js';

export const createBrochureRequest = async (email) => {
    return await prisma.brochureRequest.create({
        data: { email },
    });
};

export const getAllBrochureRequests = async () => {
    return await prisma.brochureRequest.findMany({
        orderBy: { createdAt: 'desc' },
    });
};
