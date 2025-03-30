const knex = require("../database/knex");
const Paginator = require("./paginator");
const bcrypt = require("bcrypt");
const Joi = require("joi");

// Repository cho bảng user_system
function userRepository() {
  return knex("user_system");
}

// Chuẩn hóa dữ liệu đầu vào
function readUser(payload) {
  return {
    user_username: payload.user_username,
    user_password: payload.user_password,
    user_email: payload.user_email,
    user_name: payload.user_name || null,
    gender_id: payload.gender_id || null,
    user_phone: payload.user_phone || null,
    user_address_id: payload.user_address_id || null,
    user_role: payload.user_role || 2,
    user_created_at: payload.user_created_at || new Date().toISOString(),
    user_updated_at: payload.user_updated_at || new Date().toISOString(),
  };
}

// Schema kiểm tra dữ liệu đầu vào cho user
const userSchema = Joi.object({
  user_username: Joi.string().required(),
  user_password: Joi.string().min(8).required(),
  user_email: Joi.string().email().required(),
  user_name: Joi.string().allow(null, ""),
  gender_id: Joi.number().integer().allow(null), // Cho phép null
  user_phone: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .allow(null, ""),
  user_address_id: Joi.number().integer().allow(null), // Cho phép null
  user_role: Joi.number().integer().default(2), // Giá trị mặc định là 2
});

// Tạo một user mới
async function createUser(payload) {
  const { error } = userSchema.validate(payload);
  if (error) {
    throw new Error(error.details[0].message);
  }

  const user = readUser(payload);
  user.user_password = await bcrypt.hash(user.user_password, 10); // Mã hóa mật khẩu

  try {
    const [user_id] = await userRepository().insert(user);
    const { user_password, ...userWithoutPassword } = user; // Loại bỏ mật khẩu khi trả về
    return { user_id, ...userWithoutPassword };
  } catch (error) {
    throw error;
  }
}

// Lấy danh sách user theo các tiêu chí tìm kiếm và phân trang
// async function getManyUsers(query) {
//   const {
//     user_username,
//     user_email,
//     user_phone,
//     page = 1,
//     limit = 5,
//     sortBy = "user_created_at", // Trường sắp xếp mặc định
//     order = "desc", // Thứ tự mặc định
//   } = query;

//   const paginator = new Paginator(page, limit);

//   let results = await userRepository()
//     .where((builder) => {
//       if (user_username) {
//         builder.where("user_username", "like", `%${user_username}%`);
//       }
//       if (user_email) {
//         builder.where("user_email", "like", `%${user_email}%`);
//       }
//       if (user_phone) {
//         builder.where("user_phone", "like", `%${user_phone}%`);
//       }
//     })
//     .select(
//       knex.raw("count(user_id) OVER() AS recordCount"),
//       "user_id",
//       "user_username",
//       "user_email",
//       "user_name",
//       "gender_id",
//       "user_phone",
//       "user_address_id",
//       "user_role",
//       "user_created_at",
//       "user_updated_at"
//     )
//     .orderBy(sortBy, order)
//     .limit(paginator.limit)
//     .offset(paginator.offset);

//   let totalRecords = 0;
//   results = results.map((result) => {
//     totalRecords = result.recordCount;
//     delete result.recordCount;
//     return result;
//   });

//   return {
//     metadata: paginator.getMetadata(totalRecords),
//     users: results,
//   };
// }

// Lấy danh sách user theo các tiêu chí tìm kiếm và phân trang
async function getManyUsers(query) {
  const {
    user_username,
    user_email,
    user_phone,
    user_role, // Thêm user_role vào filter
    page = 1,
    limit = 5,
    sortBy = "user_created_at", // Trường sắp xếp mặc định
    order = "desc", // Thứ tự mặc định
  } = query;

  const paginator = new Paginator(page, limit);

  let results = await userRepository()
    .where((builder) => {
      if (user_username) {
        builder.where("user_username", "like", `%${user_username}%`);
      }
      if (user_email) {
        builder.where("user_email", "like", `%${user_email}%`);
      }
      if (user_phone) {
        builder.where("user_phone", "like", `%${user_phone}%`);
      }
      if (user_role) {
        builder.where("user_role", user_role); // Filter theo user_role
      }
    })
    .select(
      knex.raw("count(user_id) OVER() AS recordCount"),
      "user_id",
      "user_username",
      "user_email",
      "user_name",
      "gender_id",
      "user_phone",
      "user_address_id",
      "user_role",
      "user_created_at",
      "user_updated_at"
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
    users: results,
  };
}

// Lấy thông tin user theo ID
async function getUserById(user_id) {
  return await userRepository().where("user_id", user_id).select("*").first();
}

// Cập nhật thông tin user
// async function updateUser(user_id, payload) {
//   const existingUser = await userRepository()
//     .where("user_id", user_id)
//     .select("*")
//     .first();

//   if (!existingUser) {
//     return null;
//   }

//   const updatedFields = readUser(payload);

//   // Chỉ cập nhật các trường có thay đổi
//   Object.keys(updatedFields).forEach((key) => {
//     if (
//       updatedFields[key] === existingUser[key] ||
//       updatedFields[key] === undefined
//     ) {
//       delete updatedFields[key];
//     }
//   });

//   if (updatedFields.user_password) {
//     updatedFields.user_password = await bcrypt.hash(
//       updatedFields.user_password,
//       10
//     ); // Mã hóa mật khẩu mới nếu có
//   }

//   if (Object.keys(updatedFields).length > 0) {
//     updatedFields.user_updated_at = new Date().toISOString();
//     await userRepository().where("user_id", user_id).update(updatedFields);
//   }

//   return { ...existingUser, ...updatedFields };
// }

async function updateUser(user_id, payload) {
  // Lấy thông tin người dùng hiện tại từ database
  const existingUser = await knex("user_system")
    .where("user_id", user_id)
    .first();
  if (!existingUser) {
    throw new Error(`User with id=${user_id} not found`);
  }

  // Loại bỏ các trường không hợp lệ hoặc trống ("")
  const updatedFields = {};
  Object.keys(payload).forEach((key) => {
    const value = payload[key];
    if (value !== undefined && value !== "") {
      // Bỏ qua nếu giá trị là undefined hoặc ""
      updatedFields[key] = value;
    }
  });

  // Nếu không có trường nào hợp lệ để cập nhật
  if (Object.keys(updatedFields).length === 0) {
    throw new Error("No valid fields to update");
  }

  // Xử lý riêng cho mật khẩu (nếu có)
  if (updatedFields.user_password) {
    updatedFields.user_password = await bcrypt.hash(
      updatedFields.user_password,
      10
    );
  }

  // Cập nhật thông tin người dùng
  updatedFields.user_updated_at = new Date().toISOString();
  await knex("user_system").where("user_id", user_id).update(updatedFields);

  // Trả về thông tin sau khi cập nhật
  return { ...existingUser, ...updatedFields };
}


// Xóa user theo ID
async function deleteUser(user_id) {
  const userToDelete = await userRepository().where("user_id", user_id).first();

  if (!userToDelete) {
    return null;
  }

  await userRepository().where("user_id", user_id).del();
  return userToDelete;
}

// Xóa tất cả user
async function deleteAllUsers() {
  await userRepository().del();
}

// Lấy thông tin user theo username
async function getUserByUsername(user_username) {
  return await userRepository()
    .where("user_username", user_username)
    .select("*")
    .first();
}

module.exports = {
  userRepository,
  readUser,
  createUser,
  getManyUsers,
  getUserById,
  updateUser,
  deleteUser,
  deleteAllUsers,
  getUserByUsername,
};