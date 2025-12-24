// backend-api/scripts/init-db.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Testing database connection...');

        // Test connection
        await prisma.$connect();
        console.log('✅ Database connected successfully');

        // Check if Client table exists by trying to count
        const clientCount = await prisma.client.count();
        console.log(`✅ Client table exists with ${clientCount} records`);

        // Fetch all clients
        const clients = await prisma.client.findMany();
        console.log('✅ Clients fetched:', JSON.stringify(clients, null, 2));

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error('Stack:', error.stack);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
