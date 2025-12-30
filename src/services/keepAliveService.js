import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const pingDatabase = async () => {
    try {
        // Run a lightweight query to keep Supabase active
        // Supabase free tier pauses after 1 week of inactivity.
        // We just need to touch the DB.
        await prisma.$executeRaw`SELECT 1`;
        console.log(`[${new Date().toISOString()}] 🟢 Keep-alive: Database pinged successfully.`);
        return true;
    } catch (error) {
        console.error(`[${new Date().toISOString()}] 🔴 Keep-alive: Database ping failed.`, error.message);
        return false;
    }
};

export const startKeepAliveCron = () => {
    // Schedule task to run every day at midnight and noon (every 12 hours)
    // The pattern '0 */12 * * *' means "At minute 0 past every 12th hour."
    cron.schedule('0 */12 * * *', async () => {
        console.log('⏰ Running scheduled database keep-alive ping...');
        await pingDatabase();
    });
    console.log('✅ Database keep-alive cron job scheduled (every 12 hours).');
};
