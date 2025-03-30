// const knex = require("../database/knex");
// const Paginator = require("./paginator");

// function branchRepository() {
//   return knex("branch");
// }

// function readBranch(payload) {
//   return {
//     branch_name: payload.branch_name,
//     branch_address: payload.branch_address,
//     branch_created_at: payload.branch_created_at,
//     branch_updated_at: payload.branch_updated_at,
//   };
// }

// async function createBranch(payload) {
//   const branch = readBranch(payload);
//   const [branch_id] = await branchRepository().insert(branch);
//   return { branch_id, ...branch };
// }

// async function getManyBranches(query) {
//   const { branch_name, branch_address, page = 1, limit = 5 } = query;
//   const paginator = new Paginator(page, limit);

//   let results = await branchRepository()
//     .where((builder) => {
//       if (branch_name) {
//         builder.where("branch_name", "like", `%${branch_name}%`);
//       }
//       if (branch_address) {
//         builder.where("branch_address", "like", `%${branch_address}%`);
//       }
//     })
//     .select(
//       knex.raw("count(branch_id) OVER() AS recordCount"),
//       "branch_id",
//       "branch_name",
//       "branch_address",
//       "branch_created_at",
//       "branch_updated_at"
//     )
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
//     branch: results,
//   };
// }

// async function getBranchById(branch_id) {
//   return branchRepository().where("branch_id", branch_id).select("*").first();
// }

// async function updateBranch(branch_id, payload) {
//   const existingBranch = await branchRepository()
//     .where("branch_id", branch_id)
//     .select("*")
//     .first();

//   if (!existingBranch) {
//     return null;
//   }

//   const update = { ...payload };

//   await branchRepository().where("branch_id", branch_id).update(update);

//   return { ...existingBranch, ...update };
// }

// async function deleteBranch(branch_id) {
//   const deletedBranch = await branchRepository()
//     .where("branch_id", branch_id)
//     .first();

//   if (!deletedBranch) {
//     return null;
//   }

//   await branchRepository().where("branch_id", branch_id).del();

//   return deletedBranch;
// }

// async function deleteAllBranches() {
//   return await branchRepository().del();
// }

// module.exports = {
//   branchRepository,
//   readBranch,
//   createBranch,
//   getManyBranches,
//   getBranchById,
//   updateBranch,
//   deleteBranch,
//   deleteAllBranches,
// };

const knex = require("../database/knex");
const Paginator = require("./paginator");

function branchRepository() {
  return knex("branch");
}

function readBranch(payload) {
  return {
    branch_name: payload.branch_name,
    branch_address_id: payload.branch_address_id,
    branch_updated_at: payload.branch_updated_at || new Date().toISOString(), // Nếu không có thời gian cập nhật, mặc định là hiện tại
  };
}

// Tạo một chi nhánh mới
async function createBranch(payload) {
  const branch = readBranch(payload);
  const [branch_id] = await branchRepository().insert(branch);
  return { branch_id, ...branch };
}

// Lấy danh sách các chi nhánh (có phân trang)
// async function getManyBranches(query) {
//   const { branch_name, page = 1, limit = 10 } = query; // Mặc định 10 hàng mỗi trang
//   const paginator = new Paginator(page, limit);

//   let results = await branchRepository()
//     .where((builder) => {
//       if (branch_name) {
//         builder.where("branch_name", "like", `%${branch_name}%`);
//       }
//     })
//     .select(
//       knex.raw("count(branch_id) OVER() AS recordCount"),
//       "branch_id",
//       "branch_name",
//       "branch_address_id",
//       "branch_updated_at"
//     )
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
//     branches: results,
//   };
// }


async function getManyBranches(query) {
  const { branch_name, page = 1, limit = 10 } = query;
  const paginator = new Paginator(page, limit);

  const results = await knex("branch as b")
    .leftJoin("address as a", "b.branch_address_id", "a.address_id")
    .leftJoin("provinces as p", "a.province_code", "p.code")
    .leftJoin("districts as d", "a.district_code", "d.code")
    .leftJoin("wards as w", "a.ward_code", "w.code")
    .where((builder) => {
      if (branch_name) {
        builder.where("b.branch_name", "like", `%${branch_name}%`);
      }
    })
    .select(
      knex.raw("count(b.branch_id) OVER() AS recordCount"),
      "b.branch_id",
      "b.branch_name",
      "a.street as branch_street",
      "p.name as province_name",
      "d.name as district_name",
      "w.name as ward_name",
      "b.branch_updated_at"
    )
    .limit(paginator.limit)
    .offset(paginator.offset);

  let totalRecords = 0;
  const branches = results.map((result) => {
    totalRecords = result.recordCount;
    delete result.recordCount;
    return result;
  });

  return {
    metadata: paginator.getMetadata(totalRecords),
    branches,
  };
}


// Lấy chi tiết chi nhánh theo ID
// async function getBranchById(branch_id) {
//   return branchRepository()
//     .where("branch_id", branch_id)
//     .select(
//       "branch_id",
//       "branch_name",
//       "branch_address_id",
//       "branch_updated_at"
//     )
//     .first();
// }

async function getBranchById(branch_id) {
  return knex("branch as b")
    .leftJoin("address as a", "b.branch_address_id", "a.address_id")
    .leftJoin("provinces as p", "a.province_code", "p.code")
    .leftJoin("districts as d", "a.district_code", "d.code")
    .leftJoin("wards as w", "a.ward_code", "w.code")
    .where("b.branch_id", branch_id)
    .select(
      "b.branch_id",
      "b.branch_name",
      "a.street as branch_street",
      "p.name as province_name",
      "d.name as district_name",
      "w.name as ward_name",
      "b.branch_updated_at"
    )
    .first();
}

// Cập nhật thông tin chi nhánh
async function updateBranch(branch_id, payload) {
  const existingBranch = await branchRepository()
    .where("branch_id", branch_id)
    .select("*")
    .first();

  if (!existingBranch) {
    return null;
  }

  const updatedFields = { ...readBranch(payload) };

  // Xóa các trường không thay đổi
  Object.keys(updatedFields).forEach((key) => {
    if (updatedFields[key] === undefined || updatedFields[key] === null) {
      delete updatedFields[key];
    }
  });

  // Cập nhật thời gian nếu có thay đổi
  updatedFields.branch_updated_at = new Date().toISOString();

  await branchRepository().where("branch_id", branch_id).update(updatedFields);

  return { ...existingBranch, ...updatedFields };
}

// Xóa chi nhánh theo ID
async function deleteBranch(branch_id) {
  const deletedBranch = await branchRepository()
    .where("branch_id", branch_id)
    .first();

  if (!deletedBranch) {
    return null;
  }

  await branchRepository().where("branch_id", branch_id).del();

  return deletedBranch;
}

// Xóa tất cả các chi nhánh
async function deleteAllBranches() {
  return await branchRepository().del();
}

module.exports = {
  branchRepository,
  readBranch,
  createBranch,
  getManyBranches,
  getBranchById,
  updateBranch,
  deleteBranch,
  deleteAllBranches,
};
