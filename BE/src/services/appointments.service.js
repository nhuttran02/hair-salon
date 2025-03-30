const knex = require('../database/knex');
const Paginator = require('./paginator');

function appointmentRepository() {
  return knex('appointments');
}

function readAppointment(payload) {
  return {
    apm_customer_name: payload.apm_customer_name,
    apm_gender: payload.apm_gender,
    apm_phone: payload.apm_phone,
    apm_service_id: payload.apm_service_id,
    apm_branch: payload.apm_branch,
    apm_time: payload.apm_time,
    apm_status: payload.apm_status,
    apm_created_at: payload.apm_created_at,
    apm_updated_at: payload.apm_updated_at,
  };
}

// async function createAppointment(payload) {
//     const appointment = readAppointment(payload);
//     const [apm_id] = await appointmentRepository().insert(appointment);
//     return { apm_id, ...appointment };
// }

// async function createAppointment(payload) {
//   // Kiểm tra xem apm_id có tồn tại trong bảng appointments không
//   const appointmentExists = await knex('appointments')
//     .where('apm_id', payload.apm_id)
//     .select('apm_id')
//     .first();

//   // Nếu không tìm thấy apm_id, trả về lỗi
//   if (!appointmentExists) {
//     throw new Error(`Appointment with ID ${payload.apm_id} does not exist`);
//   }

//   // Chuẩn bị dữ liệu cho cuộc hẹn mới
//   const appointment = readAppointment(payload);

//   // Chèn cuộc hẹn vào bảng appointments
//   const [apm_id] = await appointmentRepository().insert(appointment);

//   // Trả về dữ liệu cuộc hẹn đã được chèn
//   return { apm_id, ...appointment };
// }
async function createAppointment(payload) {
  // Chuẩn bị dữ liệu cho cuộc hẹn mới
  const appointment = readAppointment(payload);

  // Thêm thời gian tạo và cập nhật
  appointment.apm_created_at = new Date().toISOString();
  appointment.apm_updated_at = new Date().toISOString();

  // Chèn cuộc hẹn vào bảng appointments và lấy id được tạo
  const [apm_id] = await appointmentRepository().insert(appointment);

  // Trả về dữ liệu cuộc hẹn đã được chèn
  return { apm_id, ...appointment };
}


// async function getManyAppointments(query) {
//     const {
//         apm_customer_name,
//         apm_gender,
//         apm_phone,
//         apm_service_id,
//         apm_branch,
//         apm_time,
//         page = 1,
//         limit = 5,
//     } = query;  
//     const paginator = new Paginator(page, limit);

//     // Truy vấn các lịch hẹn dựa trên các điều kiện lọc
//     let results = await appointmentRepository()
//         .where((builder) => {
//             if (apm_customer_name) {
//               builder.where(
//                 'apm_customer_name',
//                 'like',
//                 `%${apm_customer_name}%`
//               );
//             }
//             if (apm_gender) {
//                 // Lọc theo giới tính
//                 builder.where('apm_gender', '=', apm_gender);
//             }
//             if (apm_phone) {
//                 // Lọc theo số điện thoại
//                 builder.where('apm_phone', 'like', `%${apm_phone}%`);
//             }
//             if (apm_service_id) {
//                 // Lọc theo ID dịch vụ
//                 builder.where('apm_service_id', '=', apm_service_id);
//             }
//             if (apm_branch) {
//               // Lọc theo ID branch
//               builder.where("apm_branch", "=", apm_branch);
//             }
//             if (apm_time) {
//                 // Lọc theo thời gian hẹn
//                 builder.where('apm_time', '=', apm_time);
//             }
//         })
//         .select(
//             knex.raw('count(apm_id) OVER() AS recordCount'),  // Đếm số lượng bản ghi
//             'apm_id',
//             'apm_customer_name',
//             'apm_gender',
//             'apm_phone',
//             'apm_service_id',
//             'apm_branch',
//             'apm_time',
//             'apm_status',
//             'apm_created_at',
//             'apm_updated_at'
//         )
//         .limit(paginator.limit)
//         .offset(paginator.offset);

//     let totalRecords = 0;
//     results = results.map((result) => {
//         totalRecords = result.recordCount;
//         delete result.recordCount;
//         return result;
//     });

//     return {
//         metadata: paginator.getMetadata(totalRecords),
//         appointments: results,
//     };
// }

