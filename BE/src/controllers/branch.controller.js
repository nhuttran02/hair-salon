// const branchService = require("../services/branch.service");
// const ApiError = require("../api-error");
// const JSend = require("../jsend");

// // Tạo chi nhánh mới
// async function createBranch(req, res, next) {
//   if (
//     !req.body?.branch_name ||
//     typeof req.body.branch_name !== "string" ||
//     req.body.branch_name.trim() === ""
//   ) {
//     return next(new ApiError(400, "Branch name should be a non-empty string"));
//   }

//   if (
//     !req.body?.branch_address ||
//     typeof req.body.branch_address !== "string" ||
//     req.body.branch_address.trim() === ""
//   ) {
//     return next(
//       new ApiError(400, "Branch address should be a non-empty string")
//     );
//   }

//   try {
//     const branch = await branchService.createBranch({
//       ...req.body,
//     });
//     return res
//       .status(201)
//       .set({
//         Location: `${req.baseUrl}/${branch.branch_id}`,
//       })
//       .json(JSend.success({ branch }));
//   } catch (error) {
//     console.log(error);
//     return next(
//       new ApiError(500, "An error occurred while creating the branch")
//     );
//   }
// }

// // Lọc chi nhánh theo điều kiện
// async function getBranchesByFilter(req, res, next) {
//   let result = {
//     branch: [],
//     metadata: {
//       totalRecords: 0,
//       firstPage: 1,
//       lastPage: 1,
//       page: 1,
//       limit: 5,
//     },
//   };

//   try {
//     result = await branchService.getManyBranches(req.query);
//   } catch (error) {
//     console.log(error);
//     return next(
//       new ApiError(500, "An error occurred while retrieving branch")
//     );
//   }

//   return res.json(
//     JSend.success({
//       branch: result.branch,
//       metadata: result.metadata,
//     })
//   );
// }

// // Lấy chi nhánh theo ID
// async function getBranch(req, res, next) {
//   const { branch_id } = req.params;

//   try {
//     const branch = await branchService.getBranchById(branch_id);

//     if (!branch) {
//       return next(new ApiError(404, "Branch not found"));
//     }

//     return res.json(JSend.success({ branch }));
//   } catch (error) {
//     console.log(error);
//     return next(
//       new ApiError(500, `Error retrieving branch with id=${branch_id}`)
//     );
//   }
// }

// // Cập nhật thông tin chi nhánh
// async function updateBranch(req, res, next) {
//   if (Object.keys(req.body).length === 0) {
//     return next(new ApiError(400, "Data to update cannot be empty"));
//   }

//   const { branch_id } = req.params;

//   try {
//     const updated = await branchService.updateBranch(branch_id, {
//       ...req.body,
//     });

//     if (!updated) {
//       return next(new ApiError(404, "Branch not found"));
//     }

//     return res.json(JSend.success({ branch: updated }));
//   } catch (error) {
//     console.log(error);
//     return next(
//       new ApiError(500, `Error updating branch with id=${branch_id}`)
//     );
//   }
// }

// // Xóa chi nhánh theo ID
// async function deleteBranch(req, res, next) {
//   const { branch_id } = req.params;

//   try {
//     const deletedBranch = await branchService.deleteBranch(branch_id);

//     if (!deletedBranch) {
//       return next(new ApiError(404, `Branch with id=${branch_id} not found`));
//     }

//     return res.json(
//       JSend.success({
//         message: `Branch with id=${branch_id} has been deleted`,
//       })
//     );
//   } catch (error) {
//     console.log(error);
//     return next(
//       new ApiError(500, `Could not delete branch with id=${branch_id}`)
//     );
//   }
// }

// // Xóa tất cả chi nhánh
// async function deleteAllBranches(req, res, next) {
//   try {
//     await branchService.deleteAllBranches();

//     return res.json(
//       JSend.success({
//         message: "All branch have been deleted",
//       })
//     );
//   } catch (error) {
//     console.log(error);
//     return next(
//       new ApiError(500, "An error occurred while removing all branch")
//     );
//   }
// }

