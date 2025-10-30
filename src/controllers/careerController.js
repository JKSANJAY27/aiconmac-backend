// backend-api/src/controllers/careerController.js
import * as careerService from '../services/careerService.js';

export const getCareerSubmissions = async (req, res, next) => {
  try {
    const filter = {
      isRead: req.query.isRead ? (req.query.isRead === 'true') : undefined,
    };
    const submissions = await careerService.getAllCareerSubmissions(filter);
    res.status(200).json(submissions);
  } catch (error) {
    next(error);
  }
};

export const getCareerSubmission = async (req, res, next) => {
  try {
    const submission = await careerService.getCareerSubmissionById(req.params.id);
    if (!submission) {
      res.status(404);
      throw new Error('Career submission not found');
    }
    res.status(200).json(submission);
  } catch (error) {
    next(error);
  }
};

export const createCareerSubmission = async (req, res, next) => {
  try {
    // req.file is from Multer for a single file upload
    const submission = await careerService.createCareerSubmission(req.body, req.file);
    res.status(201).json(submission);
  } catch (error) {
    next(error);
  }
};

export const updateCareerSubmission = async (req, res, next) => {
  try {
    const submission = await careerService.updateCareerSubmission(req.params.id, req.body);
    res.status(200).json(submission);
  } catch (error) {
    next(error);
  }
};

export const deleteCareerSubmission = async (req, res, next) => {
  try {
    const result = await careerService.deleteCareerSubmission(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};