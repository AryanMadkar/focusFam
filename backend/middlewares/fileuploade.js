const multer  = require('multer');
const path = require('path');
const fs = require('fs');
const cloudinary = require('../utils/cloudinary');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `user-${Date.now()}${path.extname(file.originalname)}`);
  }
});


const upload = multer({ storage });

const uploadToCloudinary = async (filePath) => {
  const res = await cloudinary.uploader.upload(filePath, {
    folder: 'user_profiles'
  });
  fs.unlinkSync(filePath); // remove local file
  return res.secure_url;
};

module.exports = { upload, uploadToCloudinary };