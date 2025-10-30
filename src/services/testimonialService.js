// backend-api/src/services/testimonialService.js
import prisma from '../models/prisma.js';

export const getAllTestimonials = async (filter = {}) => {
  const { isApproved } = filter;
  const where = {};
  if (isApproved !== undefined) where.isApproved = isApproved;

  const testimonials = await prisma.testimonial.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });
  return testimonials;
};

export const getTestimonialById = async (id) => {
  const testimonial = await prisma.testimonial.findUnique({ where: { id } });
  return testimonial;
};

export const createTestimonial = async (testimonialData) => {
  const testimonial = await prisma.testimonial.create({ data: testimonialData });
  return testimonial;
};

export const updateTestimonial = async (id, testimonialData) => {
  const testimonial = await prisma.testimonial.update({ where: { id }, data: testimonialData });
  return testimonial;
};

export const deleteTestimonial = async (id) => {
  await prisma.testimonial.delete({ where: { id } });
  return { message: 'Testimonial deleted successfully' };
};