const addressService = require("../services/address.service");
const ApiError = require("../api-error");
const JSend = require("../jsend");

// Tạo địa chỉ mới
// async function createAddress(req, res, next) {
//   // Kiểm tra tính hợp lệ của dữ liệu đầu vào
//   if (
//     !req.body?.street ||
//     typeof req.body.street !== "string" ||
//     req.body.street.trim() === ""
//   ) {
//     return next(new ApiError(400, "Street should be a non-empty string"));
//   }

//   try {
//     const address = await addressService.createAddress({
//       ...req.body,
//     });
//     return res
//       .status(201)
//       .set({
//         Location: `${req.baseUrl}/${address.address_id}`,
//       })
//       .json(
//         JSend.success({
//           address,
//         })
//       );
//   } catch (error) {
//     console.log(error);
//     return next(
//       new ApiError(500, "An error occurred while creating the address")
//     );
//   }
// }

async function createAddress(req, res, next) {
  // Kiểm tra tính hợp lệ của dữ liệu đầu vào
  if (
    !req.body?.street ||
    typeof req.body.street !== "string" ||
    req.body.street.trim() === ""
  ) {
    return next(new ApiError(400, "Street should be a non-empty string"));
  }

  // Validate thêm các trường địa chỉ khác
  if (req.body.province_code && typeof req.body.province_code !== "string") {
    return next(new ApiError(400, "Province code must be a string"));
  }

  if (req.body.district_code && typeof req.body.district_code !== "string") {
    return next(new ApiError(400, "District code must be a string"));
  }

  if (req.body.ward_code && typeof req.body.ward_code !== "string") {
    return next(new ApiError(400, "Ward code must be a string"));
  }

  try {
    const address = await addressService.createAddress({
      ...req.body,
    });
    return res
      .status(201)
      .set({
        Location: `${req.baseUrl}/${address.address_id}`,
      })
      .json(
        JSend.success({
          address,
        })
      );
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "An error occurred while creating the address")
    );
  }
}

// Lọc địa chỉ theo điều kiện
// async function getAddressesByFilter(req, res, next) {
//   let result = {
//     addresses: [],
//     metadata: {
//       totalRecords: 0,
//       firstPage: 1,
//       lastPage: 1,
//       page: 1,
//       limit: 5,
//     },
//   };

//   try {
//     result = await addressService.getManyAddresses(req.query);
//   } catch (error) {
//     console.log(error);
//     return next(
//       new ApiError(500, "An error occurred while retrieving addresses")
//     );
//   }

//   return res.json(
//     JSend.success({
//       addresses: result.addresses,
//       metadata: result.metadata,
//     })
//   );
// }

async function getAddressesByFilter(req, res, next) {
  let result = {
    addresses: [],
    metadata: {
      totalRecords: 0,
      firstPage: 1,
      lastPage: 1,
      page: req.query.page || 1,
      limit: req.query.limit || 10, // Điều chỉnh giá trị mặc định
    },
  };

  try {
    result = await addressService.getManyAddresses({
      ...req.query,
      page: result.metadata.page,
      limit: result.metadata.limit,
    });
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "An error occurred while retrieving addresses")
    );
  }

  return res.json(
    JSend.success({
      addresses: result.addresses,
      metadata: result.metadata,
    })
  );
}

// Lấy địa chỉ theo ID
// async function getAddress(req, res, next) {
//   const { address_id } = req.params;

//   try {
//     const address = await addressService.getAddressById(address_id);

//     if (!address) {
//       return next(new ApiError(404, "Address not found"));
//     }

//     console.log("Request params:", req.params);
//     console.log("Response JSON:", { status: "success", data: { address } });

//     return res.json({
//       status: "success",
//       data: { address },
//     });
//   } catch (error) {
//     console.log(error);
//     return next(
//       new ApiError(500, `Error retrieving address with id=${address_id}`)
//     );
//   }
// }

