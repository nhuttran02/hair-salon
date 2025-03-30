const knex = require('../database/knex');
const Paginator = require('./paginator');

function staffRepository() {
  return knex('staff');
}

function readStaff(payload) {
  return {
    staff_name: payload.staff_name,
    staff_phone: payload.staff_phone,
    staff_email: payload.staff_email || null, // Optional
    staff_role: payload.staff_role,
    staff_gender: payload.staff_gender,
    staff_dob: payload.staff_dob || null, // Optional
    staff_address: payload.staff_address || null, // Optional
    staff_hire_date: payload.staff_hire_date,
    staff_salary: payload.staff_salary || null,
  };
}

async function createStaff(payload) {
  const staff = readStaff(payload);
  const [staff_id] = await staffRepository().insert(staff);
  return { staff_id, ...staff };
}


async function createStaff(payload) {
  // Chuẩn bị dữ liệu cho nhân viên mới
  const staff = readStaff(payload);

  // Chèn nhân viên vào bảng staff
  const [staff_id] = await staffRepository().insert(staff);

  // Trả về dữ liệu staff đã được chèn
  return { staff_id, ...staff };
}



async function getManyStaff(query) {
  const {
    staff_name,
    staff_phone,
    staff_email,
    staff_role,
    staff_gender,
    staff_dob,
    staff_address,
    staff_hire_date,
    staff_salary,
    page = 1,
    limit = 5,
  } = query;
  const paginator = new Paginator(page, limit);

  // Truy vấn các staff dựa trên các điều kiện lọc
  let results = await staffRepository()
    .where((builder) => {
      if (staff_name) {
        builder.where('staff_name', 'like', `%${staff_name}%`);
      }
      if (staff_gender) {
        // Lọc theo giới tính
        builder.where('staff_gender', '=', staff_gender);
      }
      if (staff_phone) {
        // Lọc theo số điện thoại
        builder.where('staff_phone', 'like', `%${staff_phone}%`);
      }
      if (staff_email) {
        // Lọc theo email
        builder.where('staff_email', 'like', `%${staff_email}%`);
      }
      if (staff_role) {
        // Lọc theo vai trò
        builder.where('staff_role', 'like', `%${staff_role}%`);
      }
      if (staff_dob) {
        // Lọc theo ngày sinh
        builder.where('staff_dob', '=', staff_dob);
      }
      if (staff_address) {
        // Lọc theo vai trò
        builder.where('staff_address', 'like', `%${staff_address}%`);
      }
      if (staff_hire_date) {
        // Lọc theo ngày thuê
        builder.where('staff_hire_date', '=', staff_hire_date);
      }
      if (staff_salary) {
        // Lọc theo lương
        builder.where('staff_salary', '=', staff_salary);
      }
    })
    .select(
      knex.raw('count(staff_id) OVER() AS recordCount'), // Đếm số lượng bản ghi
      'staff_id',
      'staff_name',
      'staff_gender',
      'staff_phone',
      'staff_email',
      'staff_role',
      'staff_dob',
      'staff_address',
      'staff_hire_date',
      'staff_salary',
      'staff_created_at',
      'staff_updated_at'
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
    staff: results,
  };
}

async function getStaffById(staff_id) {
  const staff = await staffRepository()
    .where('staff_id', staff_id)
    .select('*')
    .first();
  console.log('Staff result:', staff); // In kết quả query
  return staff;
}

async function updateStaff(staff_id, payload) {
  // Tìm nhân viên cần cập nhật theo staff_id
  const updatedStaff = await staffRepository()
    .where('staff_id', staff_id)
    .select('*')
    .first();

  // Nếu không tìm thấy nhân viên, trả về null
  if (!updatedStaff) {
    return null;
  }

  // Cập nhật các trường từ payload, ngay cả khi không thay đổi
  const updatedFields = {
    staff_name: payload.staff_name || updatedStaff.staff_name,
    staff_phone: payload.staff_phone || updatedStaff.staff_phone,
    staff_email: payload.staff_email || updatedStaff.staff_email,
    staff_role: payload.staff_role || updatedStaff.staff_role,
    staff_gender: payload.staff_gender || updatedStaff.staff_gender,
    staff_dob: payload.staff_dob || updatedStaff.staff_dob,
    staff_address: payload.staff_address || updatedStaff.staff_address,
    staff_hire_date: payload.staff_hire_date || updatedStaff.staff_hire_date,
    staff_salary: payload.staff_salary || updatedStaff.staff_salary,
    staff_updated_at: new Date().toISOString(), // Cập nhật thời gian sửa đổi
  };

  // Thực hiện cập nhật trong cơ sở dữ liệu
  await staffRepository().where('staff_id', staff_id).update(updatedFields);

  // Trả về thông tin nhân viên đã được cập nhật (gồm cả các giá trị mới và cũ)
  return { ...updatedStaff, ...updatedFields };
}


//Delete staff
async function deleteStaff(staff_id){
    const deletedStaff = await staffRepository()
        .where('staff_id', staff_id)
        .first();

    //If cannot find the staff, response null
    if(!deletedStaff){
        return null;
    }

    //Delete staff
    await staffRepository().where('staff_id', staff_id).del();

    //response staff has just been deleted
    return deletedStaff;
}

//Function delete all staff
async function deleteAllStaff(){
    await staffRepository().del();
}

module.exports = {
    staffRepository,
    readStaff,
    createStaff,
    getManyStaff,
    getStaffById,
    updateStaff,
    deleteStaff,
    deleteAllStaff,
};