const staffService = require('../services/staff.service');
const ApiError = require('../api-error');
const JSend = require('../jsend');
const { as } = require('../database/knex');

async function createStaff(req, res, next) {
  try {
    const staffData = {
      staff_name: req.body.staff_name,
      staff_phone: req.body.staff_phone,
      staff_email: req.body.staff_email,
      staff_role: req.body.staff_role,
      staff_gender: req.body.staff_gender,
      staff_dob: req.body.staff_dob || null, // Optional
      staff_address: req.body.staff_address || null, // Optional
      staff_hire_date: req.body.staff_hire_date,
      staff_salary: req.body.staff_salary,
    };

    const staff = await staffService.createStaff(staffData);

    return res.status(201).json({
      status: 'success',
      data: {
        staff,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

//Loc dich vu theo dieu kien
async function getStaffByFilter(req, res, next){
    // let staff = [];
    let result = {
        staff: [],
        metadata: {
            totalRecords: 0,
            firstPage: 1,
            lastPage: 1,
            page: 1,
            limit: 5,
        },
    };

    try{
        // staff = await staffService.getManyStaff(req.query);
        result = await staffService.getManyStaff(req.query);
    }catch (error){
        console.log(error);
        return next(
            new ApiError(500, 'An error occurred while retrieving staff')
        );
    }

    // return res.json(JSend.success({ staff }));
    return res.json(
        JSend.success({
            staff: result.staff,
            metadata: result.metadata,
        })
    )
}

async function getStaff(req, res, next) {
  const { staff_id } = req.params;
  try {
    const staff = await staffService.getStaffById(staff_id);
    if (!staff) {
      return next(new ApiError(404, 'Resource not found'));
    }
    return res.json(JSend.success({ staff }));
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Error retrieving staff with id=${staff_id}`)
    );
  }
}

// Cập nhật thông tin staff
async function updateStaff(req, res, next) {
    // Kiểm tra nếu dữ liệu trong body rỗng
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, 'Data to update cannot be empty'));
    }

    const { staff_id } = req.params;  // Lấy staff_id từ URL

    try {
        // Cập nhật dịch vụ với các dữ liệu từ body
        const updated = await staffService.updateStaff(staff_id, {
          ...req.body,
        });

        // Kiểm tra nếu không tìm thấy dịch vụ
        if (!updated) {
            return next(new ApiError(404, 'Staff not found'));
        }

        // Trả về phản hồi thành công với thông tin dịch vụ đã cập nhật
        return res.json(
            JSend.success({
                staff: updated,
            })
        );
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, `Error updating staff with id=${staff_id}`));
    }
}

// Hàm xóa staff theo staff_id trong controller
async function deleteStaff(req, res, next) {
  const { staff_id } = req.params; // Lấy staff_id từ URL

  try {
    // Thực hiện xóa dịch vụ từ staff layer
    const deletedStaff = await staffService.deleteStaff(staff_id);

    // Kiểm tra nếu không tìm thấy dịch vụ
    if (!deletedStaff) {
      return next(new ApiError(404, `Staff with id=${staff_id} not found`));
    }

    // Trả về phản hồi thành công sau khi xóa
    return res.json(
      JSend.success({
        message: `Staff with id=${staff_id} has been deleted`,
      })
    );
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Could not delete staff with id=${staff_id}`)
    );
  }
}

// Hàm xóa tất cả staff trong controller
async function deleteAllStaff(req, res, next) {
    try {
        // Xóa tất cả các dịch vụ
        await staffService.deleteAllStaff();

        const deletedCount = await staffService.deleteAllStaff();
        return res.json(
          JSend.success({
            message: `${deletedCount} staff have been deleted`,
          })
        );
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, 'An error occurred while removing all staff')
        );
    }
}

module.exports = {
    createStaff,
    getStaffByFilter,
    getStaff,
    updateStaff,
    deleteStaff,
    deleteAllStaff,
};