async function getAddress(req, res, next) {
  const { address_id } = req.params;

  try {
    const address = await addressService.getAddressById(address_id);

    if (!address) {
      return next(new ApiError(404, "Address not found"));
    }

    return res.json(
      JSend.success({
        address,
      })
    );
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Error retrieving address with id=${address_id}`)
    );
  }
}

// Cập nhật thông tin địa chỉ
async function updateAddress(req, res, next) {
  // Kiểm tra nếu dữ liệu trong body rỗng
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Data to update cannot be empty"));
  }

  // Validate các trường địa chỉ
  if (
    req.body.street &&
    (typeof req.body.street !== "string" || req.body.street.trim() === "")
  ) {
    return next(new ApiError(400, "Street should be a non-empty string"));
  }

  // Validate các trường khác tương tự như createAddress()

  const { address_id } = req.params;

  try {
    const updated = await addressService.updateAddress(address_id, {
      ...req.body,
    });

    // Kiểm tra nếu không tìm thấy địa chỉ
    if (!updated) {
      return next(new ApiError(404, "Address not found"));
    }

    // Trả về phản hồi thành công với thông tin địa chỉ đã cập nhật
    return res.json(
      JSend.success({
        address: updated,
      })
    );
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Error updating address with id=${address_id}`)
    );
  }
}

// Xóa địa chỉ theo ID
async function deleteAddress(req, res, next) {
  const { address_id } = req.params;

  try {
    const deletedAddress = await addressService.deleteAddress(address_id);

    // Kiểm tra nếu không tìm thấy địa chỉ
    if (!deletedAddress) {
      return next(new ApiError(404, `Address with id=${address_id} not found`));
    }

    // Trả về phản hồi thành công sau khi xóa
    return res.json(
      JSend.success({
        message: `Address with id=${address_id} has been deleted`,
      })
    );
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Could not delete address with id=${address_id}`)
    );
  }
}

// Xóa tất cả địa chỉ
async function deleteAllAddresses(req, res, next) {
  try {
    await addressService.deleteAllAddresses();

    // Trả về phản hồi thành công
    return res.json(
      JSend.success({
        message: "All addresses have been deleted",
      })
    );
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "An error occurred while removing all addresses")
    );
  }
}

async function getProvinces(req, res, next) {
  try {
    const provinces = await addressService.getProvinces();
    return res.json(JSend.success({ provinces }));
  } catch (error) {
    console.error("Error fetching provinces:", error);
    return next(new ApiError(500, "Failed to fetch provinces"));
  }
}

/**
 * Fetch districts by province_code.
 */
// async function getDistricts(req, res, next) {
//   const { province_code } = req.query;

//   if (!province_code) {
//     return next(new ApiError(400, "province_code is required"));
//   }

//   try {
//     const districts = await addressService.getDistricts(province_code);
//     return res.json(JSend.success({ districts }));
//   } catch (error) {
//     console.error("Error fetching districts:", error);
//     return next(new ApiError(500, "Failed to fetch districts"));
//   }
// }

const getDistricts = async (req, res, next) => {
  const { province_code } = req.query;

  if (!province_code) {
    return next(new ApiError(400, "province_code is required"));
  }

  try {
    const districts = await addressService.getDistricts(province_code);
    return res.json(JSend.success({ districts }));
  } catch (error) {
    console.error("Error fetching districts:", error);
    next(new ApiError(500, "Failed to fetch districts"));
  }
};

/**
 * Fetch wards by district_code.
 */
// async function getWards(req, res, next) {
//   const { district_code } = req.query;

//   if (!district_code) {
//     return next(new ApiError(400, "district_code is required"));
//   }

//   try {
//     const wards = await addressService.getWards(district_code);
//     return res.json(JSend.success({ wards }));
//   } catch (error) {
//     console.error("Error fetching wards:", error);
//     return next(new ApiError(500, "Failed to fetch wards"));
//   }
// }

const getWards = async (req, res, next) => {
  const { district_code } = req.query;

  if (!district_code) {
    return next(new ApiError(400, "district_code is required"));
  }

  try {
    const wards = await addressService.getWards(district_code);
    return res.json(JSend.success({ wards }));
  } catch (error) {
    console.error("Error fetching wards:", error);
    next(new ApiError(500, "Failed to fetch wards"));
  }
};


module.exports = {
  createAddress,
  getAddressesByFilter,
  getAddress,
  updateAddress,
  deleteAddress,
  deleteAllAddresses,
  getDistricts,
  getProvinces,
  getWards
};