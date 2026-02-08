import * as brochureService from '../services/brochureService.js';

export const createBrochureRequest = async (req, res, next) => {
    try {
        const { email } = req.body;

        // Basic validation
        if (!email) {
            res.status(400);
            throw new Error('Email is required');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.status(400);
            throw new Error('Invalid email address');
        }

        await brochureService.createBrochureRequest(email);

        res.status(200).json({ message: 'Brochure request captured successfully' });
    } catch (error) {
        next(error);
    }
};

export const getBrochureRequests = async (req, res, next) => {
    try {
        const requests = await brochureService.getAllBrochureRequests();
        res.status(200).json(requests);
    } catch (error) {
        next(error);
    }
};
