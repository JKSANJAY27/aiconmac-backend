// backend-api/src/controllers/clientController.js
import * as clientService from '../services/clientService.js';

export const getClients = async (req, res, next) => {
    try {
        const clients = await clientService.getAllClients();
        res.status(200).json(clients);
    } catch (error) {
        next(error);
    }
};

export const createClient = async (req, res, next) => {
    try {
        if (!req.file) {
            res.status(400);
            throw new Error('Company logo is required');
        }
        const client = await clientService.createClient(req.body, req.file);
        res.status(201).json(client);
    } catch (error) {
        next(error);
    }
};

export const deleteClient = async (req, res, next) => {
    try {
        const result = await clientService.deleteClient(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};
