const knex = require("../database/knex");
const Paginator = require("./paginator");
const bcrypt = require("bcrypt");
const Joi = require("joi");

function adminRepository() {
  return knex("useradmin");
}

function readAdmin(payload) {
  return {
    ad_username: payload.ad_username,
    ad_name: payload.ad_name,
    ad_gender: payload.ad_gender,
    ad_phone: payload.ad_phone,
    ad_address: payload.ad_address,
    ad_password: payload.ad_password,
    ad_created_at: payload.ad_created_at,
    ad_updated_at: payload.ad_updated_at,
  };
}

// Schema kiểm tra dữ liệu đầu vào cho admin
const adminSchema = Joi.object({
  ad_username: Joi.string().required(),
  ad_name: Joi.string().required(),
  ad_gender: Joi.string().valid("male", "female").required(),
  ad_phone: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required(),
  ad_address: Joi.string().required(),
  ad_password: Joi.string().min(8).required(),
});

// Tạo một admin mới
async function createAdmin(payload) {
  const { error } = adminSchema.validate(payload);
  if (error) {
    throw new Error(error.details[0].message);
  }

  const admin = readAdmin(payload);
  admin.ad_password = await bcrypt.hash(admin.ad_password, 10); // Mã hóa mật khẩu
  admin.ad_created_at = new Date().toISOString();
  admin.ad_updated_at = new Date().toISOString();

  try {
    const [ad_id] = await adminRepository().insert(admin);
    const { ad_password, ...adminWithoutPassword } = admin; // Loại bỏ mật khẩu khi trả về
    return { ad_id, ...adminWithoutPassword };
  } catch (error) {
    throw error;
  }
}



// Lấy danh sách admin theo các tiêu chí tìm kiếm và phân trang
async function getManyAdmins(query) {
  const {
    ad_username,
    ad_name,
    ad_gender,
    ad_phone,
    page = 1,
    limit = 5,
    sortBy = "ad_created_at", // Trường sắp xếp mặc định
    order = "desc", // Thứ tự mặc định
  } = query;

  const paginator = new Paginator(page, limit);

  let results = await adminRepository()
    .where((builder) => {
      if (ad_username) {
        builder.where("ad_username", "like", `%${ad_username}%`);
      }
      if (ad_name) {
        builder.where("ad_name", "like", `%${ad_name}%`);
      }
      if (ad_gender) {
        builder.where("ad_gender", "=", ad_gender);
      }
      if (ad_phone) {
        builder.where("ad_phone", "like", `%${ad_phone}%`);
      }
    })
    .select(
      knex.raw("count(ad_id) OVER() AS recordCount"),
      "ad_id",
      "ad_username",
      "ad_name",
      "ad_gender",
      "ad_phone",
      "ad_address",
      "ad_created_at",
      "ad_updated_at"
    )
    .orderBy(sortBy, order)
    .limit(paginator.limit)
    .offset(paginator.offset);

  let totalRecords = 0;
  results = results.map((result) => {
    totalRecords = result.recordCount;
    delete result.recordCount;
    return result;
  });

  return {
    metadata: paginator.getMetadata(totalRecords),
    admins: results,
  };
}

// Lấy thông tin admin theo ID
async function getAdminById(ad_id) {
  return await adminRepository().where("ad_id", ad_id).select("*").first();
}

// Cập nhật thông tin admin
async function updateAdmin(ad_id, payload) {
  const existingAdmin = await adminRepository()
    .where("ad_id", ad_id)
    .select("*")
    .first();

  if (!existingAdmin) {
    return null;
  }

  const updatedFields = readAdmin(payload);

  // Chỉ cập nhật các trường có thay đổi
  Object.keys(updatedFields).forEach((key) => {
    if (
      updatedFields[key] === existingAdmin[key] ||
      updatedFields[key] === undefined
    ) {
      delete updatedFields[key];
    }
  });


  if (updatedFields.ad_password) {
    updatedFields.ad_password = await bcrypt.hash(
      updatedFields.ad_password,
      10
    ); // Mã hóa mật khẩu mới nếu có
  }

  if (Object.keys(updatedFields).length > 0) {
    updatedFields.ad_updated_at = new Date().toISOString();
    await adminRepository().where("ad_id", ad_id).update(updatedFields);
  }

  return { ...existingAdmin, ...updatedFields };
}

// Xóa admin theo ID
async function deleteAdmin(ad_id) {
  const adminToDelete = await adminRepository().where("ad_id", ad_id).first();

  if (!adminToDelete) {
    return null;
  }

  await adminRepository().where("ad_id", ad_id).del();
  return adminToDelete;
}

// Xóa tất cả admin
async function deleteAllAdmins() {
  await adminRepository().del();
}



async function testPasswordComparison(plainPassword, userId) {
  try {
    // Tìm người dùng từ cơ sở dữ liệu theo ID
    const user = await userRepository().where({ user_id: userId }).first();

    if (!user) {
      return { success: false, message: "User not found" };
    }

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(plainPassword, user.user_password);

    if (isMatch) {
      return { success: true, message: "Password matches" };
    } else {
      return { success: false, message: "Password does not match" };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}


module.exports = {
  adminRepository,
  readAdmin,
  createAdmin,
  getManyAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  deleteAllAdmins,
};
