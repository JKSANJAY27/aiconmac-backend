// backend-api/src/services/projectService.js
import prisma from '../models/prisma.js';
import cloudinary from '../config/cloudinary.js';

export const getAllProjects = async (filter = {}, pagination = {}) => {
  const { category, isPublished } = filter;
  const { skip, take } = pagination; // For future pagination

  const where = {};
  if (category) where.category = category;
  if (isPublished !== undefined) where.isPublished = isPublished;

  const projects = await prisma.project.findMany({
    where,
    include: { images: { orderBy: { order: 'asc' } } }, // Include images, ordered
    orderBy: [
      { isPinned: 'desc' },
      { pinOrder: 'asc' },
      { createdAt: 'desc' },
    ],
    skip: skip,
    take: take,
  });
  return projects;
};

export const getProjectById = async (id) => {
  const project = await prisma.project.findUnique({
    where: { id },
    include: { images: { orderBy: { order: 'asc' } } },
  });
  return project;
};

export const createProject = async (projectData, imageFiles = []) => {
  const {
    title, title_ar, title_ru,
    description, description_ar, description_ru,
    badge, badge_ar, badge_ru,
    category, category_ar, category_ru,
    slug, isPublished, isPinned, pinOrder
  } = projectData;

  const newProject = await prisma.project.create({
    data: {
      title, title_ar, title_ru,
      description, description_ar, description_ru,
      badge, badge_ar, badge_ru,
      category, category_ar, category_ru,
      slug,
      isPublished: isPublished === 'true' || isPublished === true,
      isPinned: isPinned === 'true' || isPinned === true,
      pinOrder: pinOrder ? parseInt(pinOrder) : 0,
      images: {
        create: imageFiles.map((file, index) => ({
          url: file.path,
          publicId: file.filename,
          altText: `${title} Image ${index + 1}`,
          order: index,
        })),
      },
    },
    include: { images: true },
  });
  return newProject;
};

export const updateProject = async (id, projectData, imageFiles = []) => {
  const {
    title, title_ar, title_ru,
    description, description_ar, description_ru,
    badge, badge_ar, badge_ru,
    category, category_ar, category_ru,
    slug, isPublished, isPinned, pinOrder, existingImageIds = []
  } = projectData;

  // Find existing images not in existingImageIds and delete them from Cloudinary
  const imagesToDelete = await prisma.image.findMany({
    where: {
      projectId: id,
      id: { notIn: existingImageIds },
    },
  });

  for (const img of imagesToDelete) {
    if (img.publicId) {
      await cloudinary.uploader.destroy(img.publicId);
    }
  }

  const updatedProject = await prisma.project.update({
    where: { id },
    data: {
      title, title_ar, title_ru,
      description, description_ar, description_ru,
      badge, badge_ar, badge_ru,
      category, category_ar, category_ru,
      slug,
      isPublished: isPublished === 'true' || isPublished === true,
      ...(isPinned !== undefined && { isPinned: isPinned === 'true' || isPinned === true }),
      ...(pinOrder !== undefined && { pinOrder: parseInt(pinOrder) }),
      images: {
        // Delete images not in the updated list
        deleteMany: {
          projectId: id,
          id: { notIn: existingImageIds },
        },
        // Create new images
        create: imageFiles.map((file, index) => ({
          url: file.path,
          publicId: file.filename,
          altText: `${title} Image ${index + 1}`, // Improve alt text
          order: index, // Adjust order as needed
        })),
        // Update existing images (if order/altText changes for example)
        // This part would be more complex if you allow reordering/editing alt text for existing images.
        // For simplicity here, we assume existing images are kept as is, new ones are added.
      },
    },
    include: { images: true },
  });
  return updatedProject;
};

export const deleteProject = async (id) => {
  const project = await prisma.project.findUnique({
    where: { id },
    include: { images: true },
  });

  if (!project) {
    throw new Error('Project not found');
  }

  // Delete images from Cloudinary
  for (const img of project.images) {
    if (img.publicId) {
      await cloudinary.uploader.destroy(img.publicId);
    }
  }

  // Delete project and related images from DB (due to onDelete: Cascade)
  await prisma.project.delete({ where: { id } });
  return { message: 'Project deleted successfully' };
};