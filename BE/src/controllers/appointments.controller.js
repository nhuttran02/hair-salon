// const appointmentsService = require('../services/appointments.service');
// const ApiError = require('../api-error');
// const JSend = require('../jsend');
// const { as } = require('../database/knex');

// //Tạo appointment mới
// async function createAppointment(req, res, next){
//     if (
//       !req.body?.apm_customer_name ||
//       typeof req.body.apm_customer_name !== 'string' ||
//       req.body.apm_customer_name.trim() === ''
//     ) {
//       return next(
//         new ApiError(400, 'Customer name should be a non-empty string')
//       );
//     }

//     try{
//         const appointment = await appointmentsService.createAppointment({
//           ...req.body,
//         });
//         return res
//           .status(201)
//           .set({
//             Location: `${req.baseUrl}/${appointment.apm_id}`,
//           })
//           .json(
//             JSend.success({
//               appointment,
//             })
//           );
//     }catch (error){
//         console.log(error);
//         return next(
//           new ApiError(500, 'An error occurred while creating the appointment')
//         );
//     }
// }

// //Loc dich vu theo dieu kien
// async function getAppointmentsByFilter(req, res, next){
//     // let appointments = [];
//     let result = {
//         appointments: [],
//         metadata: {
//             totalRecords: 0,
//             firstPage: 1,
//             lastPage: 1,
//             page: 1,
//             limit: 5,
//         },
//     };

//     try{
//         // appointments = await appointmentsService.getManyAppointments(req.query);
//         result = await appointmentsService.getManyAppointments(req.query);
//     }catch (error){
//         console.log(error);
//         return next(
//             new ApiError(500, 'An error occurred while retrieving appointments')
//         );
//     }

//     // return res.json(JSend.success({ appointments }));
//     return res.json(
//         JSend.success({
//             appointments: result.appointments,
//             metadata: result.metadata,
//         })
//     )
// }

// async function getAppointment(req, res, next) {
//   const { apm_id } = req.params;
//   console.log('Received apm_id:', apm_id); // Kiểm tra giá trị apm_id từ request
//   try {
//     const appointment = await appointmentsService.getAppointmentById(apm_id);
//     if (!appointment) {
//       return next(new ApiError(404, 'Resource not found'));
//     }
//     return res.json(JSend.success({ appointment }));
//   } catch (error) {
//     console.log(error);
//     return next(
//       new ApiError(500, `Error retrieving appointment with id=${apm_id}`)
//     );
//   }
// }

// // Cập nhật thông tin dịch vụ
// async function updateAppointment(req, res, next) {
//     // Kiểm tra nếu dữ liệu trong body rỗng
//     if (Object.keys(req.body).length === 0) {
//         return next(new ApiError(400, 'Data to update cannot be empty'));
//     }

//     const { apm_id } = req.params;  // Lấy apm_id từ URL

//     try {
//         // Cập nhật dịch vụ với các dữ liệu từ body
//         const updated = await appointmentsService.updateAppointment(apm_id, {
//           ...req.body,
//         });

//         // Kiểm tra nếu không tìm thấy dịch vụ
//         if (!updated) {
//             return next(new ApiError(404, 'Appointment not found'));
//         }

//         // Trả về phản hồi thành công với thông tin dịch vụ đã cập nhật
//         return res.json(
//             JSend.success({
//                 appointment: updated,
//             })
//         );
//     } catch (error) {
//         console.log(error);
//         return next(new ApiError(500, `Error updating appointment with id=${apm_id}`));
//     }
// }

// // Hàm xóa appointment theo apm_id trong controller

// async function deleteAppointment(req, res, next) {
//   const { apm_id } = req.params; // Lấy apm_id từ URL

//   try {
//     // Thực hiện xóa dịch vụ từ appointment layer
//     const deletedAppointment =
//       await appointmentsService.deleteAppointment(apm_id);

//     // Kiểm tra nếu không tìm thấy dịch vụ
//     if (!deletedAppointment) {
//       return next(new ApiError(404, `Appointment with id=${apm_id} not found`));
//     }

