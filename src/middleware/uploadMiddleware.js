// backend-api/src/middleware/uploadMiddleware.js
import multer from 'multer';
import CloudinaryStorage from '../config/multerCloudinaryStorage.js';

// Setup Cloudinary storage for Multer (Images)
const imageStorage = new CloudinaryStorage({
  folder: 'aiconmac_uploads',
  resource_type: 'image',
  format: 'webp' // Convert images to webp
});

// Setup Cloudinary storage for Multer (PDFs/Resumes)
const resumeStorage = new CloudinaryStorage({
  folder: 'aiconmac_resumes',
  resource_type: 'raw' // Important for non-image files (PDFs)
});

// Configure Multer for images
const uploadImages = multer({
  storage: imageStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images (JPG, PNG, WebP) are allowed.'), false);
    }
  }
});

// Configure Multer for resumes
const uploadResumeFile = multer({
  storage: resumeStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF files are allowed for resumes.'), false);
    }
  }
});

// Export middleware functions
export const uploadSingleImage = uploadImages.single('image');
export const uploadMultipleImages = uploadImages.array('images', 10);
export const uploadResume = uploadResumeFile.single('resume');