const knex = require('../database/knex');
const Paginator = require('./paginator');

function serviceRepository(){
    return knex('services');
}

function readService(payload){
    return {
      services_name: payload.services_name,
      services_des: payload.services_des,
      services_price: payload.services_price,
      services_duration: payload.services_duration,
      services_created_at: payload.services_created_at,
      services_updated_at: payload.services_updated_at,
    };
}

async function createService(payload){
    const service = readService(payload);
    const [services_id] = await serviceRepository().insert(service);
    return { services_id, ...service };
}

async function getManyServices(query) {
  const { services_name, services_price, page = 1, limit = 5 } = query; // Lấy các giá trị query
  const paginator = new Paginator(page, limit);

  let results = await serviceRepository()
    .where((builder) => {
      if (services_name) {
        // Lọc theo tên dịch vụ (services_name)
        builder.where('services_name', 'like', `%${services_name}%`);
      }
      if (
        services_price !== undefined &&
        services_price !== null &&
        services_price !== ''
      ) {
        // Lọc theo giá dịch vụ (services_price) nếu giá trị không phải là null hoặc rỗng
        builder.where('services_price', '=', services_price);
      }
    })
    .select(
        knex.raw('count(services_id) OVER() AS recordCount'),
        'services_id',
        'services_name',
        'services_des',
        'services_price',
        'services_duration',
        'services_created_at',
        'services_updated_at'
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
        services: results,
    };
}

async function getServiceById(services_id){
  return serviceRepository().where('services_id', services_id).select('*').first();
}

async function updateService(services_id, payload) {
  // Tìm dịch vụ cần cập nhật theo services_id
  const updatedService = await serviceRepository()
    .where('services_id', services_id)
    .select('*')
    .first();

  // Nếu không tìm thấy dịch vụ, trả về null
  if (!updatedService) {
    return null;
  }

  // Lấy dữ liệu cần cập nhật từ payload
  const update = { ...payload };

  // Thực hiện cập nhật dữ liệu trong cơ sở dữ liệu
  await serviceRepository().where('services_id', services_id).update(update);

  // Trả về dịch vụ đã cập nhật (kết hợp giữa dữ liệu cũ và mới)
  return { ...updatedService, ...update };
}

// Hàm xóa dịch vụ theo services_id
async function deleteService(services_id) {
    // Tìm dịch vụ cần xóa theo services_id
    const deletedService = await serviceRepository()
        .where('services_id', services_id)
        .first();

    // Nếu không tìm thấy dịch vụ, trả về null
    if (!deletedService) {
        return null;
    }

    // Xóa dịch vụ khỏi cơ sở dữ liệu
    await serviceRepository().where('services_id', services_id).del();

    // Trả về dịch vụ đã bị xóa
    return deletedService;
}

async function deleteAllServices() {
  // Thêm await và gọi hàm del() đúng cách
  await serviceRepository().del();
}


//Defined function for accessing the database
module.exports = {
    serviceRepository,
    readService,
    createService,
    getManyServices,
    getServiceById,
    updateService,
    deleteService,
    deleteAllServices,
};



