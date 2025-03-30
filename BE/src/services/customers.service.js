const knex = require('../database/knex');
const Paginator = require('./paginator');

function customerRepository(){
    return knex('customers');
}

function readCustomer(payload){
    return {
      customer_name: payload.customer_name,
      customer_phone: payload.customer_phone,
      customer_email: payload.customer_email,
      customer_gender: payload.customer_gender,
      customer_created_at: payload.customer_created_at,
      customer_updated_at: payload.customer_updated_at,
    };
}

async function createCustomer(payload){
    const customer = readCustomer(payload);
    const [customer_id] = await customerRepository().insert(customer);
    return { customer_id, ...customer };
}

async function getManyCustomers(query) {
  const {
    customer_name,
    customer_phone,
    customer_email,
    customer_gender,
    page = 1,
    limit = 5,
  } = query;
  const paginator = new Paginator(page, limit);

  // Truy vấn các khach hang dựa trên các điều kiện lọc
  let results = await customerRepository()
    .where((builder) => {
      if (customer_name) {
        builder.where('customer_name', 'like', `%${customer_name}%`);
      }
      if (customer_gender) {
        // Lọc theo giới tính
        builder.where('customer_gender', '=', customer_gender);
      }
      if (customer_phone) {
        // Lọc theo số điện thoại
        builder.where('customer_phone', 'like', `%${customer_phone}%`);
      }
      if (customer_email) {
        // Lọc theo số điện thoại
        builder.where('customer_email', 'like', `%${customer_email}%`);
      }
    })
    .select(
      knex.raw('count(customer_id) OVER() AS recordCount'), // Đếm số lượng bản ghi
      'customer_id',
      'customer_name',
      'customer_gender',
      'customer_phone',
      'customer_email',
      'customer_created_at',
      'customer_updated_at'
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
    customers: results,
  };
}

async function getCustomerById(customer_id) {
  return customerRepository()
    .where('customer_id', customer_id)
    .select('*')
    .first();
}

async function updateCustomer(customer_id, payload) {
  // Tìm dịch vụ cần cập nhật theo customer_id
  const updatedCustomer = await customerRepository()
    .where('customer_id', customer_id)
    .select('*')
    .first();

  // Nếu không tìm thấy dịch vụ, trả về null
  if (!updatedCustomer) {
    return null;
  }

  // Lấy dữ liệu cần cập nhật từ payload
  const update = { ...payload };

  // Thực hiện cập nhật dữ liệu trong cơ sở dữ liệu
  await customerRepository().where('customer_id', customer_id).update(update);

  // Trả về dịch vụ đã cập nhật (kết hợp giữa dữ liệu cũ và mới)
  return { ...updatedCustomer, ...update };
}

// Hàm xóa dịch vụ theo customer_id
async function deleteCustomer(customer_id) {
  // Tìm dịch vụ cần xóa theo customer_id
  const deletedCustomer = await customerRepository()
    .where('customer_id', customer_id)
    .first();

  // Nếu không tìm thấy dịch vụ, trả về null
  if (!deletedCustomer) {
    return null;
  }

  // Xóa dịch vụ khỏi cơ sở dữ liệu
  await customerRepository().where('customer_id', customer_id).del();

  // Trả về dịch vụ đã bị xóa
  return deletedCustomer;
}

//Ham xoa tat ca customer
async function deleteAllCustomers(){
  await customerRepository().del
}


//Defined function for accessing the database
module.exports = {
    customerRepository,
    readCustomer,
    createCustomer,
    getManyCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    deleteAllCustomers,
};



