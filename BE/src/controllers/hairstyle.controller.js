const hairstyleService = require("../services/hairstyle.service");
const ApiError = require("../api-error");
const JSend = require("../jsend");
const {
  fetchMaleHairstyles,
  fetchFemaleHairstyles,
} = require("../services/hairstyle.service");

// // Lấy danh sách kiểu tóc Nam
// const getMaleHairstyles = async (req, res) => {
//   try {
//     const hairstyles = await fetchMaleHairstyles();
//     res.json(hairstyles);
//   } catch (error) {
//     console.error("Error in getMaleHairstyles:", error.message);
//     res.status(500).json({ message: "Failed to fetch male hairstyles." });
//   }
// };

// // Lấy danh sách kiểu tóc Nữ
// const getFemaleHairstyles = async (req, res) => {
//   try {
//     const hairstyles = await fetchFemaleHairstyles();
//     res.json(hairstyles);
//   } catch (error) {
//     console.error("Error in getFemaleHairstyles:", error.message);
//     res.status(500).json({ message: "Failed to fetch female hairstyles." });
//   }
// };

// Lấy danh sách kiểu tóc Nam
const getMaleHairstyles = async (req, res, next) => {
  try {
    const hairstyles = await fetchMaleHairstyles();
    
    // Kiểm tra nếu không có kiểu tóc nào
    if (hairstyles.length === 0) {
      return res.status(404).json(
        JSend.fail({
          message: "No male hairstyles found"
        })
      );
    }

    // Sử dụng JSend để format response
    return res.json(
      JSend.success({
        hairstyles,
        total: hairstyles.length
      })
    );
  } catch (error) {
    console.error("Error in getMaleHairstyles:", error);
    return next(
      new ApiError(500, "Failed to fetch male hairstyles")
    );
  }
};

// Lấy danh sách kiểu tóc Nữ
const getFemaleHairstyles = async (req, res, next) => {
  try {
    const hairstyles = await fetchFemaleHairstyles();
    
    // Kiểm tra nếu không có kiểu tóc nào
    if (hairstyles.length === 0) {
      return res.status(404).json(
        JSend.fail({
          message: "No female hairstyles found"
        })
      );
    }

    // Sử dụng JSend để format response
    return res.json(
      JSend.success({
        hairstyles,
        total: hairstyles.length
      })
    );
  } catch (error) {
    console.error("Error in getFemaleHairstyles:", error);
    return next(
      new ApiError(500, "Failed to fetch female hairstyles")
    );
  }
};

// Tạo kiểu tóc mới
async function createHairstyle(req, res, next) {
  if (
    !req.body?.hs_name ||
    typeof req.body.hs_name !== "string" ||
    req.body.hs_name.trim() === ""
  ) {
    return next(
      new ApiError(400, "Hairstyle name should be a non-empty string")
    );
  }

  try {
    const hairstyle = await hairstyleService.createHairstyle({
      ...req.body,
      hs_image_url: req.file?.path || null, // Lấy đường dẫn file upload
    });
    return res
      .status(201)
      .set({
        Location: `${req.baseUrl}/${hairstyle.hs_id}`,
      })
      .json(JSend.success({ hairstyle }));
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "An error occurred while creating the hairstyle")
    );
  }
}

// Lọc kiểu tóc theo điều kiện
async function getHairstylesByFilter(req, res, next) {
  let result = {
    hairstyles: [],
    metadata: {
      totalRecords: 0,
      firstPage: 1,
      lastPage: 1,
      page: 1,
      limit: 5,
    },
  };

  try {
    result = await hairstyleService.getManyHairstyles(req.query);
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "An error occurred while retrieving hairstyles")
    );
  }

  return res.json(
    JSend.success({
      hairstyles: result.hairstyles,
      metadata: result.metadata,
    })
  );
}

// Lấy kiểu tóc theo ID
async function getHairstyle(req, res, next) {
  const { hs_id } = req.params;

  try {
    const hairstyle = await hairstyleService.getHairstyleById(hs_id);

    if (!hairstyle) {
      return next(new ApiError(404, "Hairstyle not found"));
    }

    return res.json(JSend.success({ hairstyle }));
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Error retrieving hairstyle with id=${hs_id}`)
    );
  }
}

// Cập nhật thông tin kiểu tóc
async function updateHairstyle(req, res, next) {
  if (Object.keys(req.body).length === 0 && !req.file) {
    return next(new ApiError(400, "Data to update cannot be empty"));
  }

  const { hs_id } = req.params;

  try {
    const updateData = {
      ...req.body,
      ...(req.file ? { hs_image_url: req.file.path } : {}), // Nếu có file mới thì cập nhật
    };

    const updated = await hairstyleService.updateHairstyle(hs_id, updateData);

    if (!updated) {
      return next(new ApiError(404, "Hairstyle not found"));
    }

    return res.json(JSend.success({ hairstyle: updated }));
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, `Error updating hairstyle with id=${hs_id}`));
  }
}

// Xóa kiểu tóc theo ID
async function deleteHairstyle(req, res, next) {
  const { hs_id } = req.params;

  try {
    const deletedHairstyle = await hairstyleService.deleteHairstyle(hs_id);

    if (!deletedHairstyle) {
      return next(new ApiError(404, `Hairstyle with id=${hs_id} not found`));
    }

    return res.json(
      JSend.success({
        message: `Hairstyle with id=${hs_id} has been deleted`,
      })
    );
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Could not delete hairstyle with id=${hs_id}`)
    );
  }
}

// Xóa tất cả kiểu tóc
async function deleteAllHairstyles(req, res, next) {
  try {
    await hairstyleService.deleteAllHairstyles();

    return res.json(
      JSend.success({
        message: "All hairstyles have been deleted",
      })
    );
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "An error occurred while removing all hairstyles")
    );
  }
}

module.exports = {
  createHairstyle,
  getHairstylesByFilter,
  getHairstyle,
  updateHairstyle,
  deleteHairstyle,
  deleteAllHairstyles,
  getFemaleHairstyles,
  getMaleHairstyles
};