async function getManyAppointments(query) {
  const {
    apm_customer_name,
    apm_gender,
    apm_phone,
    apm_service_id,
    apm_branch,
    apm_time,
    page = 1,
    limit = 5,
  } = query;
  const paginator = new Paginator(page, limit);

  // Truy vấn các lịch hẹn với thông tin từ bảng services và branch
  let results = await appointmentRepository()
    .leftJoin("services", "appointments.apm_service_id", "services.services_id")
    .leftJoin("branch", "appointments.apm_branch", "branch.branch_id")
    .where((builder) => {
      if (apm_customer_name) {
        builder.where("apm_customer_name", "like", `%${apm_customer_name}%`);
      }
      if (apm_gender) {
        builder.where("apm_gender", "=", apm_gender);
      }
      if (apm_phone) {
        builder.where("apm_phone", "like", `%${apm_phone}%`);
      }
      if (apm_service_id) {
        builder.where("apm_service_id", "=", apm_service_id);
      }
      if (apm_branch) {
        builder.where("apm_branch", "=", apm_branch);
      }
      if (apm_time) {
        builder.where("apm_time", "=", apm_time);
      }
    })
    .select(
      knex.raw("count(appointments.apm_id) OVER() AS recordCount"),
      "appointments.apm_id",
      "appointments.apm_customer_name",
      "appointments.apm_gender",
      "appointments.apm_phone",
      "appointments.apm_service_id",
      "services.services_name",
      "appointments.apm_branch",
      "branch.branch_name",
      "appointments.apm_time",
      "appointments.apm_status",
      "appointments.apm_created_at",
      "appointments.apm_updated_at"
    )
    .limit(paginator.limit)
    .offset(paginator.offset);

  let totalRecords = 0;
  results = results.map((result) => {
    totalRecords = result.recordCount;
    delete result.recordCount;
    return {
      ...result,
      service_details: {
        services_id: result.apm_service_id,
        services_name: result.services_name,
      },
      branch_details: {
        branch_id: result.apm_branch,
        branch_name: result.branch_name,
      },
    };
  });

  return {
    metadata: paginator.getMetadata(totalRecords),
    appointments: results,
  };
}

// async function getAppointmentById(apm_id) {
//   console.log('Querying appointment with ID:', apm_id);
//   const appointment = await appointmentRepository()
//     .where('apm_id', apm_id)
//     .select('*')
//     .first();
//   console.log('Appointment result:', appointment); // In kết quả query
//   return appointment;
// }

async function getAppointmentById(apm_id) {
  console.log("Querying appointment with ID:", apm_id);
  const appointment = await appointmentRepository()
    .leftJoin("services", "appointments.apm_service_id", "services.services_id")
    .leftJoin("branch", "appointments.apm_branch", "branch.branch_id")
    .where("appointments.apm_id", apm_id)
    .select("appointments.*", "services.services_name", "branch.branch_name")
    .first();

  console.log("Appointment result:", appointment);

  if (appointment) {
    return {
      ...appointment,
      service_details: {
        services_id: appointment.apm_service_id,
        services_name: appointment.services_name,
      },
      branch_details: {
        branch_id: appointment.apm_branch,
        branch_name: appointment.branch_name,
      },
    };
  }

  return null;
}

async function updateAppointment(apm_id, payload) {
  // Tìm lịch hẹn cần cập nhật theo apm_id
  const updatedAppointment = await appointmentRepository()
    .where('apm_id', apm_id)
    .select('*')
    .first();

  // Nếu không tìm thấy lịch hẹn, trả về null
  if (!updatedAppointment) {
    return null;
  }

  // So sánh và chỉ cập nhật các trường đã thay đổi
  const updatedFields = {};
  if (
    payload.apm_customer_name &&
    payload.apm_customer_name !== updatedAppointment.apm_customer_name
  ) {
    updatedFields.apm_customer_name = payload.apm_customer_name;
  }
  if (
    payload.apm_gender &&
    payload.apm_gender !== updatedAppointment.apm_gender
  ) {
    updatedFields.apm_gender = payload.apm_gender;
  }
  if (payload.apm_phone && payload.apm_phone !== updatedAppointment.apm_phone) {
    updatedFields.apm_phone = payload.apm_phone;
  }
  if (
    payload.apm_service_id &&
    payload.apm_service_id !== updatedAppointment.apm_service_id
  ) {
    updatedFields.apm_service_id = payload.apm_service_id;
  }
  if (
    payload.apm_branch &&
    payload.apm_branch !== updatedAppointment.apm_branch
  ) {
    updatedFields.apm_branch = payload.apm_branch;
  }
  if (payload.apm_time && payload.apm_time !== updatedAppointment.apm_time) {
    updatedFields.apm_time = payload.apm_time;
  }
  if (
    payload.apm_status &&
    payload.apm_status !== updatedAppointment.apm_status
  ) {
    updatedFields.apm_status = payload.apm_status;
  }

  // Nếu có thay đổi thì mới thực hiện cập nhật
  if (Object.keys(updatedFields).length > 0) {
    updatedFields.apm_updated_at = new Date().toISOString(); // Cập nhật thời gian sửa đổi
    await appointmentRepository().where('apm_id', apm_id).update(updatedFields);
  }

  // Trả về lịch hẹn đã được cập nhật (gồm cả các giá trị mới và cũ)
  return { ...updatedAppointment, ...updatedFields };
}


//Delete appointment
async function deleteAppointment(apm_id){
    const deletedAppointment = await appointmentRepository()
        .where('apm_id', apm_id)
        .first();

    //If cannot find the appointment, response null
    if(!deletedAppointment){
        return null;
    }

    //Delete appointment
    await appointmentRepository().where('apm_id', apm_id).del();

    //response appointment has just been deleted
    return deletedAppointment;
}

//Function delete all appointment
async function deleteAllAppointment(){
    await appointmentRepository().del();
}

module.exports = {
    appointmentRepository,
    readAppointment,
    createAppointment,
    getManyAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
    deleteAllAppointment,
};