const knex = require("../database/knex");
const Paginator = require("./paginator");

function hairstyleRepository() {
  return knex("hairstyles");
}

function readHairstyle(payload) {
  return {
    hs_name: payload.hs_name,
    hs_image_url: payload.hs_image_url,
    hs_des: payload.hs_des,
    hs_created_at: payload.hs_created_at,
    hs_updated_at: payload.hs_updated_at,
  };
}

// async function createHairstyle(payload) {
//   const hairstyle = readHairstyle(payload);
//   const [hs_id] = await hairstyleRepository().insert(hairstyle);
//   return { hs_id, ...hairstyle };
// }

async function createHairstyle(payload) {
  // Chỉ lưu tên file (filename), không lưu đường dẫn đầy đủ
  const hairstyle = {
    ...readHairstyle(payload),
    hs_image_url: payload.hs_image_url, // Lấy từ payload, đã xử lý filename trong controller
  };

  const [hs_id] = await hairstyleRepository().insert(hairstyle);

  return { hs_id, ...hairstyle };
}


// // Hàm lấy danh sách kiểu tóc Nữ (gender_id = 2)
// async function fetchFemaleHairstyles() {
//   try {
//     const results = await knex("hairstyles as h")
//       .join(
//         "hairstyle_recommendations as hr",
//         "h.hs_id",
//         "=",
//         "hr.hairstyle_id"
//       )
//       .where("hr.gender_id", 2) // Chỉ lấy kiểu tóc Nữ
//       .select(
//         "h.hs_id",
//         "h.hs_name",
//         "h.hs_image_url",
//         "h.hs_des",
//         "h.hs_created_at",
//         "h.hs_updated_at"
//       )
//       .orderBy("h.hs_name", "asc"); // Sắp xếp theo tên

//     // Thêm kiểm tra kết quả rỗng
//     if (results.length === 0) {
//       return []; // Trả về mảng rỗng thay vì throw error
//     }

//     // Định dạng dữ liệu trả về
//     return results.map((hairstyle) => readHairstyle(hairstyle));
//   } catch (error) {
//     console.error("Error fetching female hairstyles:", error.message);
//     throw new Error("Failed to fetch female hairstyles.");
//   }
// }

async function fetchFemaleHairstyles() {
  try {
    const results = await knex("hairstyles as h")
      .join(
        "hairstyle_recommendations as hr",
        "h.hs_id",
        "=",
        "hr.hairstyle_id"
      )
      .where("hr.gender_id", 2)
      .distinct(
        // Thêm .distinct() để loại bỏ các bản ghi trùng
        "h.hs_id",
        "h.hs_name",
        "h.hs_image_url",
        "h.hs_des",
        "h.hs_created_at",
        "h.hs_updated_at"
      )
      .orderBy("h.hs_name", "asc");

    if (results.length === 0) {
      return [];
    }

    return results.map((hairstyle) => readHairstyle(hairstyle));
  } catch (error) {
    console.error("Error fetching female hairstyles:", error.message);
    throw new Error("Failed to fetch female hairstyles.");
  }
}

// Hàm lấy danh sách kiểu tóc Nam (gender_id = 1)
async function fetchMaleHairstyles() {
  try {
    const results = await knex("hairstyles as h")
      .join(
        "hairstyle_recommendations as hr",
        "h.hs_id",
        "=",
        "hr.hairstyle_id"
      )
      .where("hr.gender_id", 1) // Chỉ lấy kiểu tóc Nam
      .distinct(
        "h.hs_id",
        "h.hs_name",
        "h.hs_image_url",
        "h.hs_des",
        "h.hs_created_at",
        "h.hs_updated_at"
      )
      .orderBy("h.hs_name", "asc"); // Sắp xếp theo tên

    // Thêm kiểm tra kết quả rỗng
    if (results.length === 0) {
      return []; // Trả về mảng rỗng thay vì throw error
    }

    // Định dạng dữ liệu trả về
    return results.map((hairstyle) => readHairstyle(hairstyle));
  } catch (error) {
    console.error("Error fetching male hairstyles:", error.message);
    throw new Error("Failed to fetch male hairstyles.");
  }
}


async function getManyHairstyles(query) {
  const { hs_name, page = 1, limit = 5 } = query;
  const paginator = new Paginator(page, limit);

  let results = await hairstyleRepository()
    .where((builder) => {
      if (hs_name) {
        builder.where("hs_name", "like", `%${hs_name}%`);
      }
    })
    .select(
      knex.raw("count(hs_id) OVER() AS recordCount"),
      "hs_id",
      "hs_name",
      "hs_image_url",
      "hs_des",
      "hs_created_at",
      "hs_updated_at"
    )
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
    hairstyles: results,
  };
}

async function getHairstyleById(hs_id) {
  return hairstyleRepository().where("hs_id", hs_id).select("*").first();
}

async function updateHairstyle(hs_id, payload) {
  const existingHairstyle = await hairstyleRepository()
    .where("hs_id", hs_id)
    .select("*")
    .first();

  if (!existingHairstyle) {
    return null;
  }

  const update = { ...payload };

  await hairstyleRepository().where("hs_id", hs_id).update(update);

  return { ...existingHairstyle, ...update };
}

async function deleteHairstyle(hs_id) {
  const deletedHairstyle = await hairstyleRepository()
    .where("hs_id", hs_id)
    .first();

  if (!deletedHairstyle) {
    return null;
  }

  await hairstyleRepository().where("hs_id", hs_id).del();

  return deletedHairstyle;
}

async function deleteAllHairstyles() {
  return await hairstyleRepository().del();
}

module.exports = {
  hairstyleRepository,
  readHairstyle,
  createHairstyle,
  getManyHairstyles,
  getHairstyleById,
  updateHairstyle,
  deleteHairstyle,
  deleteAllHairstyles,
  fetchFemaleHairstyles,
  fetchMaleHairstyles,
};