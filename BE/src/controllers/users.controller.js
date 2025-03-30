const userService = require("../services/users.service");
const ApiError = require("../api-error");
const JSend = require("../jsend");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Tạo một người dùng mới
async function createUser(req, res, next) {
  const { user_username, user_password, user_email } = req.body;

  if (!user_username || !user_password || !user_email) {
    return next(
      new ApiError(
        400,
        "Fields user_username, user_password, and user_email are required"
      )
    );
  }

  try {
    const user = await userService.createUser(req.body);
    return res.status(201).json(
      JSend.success({
        message: "User created successfully",
        user,
      })
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return next(new ApiError(500, "An error occurred while creating the user"));
  }
}

// Lấy danh sách người dùng theo tiêu chí tìm kiếm và phân trang
// async function getUsersByFilter(req, res, next) {
//   try {
//     const result = await userService.getManyUsers(req.query);
//     return res.json(
//       JSend.success({
//         users: result.users,
//         metadata: result.metadata,
//       })
//     );
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     return next(new ApiError(500, "An error occurred while retrieving users"));
//   }
// }

async function getUsersByFilter(req, res, next) {
  const { user_role, page, limit } = req.query;

  try {
    // Validate query parameters
    if (user_role && isNaN(Number(user_role))) {
      return next(new ApiError(400, "Invalid user_role; must be a number"));
    }
    if (page && isNaN(Number(page))) {
      return next(new ApiError(400, "Invalid page; must be a number"));
    }
    if (limit && isNaN(Number(limit))) {
      return next(new ApiError(400, "Invalid limit; must be a number"));
    }

    // Fetch users with the given query parameters
    const result = await userService.getManyUsers(req.query);

    return res.json(
      JSend.success({
        users: result.users,
        metadata: result.metadata,
      })
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return next(new ApiError(500, "An error occurred while retrieving users"));
  }
}

// Lấy thông tin người dùng theo ID
async function getUser(req, res, next) {
  const { user_id } = req.params;

  try {
    const user = await userService.getUserById(user_id);
    if (!user) {
      return next(new ApiError(404, "User not found"));
    }

    // Loại bỏ mật khẩu trước khi trả về
    const { user_password, ...userWithoutPassword } = user;

    return res.json(JSend.success({ user: userWithoutPassword }));
  } catch (error) {
    console.error("Error fetching user:", error);
    return next(new ApiError(500, `Error retrieving user with id=${user_id}`));
  }
}

// Cập nhật thông tin người dùng
async function updateUser(req, res, next) {
  const { user_id } = req.params;

  if (!Object.keys(req.body).length) {
    return next(new ApiError(400, "Data to update cannot be empty"));
  }

  try {
    if (req.body.user_password) {
      req.body.user_password = await bcrypt.hash(req.body.user_password, 10);
    }

    const updatedUser = await userService.updateUser(user_id, req.body);
    if (!updatedUser) {
      return next(new ApiError(404, "User not found"));
    }

    return res.json(
      JSend.success({
        message: "User updated successfully",
        user: updatedUser,
      })
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return next(new ApiError(500, `Error updating user with id=${user_id}`));
  }
}

// Xóa người dùng theo ID
async function deleteUser(req, res, next) {
  const { user_id } = req.params;

  try {
    const deletedUser = await userService.deleteUser(user_id);
    if (!deletedUser) {
      return next(new ApiError(404, "User not found"));
    }

    return res.json(
      JSend.success({
        message: `User with id=${user_id} has been deleted`,
      })
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return next(new ApiError(500, `Error deleting user with id=${user_id}`));
  }
}

// Xóa tất cả người dùng
async function deleteAllUsers(req, res, next) {
  try {
    await userService.deleteAllUsers();
    return res.json(
      JSend.success({
        message: "All users have been deleted",
      })
    );
  } catch (error) {
    console.error("Error deleting all users:", error);
    return next(
      new ApiError(500, "An error occurred while removing all users")
    );
  }
}

// Đăng nhập người dùng và tạo JWT token
async function loginUser(req, res, next) {
  const { user_username, user_password } = req.body;

  if (!user_username || !user_password) {
    return next(
      new ApiError(400, "Fields user_username and user_password are required")
    );
  }

  try {
    const user = await userService.getUserByUsername(user_username);

    if (!user) {
      return next(new ApiError(404, "Username or password is incorrect"));
    }

    const isMatch = await bcrypt.compare(user_password, user.user_password);
    if (!isMatch) {
      return next(new ApiError(401, "Username or password is incorrect"));
    }

    const token = jwt.sign(
      { user_id: user.user_id, user_role: user.user_role },
      process.env.JWT_SECRET || "defaultSecretKey", // Dùng secret từ file .env
      { expiresIn: "1h" }
    );

    return res.json(
      JSend.success({
        message: "Login successful",
        token,
        user: {
          user_id: user.user_id,
          user_username: user.user_username,
          user_email: user.user_email,
          user_role: user.user_role,
        },
      })
    );
  } catch (error) {
    console.error("Error during login process:", error);
    return next(new ApiError(500, "An error occurred while logging in"));
  }
}

module.exports = {
  createUser,
  getUsersByFilter,
  getUser,
  updateUser,
  deleteUser,
  deleteAllUsers,
  loginUser,
};