//     // Trả về phản hồi thành công sau khi xóa
//     return res.json(
//       JSend.success({
//         message: `Appointment with id=${apm_id} has been deleted`,
//       })
//     );
//   } catch (error) {
//     console.log(error);
//     return next(
//       new ApiError(500, `Could not delete appointment with id=${apm_id}`)
//     );
//   }
// }

// // Hàm xóa tất cả appointment trong controller
// async function deleteAllAppointments(req, res, next) {
//     try {
//         // Xóa tất cả các dịch vụ
//         await appointmentsService.deleteAllAppointments();

//         const deletedCount = await appointmentsService.deleteAllAppointments();
//         return res.json(
//           JSend.success({
//             message: `${deletedCount} appointments have been deleted`,
//           })
//         );
//     } catch (error) {
//         console.log(error);
//         return next(
//             new ApiError(500, 'An error occurred while removing all appointments')
//         );
//     }
// }

// module.exports = {
//     createAppointment,
//     getAppointmentsByFilter,
//     getAppointment,
//     updateAppointment,
//     deleteAppointment,
//     deleteAllAppointments
// };

const appointmentsService = require("../services/appointments.service");
const ApiError = require("../api-error");
const JSend = require("../jsend");

// Tạo appointment mới
async function createAppointment(req, res, next) {
  if (
    !req.body?.apm_customer_name ||
    typeof req.body.apm_customer_name !== "string" ||
    req.body.apm_customer_name.trim() === ""
  ) {
    return next(
      new ApiError(400, "Customer name should be a non-empty string")
    );
  }

  try {
    const appointment = await appointmentsService.createAppointment({
      ...req.body,
    });
    return res
      .status(201)
      .set({
        Location: `${req.baseUrl}/${appointment.apm_id}`,
      })
      .json(JSend.success({ appointment }));
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "An error occurred while creating the appointment")
    );
  }
}

// Lọc dịch vụ theo điều kiện
async function getAppointmentsByFilter(req, res, next) {
  let result = {
    appointments: [],
    metadata: {
      totalRecords: 0,
      firstPage: 1,
      lastPage: 1,
      page: 1,
      limit: 5,
    },
  };

  try {
    result = await appointmentsService.getManyAppointments(req.query);
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "An error occurred while retrieving appointments")
    );
  }

  return res.json(
    JSend.success({
      appointments: result.appointments,
      metadata: result.metadata,
    })
  );
}

// Lấy appointment theo ID
async function getAppointment(req, res, next) {
  const { apm_id } = req.params;
  console.log("Received apm_id:", apm_id);
  try {
    const appointment = await appointmentsService.getAppointmentById(apm_id);
    if (!appointment) {
      return next(new ApiError(404, "Resource not found"));
    }
    return res.json(JSend.success({ appointment }));
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Error retrieving appointment with id=${apm_id}`)
    );
  }
}

// Cập nhật thông tin appointment
async function updateAppointment(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Data to update cannot be empty"));
  }

  const { apm_id } = req.params;

  try {
    const updated = await appointmentsService.updateAppointment(apm_id, {
      ...req.body,
    });

    if (!updated) {
      return next(new ApiError(404, "Appointment not found"));
    }

    return res.json(
      JSend.success({
        appointment: updated,
      })
    );
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Error updating appointment with id=${apm_id}`)
    );
  }
}

// Xóa appointment theo apm_id
async function deleteAppointment(req, res, next) {
  const { apm_id } = req.params;

  try {
    const deletedAppointment =
      await appointmentsService.deleteAppointment(apm_id);

    if (!deletedAppointment) {
      return next(new ApiError(404, `Appointment with id=${apm_id} not found`));
    }

    return res.json(
      JSend.success({
        message: `Appointment with id=${apm_id} has been deleted`,
      })
    );
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Could not delete appointment with id=${apm_id}`)
    );
  }
}

// Xóa tất cả appointment
async function deleteAllAppointments(req, res, next) {
  try {
    const deletedCount = await appointmentsService.deleteAllAppointments();
    return res.json(
      JSend.success({
        message: `${deletedCount} appointments have been deleted`,
      })
    );
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "An error occurred while removing all appointments")
    );
  }
}

module.exports = {
  createAppointment,
  getAppointmentsByFilter,
  getAppointment,
  updateAppointment,
  deleteAppointment,
  deleteAllAppointments,
};