const jwt = require("jsonwebtoken");
const JSend = require('../jsend');

//Middleware này kiểm tra xem có authorization header hay không và xác thực token.
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Lấy token từ header

  if (!token) {
    return res.status(401).json(JSend.fail("Access denied, token missing"));
  }

  //Xác minh tính hợp lệ của JWT và nếu hợp lệ, thêm thông tin người dùng (user) vào req
//   jwt.verify(token, "jwtSecretKey", (err, user) => {
//     if (err) {
//       console.log("Token verification failed:", err.message);
//       return res.status(403).json(JSend.fail("Invalid or expired token"));
//     }

//     req.user = user; // Lưu thông tin user vào request để dùng trong các route sau
//     next();
//   });
jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
  if (err) {
    console.log("Token verification failed:", err.message);
    return res.status(403).json(JSend.fail("Invalid or expired token"));
  }
  req.user = user; // Lưu thông tin user vào request để sử dụng trong các route tiếp theo
  next();
});
}

module.exports = authenticateToken;
