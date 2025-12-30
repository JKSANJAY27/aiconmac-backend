// backend-api/src/services/clientService.js
import prisma from '../models/prisma.js';
import cloudinary from '../config/cloudinary.js';

export const getAllClients = async () => {
    const clients = await prisma.client.findMany({
        orderBy: { createdAt: 'desc' },
    });
    return clients;
};

export const createClient = async (data, file) => {
    const { name, name_ar, name_ru } = data;

    const newClient = await prisma.client.create({
        data: {
            name,
            name_ar,
            name_ru,
            logo: file.path,
            publicId: file.filename,
        },
    });
    return newClient;
};

export const deleteClient = async (id) => {
    const client = await prisma.client.findUnique({
        where: { id },
    });

    if (!client) {
        throw new Error('Client not found');
    }

    // Delete logo from Cloudinary
    if (client.publicId) {
        await cloudinary.uploader.destroy(client.publicId);
    }

    await prisma.client.delete({ where: { id } });
    return { message: 'Client deleted successfully' };
};
