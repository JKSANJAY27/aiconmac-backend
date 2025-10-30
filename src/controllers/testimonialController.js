// backend-api/src/controllers/testimonialController.js
import * as testimonialService from '../services/testimonialService.js';

export const getTestimonials = async (req, res, next) => {
  try {
    const filter = {
      isApproved: req.query.isApproved ? (req.query.isApproved === 'true') : undefined,
    };
    const testimonials = await testimonialService.getAllTestimonials(filter);
    res.status(200).json(testimonials);
  } catch (error) {
    next(error);
  }
};

export const getTestimonial = async (req, res, next) => {
  try {
    const testimonial = await testimonialService.getTestimonialById(req.params.id);
    if (!testimonial) {
      res.status(404);
      throw new Error('Testimonial not found');
    }
    res.status(200).json(testimonial);
  } catch (error) {
    next(error);
  }
};

export const createTestimonial = async (req, res, next) => {
  try {
    const testimonial = await testimonialService.createTestimonial(req.body);
    res.status(201).json(testimonial);
  } catch (error) {
    next(error);
  }
};

export const updateTestimonial = async (req, res, next) => {
  try {
    const testimonial = await testimonialService.updateTestimonial(req.params.id, req.body);
    res.status(200).json(testimonial);
  } catch (error) {
    next(error);
  }
};

export const deleteTestimonial = async (req, res, next) => {
  try {
    const result = await testimonialService.deleteTestimonial(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};