// module.exports = {
//   createBranch,
//   getBranchesByFilter,
//   getBranch,
//   updateBranch,
//   deleteBranch,
//   deleteAllBranches,
// };

const branchService = require("../services/branch.service");
const ApiError = require("../api-error");
const JSend = require("../jsend");
const knex = require("../database/knex");

// Tạo chi nhánh mới
async function createBranch(req, res, next) {
  if (
    !req.body?.branch_name ||
    typeof req.body.branch_name !== "string" ||
    req.body.branch_name.trim() === ""
  ) {
    return next(new ApiError(400, "Branch name should be a non-empty string"));
  }

  if (
    !req.body?.branch_address_id ||
    typeof req.body.branch_address_id !== "number"
  ) {
    return next(
      new ApiError(400, "Branch address ID should be a valid number")
    );
  }

  try {
    // Kiểm tra xem address có tồn tại trong bảng address không
    const addressExists = await knex("address")
      .where("address_id", req.body.branch_address_id)
      .first();

    if (!addressExists) {
      return next(
        new ApiError(
          404,
          `Address with id=${req.body.branch_address_id} not found`
        )
      );
    }

    const branch = await branchService.createBranch({
      ...req.body,
    });
    return res
      .status(201)
      .set({
        Location: `${req.baseUrl}/${branch.branch_id}`,
      })
      .json(JSend.success({ branch }));
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "An error occurred while creating the branch")
    );
  }
}

// Lọc chi nhánh theo điều kiện
async function getBranchesByFilter(req, res, next) {
  let result = {
    branch: [],
    metadata: {
      totalRecords: 0,
      firstPage: 1,
      lastPage: 1,
      page: 1,
      limit: 5,
    },
  };

  try {
    result = await branchService.getManyBranches(req.query);
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "An error occurred while retrieving branch"));
  }

  return res.json(
    JSend.success({
      branch: result.branches, // Trả về danh sách các chi nhánh
      metadata: result.metadata,
    })
  );
}

// Lấy chi nhánh theo ID
async function getBranch(req, res, next) {
  const { branch_id } = req.params;

  try {
    const branch = await branchService.getBranchById(branch_id);

    if (!branch) {
      return next(new ApiError(404, "Branch not found"));
    }

    return res.json(JSend.success({ branch }));
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Error retrieving branch with id=${branch_id}`)
    );
  }
}

// Cập nhật thông tin chi nhánh
async function updateBranch(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Data to update cannot be empty"));
  }

  const { branch_id } = req.params;

  try {
    // Nếu branch_address_id được cập nhật, kiểm tra xem address có tồn tại không
    if (req.body.branch_address_id) {
      const addressExists = await knex("address")
        .where("address_id", req.body.branch_address_id)
        .first();

      if (!addressExists) {
        return next(
          new ApiError(
            404,
            `Address with id=${req.body.branch_address_id} not found`
          )
        );
      }
    }

    const updated = await branchService.updateBranch(branch_id, {
      ...req.body,
    });

    if (!updated) {
      return next(new ApiError(404, "Branch not found"));
    }

    return res.json(JSend.success({ branch: updated }));
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Error updating branch with id=${branch_id}`)
    );
  }
}

// Xóa chi nhánh theo ID
async function deleteBranch(req, res, next) {
  const { branch_id } = req.params;

  try {
    const deletedBranch = await branchService.deleteBranch(branch_id);

    if (!deletedBranch) {
      return next(new ApiError(404, `Branch with id=${branch_id} not found`));
    }

    return res.json(
      JSend.success({
        message: `Branch with id=${branch_id} has been deleted`,
      })
    );
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Could not delete branch with id=${branch_id}`)
    );
  }
}

// Xóa tất cả chi nhánh
async function deleteAllBranches(req, res, next) {
  try {
    await branchService.deleteAllBranches();

    return res.json(
      JSend.success({
        message: "All branch have been deleted",
      })
    );
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "An error occurred while removing all branch")
    );
  }
}

module.exports = {
  createBranch,
  getBranchesByFilter,
  getBranch,
  updateBranch,
  deleteBranch,
  deleteAllBranches,
};
