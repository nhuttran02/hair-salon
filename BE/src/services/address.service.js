const knex = require("../database/knex");
const Paginator = require("./paginator");

function addressRepository() {
  return knex("address");
}

function readAddress(payload) {
  return {
    user_id: payload.user_id || null, // Cho phép để trống
    street: payload.street,
    province_code: payload.province_code,
    district_code: payload.district_code,
    ward_code: payload.ward_code,
    administrative_unit_id: payload.administrative_unit_id || null,
    administrative_region_id: payload.administrative_region_id || null,
  };
}

async function createAddress(payload) {
  const address = readAddress(payload);
  const [address_id] = await addressRepository().insert(address);
  return { address_id, ...address };
}

// async function getManyAddresses(query) {
//   const {
//     province_code,
//     district_code,
//     ward_code,
//     page = 1,
//     limit = 5,
//   } = query;

//   const paginator = new Paginator(page, limit);

//   let results = await addressRepository()
//     .where((builder) => {
//       if (province_code) {
//         builder.where("province_code", province_code);
//       }
//       if (district_code) {
//         builder.where("district_code", district_code);
//       }
//       if (ward_code) {
//         builder.where("ward_code", ward_code);
//       }
//     })
//     .select(knex.raw("count(address_id) OVER() AS recordCount"), "*")
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
//     addresses: results,
//   };
// }

async function getManyAddresses(query) {
  const {
    province_code,
    district_code,
    ward_code,
    page = 1,
    limit = 10,
  } = query;

  // Đếm tổng số bản ghi
  const totalQuery = addressRepository().where((builder) => {
    if (province_code) builder.where("province_code", province_code);
    if (district_code) builder.where("district_code", district_code);
    if (ward_code) builder.where("ward_code", ward_code);
  });

  const totalRecords = await totalQuery
    .clone()
    .count("address_id as count")
    .first();

  // Lấy dữ liệu
  const results = await addressRepository()
    .where((builder) => {
      if (province_code) builder.where("province_code", province_code);
      if (district_code) builder.where("district_code", district_code);
      if (ward_code) builder.where("ward_code", ward_code);
    })
    .limit(limit)
    .offset((page - 1) * limit);

  return {
    addresses: results,
    metadata: {
      totalRecords: totalRecords.count,
      page,
      lastPage: Math.ceil(totalRecords.count / limit),
      limit,
    },
  };
}


async function getAddressById(address_id) {
  return addressRepository()
    .where("address_id", address_id)
    .select("*")
    .first();
}

async function updateAddress(address_id, payload) {
  // Tìm địa chỉ cần cập nhật
  const existingAddress = await addressRepository()
    .where("address_id", address_id)
    .first();

  // Nếu không tìm thấy địa chỉ, trả về null
  if (!existingAddress) {
    return null;
  }

  // Đọc và xử lý dữ liệu cập nhật
  const update = readAddress({
    ...existingAddress,
    ...payload,
  });

  // Thực hiện cập nhật
  await addressRepository().where("address_id", address_id).update(update);

  // Trả về địa chỉ đã cập nhật
  return { address_id, ...update };
}

async function deleteAddress(address_id) {
  // Tìm địa chỉ cần xóa
  const deletedAddress = await addressRepository()
    .where("address_id", address_id)
    .first();

  // Nếu không tìm thấy địa chỉ, trả về null
  if (!deletedAddress) {
    return null;
  }

  // Xóa địa chỉ khỏi cơ sở dữ liệu
  await addressRepository().where("address_id", address_id).del();

  // Trả về địa chỉ đã bị xóa
  return deletedAddress;
}

async function deleteAllAddresses() {
  // Xóa tất cả các địa chỉ
  await addressRepository().del();
}

async function getProvinces() {
  return knex("provinces").select("code", "name");
}

// async function getProvinces(req, res, next) {
//   try {
//     const provinces = await knex("provinces").select(
//       "code as province_code",
//       "name as province_name"
//     );
//     return res.json(JSend.success({ provinces }));
//   } catch (error) {
//     console.error("Error fetching provinces:", error);
//     return next(new ApiError(500, "Failed to fetch provinces"));
//   }
// }


// async function getDistricts(province_code) {
//   return knex("districts")
//     .where("province_code", province_code)
//     .select("code", "name");
// }

async function getDistricts(province_code) {
  return knex("districts")
    .where("province_code", province_code)
    .select("code as district_code", "name as district_name");
}

// async function getWards(district_code) {
//   return knex("wards")
//     .select("code", "name");
// }

async function getWards(district_code) {
  return knex("wards")
    .where("district_code", district_code)
    .select("code as ward_code", "name as ward_name");
}

module.exports = {
  addressRepository,
  readAddress,
  createAddress,
  getManyAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
  deleteAllAddresses,
  getDistricts,
  getWards,
  getProvinces
};