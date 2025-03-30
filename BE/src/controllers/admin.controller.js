const adminService = require("../services/admin.service");
const ApiError = require("../api-error");
const JSend = require("../jsend");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const knex = require("../database/knex");

// Tạo admin mới
async function createAdmin(req, res, next) {
  if (
    !req.body?.ad_username ||
    typeof req.body.ad_username !== "string" ||
    req.body.ad_username.trim() === ""
  ) {
    return next(new ApiError(400, "Username should be a non-empty string"));
  }

  if (
    !req.body?.ad_password ||
    typeof req.body.ad_password !== "string" ||
    req.body.ad_password.trim() === ""
  ) {
    return next(new ApiError(400, "Password should be a non-empty string"));
  }

  try {
    const admin = await adminService.createAdmin({ ...req.body });
    return res
      .status(201)
      .set({
        Location: `${req.baseUrl}/${admin.ad_id}`,
      })
      .json(
        JSend.success({
          admin,
        })
      );
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "An error occurred while creating the admin")
    );
  }
}

// Lấy danh sách admin theo các tiêu chí tìm kiếm và phân trang
async function getAdminsByFilter(req, res, next) {
  let result = {
    admins: [],
    metadata: {
      totalRecords: 0,
      firstPage: 1,
      lastPage: 1,
      page: 1,
      limit: 5,
    },
  };

  try {
    result = await adminService.getManyAdmins(req.query);
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "An error occurred while retrieving admins"));
  }

  return res.json(
    JSend.success({
      admins: result.admins,
      metadata: result.metadata,
    })
  );
}

// Lấy thông tin admin theo ID
async function getAdmin(req, res, next) {
  const { ad_id } = req.params;
  try {
    const admin = await adminService.getAdminById(ad_id);
    if (!admin) {
      return next(new ApiError(404, "Resource not found"));
    }
    return res.json(JSend.success({ admin }));
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, `Error retrieving admin with id=${ad_id}`));
  }
}

// Cập nhật thông tin admin
async function updateAdmin(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Data to update cannot be empty"));
  }

  const { ad_id } = req.params;

  try {
    const updated = await adminService.updateAdmin(ad_id, { ...req.body });
    if (!updated) {
      return next(new ApiError(404, "Admin not found"));
    }
    return res.json(
      JSend.success({
        admin: updated,
      })
    );
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, `Error updating admin with id=${ad_id}`));
  }
}

// Xóa admin theo ID
async function deleteAdmin(req, res, next) {
  const { ad_id } = req.params;

  try {
    const deletedAdmin = await adminService.deleteAdmin(ad_id);
    if (!deletedAdmin) {
      return next(new ApiError(404, `Admin with id=${ad_id} not found`));
    }
    return res.json(
      JSend.success({
        message: `Admin with id=${ad_id} has been deleted`,
      })
    );
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, `Could not delete admin with id=${ad_id}`));
  }
}

// Xóa tất cả admin
async function deleteAllAdmins(req, res, next) {
  try {
    const deletedCount = await adminService.deleteAllAdmins();
    return res.json(
      JSend.success({
        message: `${deletedCount} admins have been deleted`,
      })
    );
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "An error occurred while removing all admins")
    );
  }
}

// Đăng nhập admin
async function login(req, res, next) {
  const { ad_username, ad_password } = req.body;

  if (!ad_username || !ad_password) {
    return next(new ApiError(400, "Username or password is required"));
  }

  try{
    //Tim nguoi dung theo username
    const user = await knex('useradmin').where({ad_username}).first();
    //Kiem tra user co ton tai khong
    if (!user) {
      return next(new ApiError(401, "Invalid username or password"));
    }

    //So sanh mat khau
    const token = jwt.sign({
      id: user.ad_id,
      username: user.ad_username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return res.status(200).json(
    JSend.success({
      message: 'Login successful',
      token,
    })
  );

  }catch (error){
    console.log(error);
    return next(new ApiError(500, "An error occurred while logging in"));
  }
}

module.exports = {
  createAdmin,
  getAdminsByFilter,
  getAdmin,
  updateAdmin,
  deleteAdmin,
  deleteAllAdmins,
  login,
};
