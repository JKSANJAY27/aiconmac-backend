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
  const {
    quote, quote_ar, quote_ru,
    author, author_ar, author_ru,
    title, title_ar, title_ru,
    company, company_ar, company_ru,
    isApproved
  } = testimonialData;

  const testimonial = await prisma.testimonial.create({
    data: {
      quote, quote_ar, quote_ru,
      author, author_ar, author_ru,
      title, title_ar, title_ru,
      company, company_ar, company_ru,
      isApproved
    }
  });
  return testimonial;
};

export const updateTestimonial = async (id, testimonialData) => {
  const {
    quote, quote_ar, quote_ru,
    author, author_ar, author_ru,
    title, title_ar, title_ru,
    company, company_ar, company_ru,
    isApproved
  } = testimonialData;

  const testimonial = await prisma.testimonial.update({
    where: { id },
    data: {
      quote, quote_ar, quote_ru,
      author, author_ar, author_ru,
      title, title_ar, title_ru,
      company, company_ar, company_ru,
      isApproved
    }
  });
  return testimonial;
};

export const deleteTestimonial = async (id) => {
  await prisma.testimonial.delete({ where: { id } });
  return { message: 'Testimonial deleted successfully' };
};