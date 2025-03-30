const multer = require("multer");
const path = require("path");
const ApiError = require("../api-error");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/hairstyles/"); // Thư mục lưu trữ ảnh kiểu tóc
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniquePrefix + path.extname(file.originalname)); // Lưu với tên file unique
  },
});

// Middleware xử lý upload ảnh kiểu tóc
function hairstyleUpload(req, res, next) {
  const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      // Chỉ cho phép upload file hình ảnh
      const filetypes = /jpeg|jpg|png/;
      const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      const mimetype = filetypes.test(file.mimetype);

      if (extname && mimetype) {
        cb(null, true);
      } else {
        cb(new ApiError(400, "Only image files (jpeg, jpg, png) are allowed"));
      }
    },
  }).single("hairstyleFile"); // Đặt tên field file trong request là 'hairstyleFile'

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return next(
        new ApiError(
          400,
          "An error occurred while uploading the hairstyle image"
        )
      );
    } else if (err) {
      return next(
        new ApiError(
          500,
          "An unknown error occurred while uploading the hairstyle image"
        )
      );
    }
    next();
  });
}

module.exports = hairstyleUpload;

// const multer = require("multer");
// const path = require("path");
// const ApiError = require("../api-error");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/uploads/avatars/"); // Thư mục lưu trữ avatar
//   },
//   filename: function (req, file, cb) {
//     const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniquePrefix + path.extname(file.originalname)); // Lưu với tên file unique
//   },
// });

// // Middleware xử lý upload avatar
// function avatarUpload(req, res, next) {
//   const upload = multer({
//     storage: storage,
//     fileFilter: function (req, file, cb) {
//       // Chỉ cho phép upload file hình ảnh
//       const filetypes = /jpeg|jpg|png/;
//       const extname = filetypes.test(
//         path.extname(file.originalname).toLowerCase()
//       );
//       const mimetype = filetypes.test(file.mimetype);

//       if (extname && mimetype) {
//         cb(null, true);
//       } else {
//         cb(new ApiError(400, "Only image files (jpeg, jpg, png) are allowed"));
//       }
//     },
//   }).single("avatarFile"); // Đặt tên field file trong request là 'avatarFile'

//   upload(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//       return next(
//         new ApiError(400, "An error occurred while uploading the avatar")
//       );
//     } else if (err) {
//       return next(
//         new ApiError(
//           500,
//           "An unknown error occurred while uploading the avatar"
//         )
//       );
//     }
//     next();
//   });
// }

// module.exports = avatarUpload;