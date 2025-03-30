// const multer = require('multer');
// const path = require('path');
// const ApiError = require('../api-error');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb){
//         cb(null, './public/uploads/');
//     },
//     filename: function (req, file, cb){
//         const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//         cb(null, uniquePrefix + path.extname(file.originalname));
//     },
// });

// function avatarUpload(req, res, next){
//     const upload = multer({ storage: storage }).single('avatarFile');

//     upload(req, res, function (err) {
//         if(err instanceof multer.MulterError){
//             return next(
//                 new ApiError(400, 'An error occurred while uploading the avatar')
//             );
//         }else if (err){
//             return next(
//                 new ApiError(
//                     500,
//                     'An unknown error occurred while uploading the avatar'
//                 )
//             );
//         }
//         next();
//     });
// }

// module.exports = avatarUpload;

// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// const ApiError = require("../api-error");

// // Đảm bảo thư mục lưu trữ tồn tại
// const uploadDir = "./public/uploads/avatars";
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Cấu hình lưu trữ multer
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir); // Chỉ định thư mục lưu trữ
//   },
//   filename: function (req, file, cb) {
//     const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniquePrefix + path.extname(file.originalname)); // Đặt tên tệp
//   },
// });

// // Kiểm tra loại tệp (chỉ cho phép ảnh)
// const fileFilter = (req, file, cb) => {
//   const fileTypes = /jpeg|jpg|png|gif/; // Các loại tệp được phép
//   const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = fileTypes.test(file.mimetype);

//   if (extname && mimetype) {
//     return cb(null, true); // Cho phép tệp
//   } else {
//     return cb(new ApiError(400, "Only image files are allowed"), false); // Từ chối tệp không hợp lệ
//   }
// };

// // Middleware xử lý tải lên avatar
// function avatarUpload(req, res, next) {
//   const upload = multer({
//     storage: storage,
//     fileFilter: fileFilter, // Thêm kiểm tra loại tệp
//   }).single("avatarFile");

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

// const multer = require("multer");
// const path = require("path");
// const ApiError = require("../api-error");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/uploads/avatars/"); // Thư mục lưu trữ ảnh avatar
//   },
//   filename: function (req, file, cb) {
//     const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniquePrefix + path.extname(file.originalname)); // Lưu với tên file unique
//   },
// });

// // Middleware xử lý upload ảnh avatar
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
//         new ApiError(400, "An error occurred while uploading the avatar image")
//       );
//     } else if (err) {
//       return next(
//         new ApiError(
//           500,
//           "An unknown error occurred while uploading the avatar image"
//         )
//       );
//     }
//     next();
//   });
// }

// module.exports = avatarUpload;



const multer = require("multer");
const path = require("path");
const ApiError = require("../api-error");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/avatars/"); // Thư mục lưu trữ ảnh avatar
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniquePrefix + path.extname(file.originalname)); // Lưu với tên file unique
  },
});

// Middleware xử lý upload ảnh avatar
function avatarUpload(req, res, next) {
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
  }).single("avatarFile"); // Đặt tên field file trong request là 'avatarFile'

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return next(
        new ApiError(400, "An error occurred while uploading the avatar image")
      );
    } else if (err) {
      return next(
        new ApiError(
          500,
          "An unknown error occurred while uploading the avatar image"
        )
      );
    }
    next();
  });
}

module.exports = avatarUpload;