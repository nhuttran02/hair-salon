const servicesService = require('../services/services.service');
const ApiError = require('../api-error');
const JSend = require('../jsend');
const { as } = require('../database/knex');

//Tạo dịch vụ mới
async function createService(req, res, next){
    // if(!req.body?.name || typeof req.body.name !== 'string'){
    //     return next(new ApiError(400, 'Name should be a non-empty string'));
    // }

    if (
      !req.body?.services_name ||
      typeof req.body.services_name !== 'string' ||
      req.body.services_name.trim() === ''
    ) {
      return next(
        new ApiError(400, 'Service name should be a non-empty string')
      );
    }

    try{
        const service = await servicesService.createService({
            ...req.body,
        });
        return res
          .status(201)
          .set({
            Location: `${req.baseUrl}/${service.services_id}`,
          })
          .json(
            JSend.success({
              service,
            })
          );
    }catch (error){
        console.log(error);
        return next(
            new ApiError(500, 'An error occured while creating the service')
        );
    }
}

//Loc dich vu theo dieu kien
async function getServicesByFilter(req, res, next){
    // let services = [];
    let result = {
        services: [],
        metadata: {
            totalRecords: 0,
            firstPage: 1,
            lastPage: 1,
            page: 1,
            limit: 5,
        },
    };

    try{
        // services = await servicesService.getManyServices(req.query);
        result = await servicesService.getManyServices(req.query);
    }catch (error){
        console.log(error);
        return next(
            new ApiError(500, 'An error occurred while retrieving services')
        );
    }

    // return res.json(JSend.success({ services }));
    return res.json(
        JSend.success({
            services: result.services,
            metadata: result.metadata,
        })
    )
}

async function getService(req, res, next) {
  const { services_id } = req.params;

  try {
    const service = await servicesService.getServiceById(services_id);

    if (!service) {
      return next(new ApiError(404, 'Service not found'));
    }

    // In thông tin request và response JSON ra console của server
    console.log('Request params:', req.params);
    console.log('Response JSON:', { status: 'success', data: { service } });

    return res.json({
      status: 'success',
      data: { service },
    });
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Error retrieving service with id=${services_id}`)
    );
  }
}

// Cập nhật thông tin dịch vụ
async function updateService(req, res, next) {
    // Kiểm tra nếu dữ liệu trong body rỗng
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, 'Data to update cannot be empty'));
    }

    const { services_id } = req.params;  // Lấy services_id từ URL

    try {
        // Cập nhật dịch vụ với các dữ liệu từ body
        const updated = await servicesService.updateService(services_id, {
            ...req.body,
        });

        // Kiểm tra nếu không tìm thấy dịch vụ
        if (!updated) {
            return next(new ApiError(404, 'Service not found'));
        }

        // Trả về phản hồi thành công với thông tin dịch vụ đã cập nhật
        return res.json(
            JSend.success({
                service: updated,
            })
        );
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, `Error updating service with id=${services_id}`));
    }
}

// Hàm xóa dịch vụ theo services_id trong controller
async function deleteService(req, res, next) {
    const { services_id } = req.params;  // Lấy services_id từ URL

    try {
        // Thực hiện xóa dịch vụ từ service layer
        const deletedService = await servicesService.deleteService(services_id);

        // Kiểm tra nếu không tìm thấy dịch vụ
        if (!deletedService) {
            return next(new ApiError(404, `Service with id=${services_id} not found`));
        }

        // Trả về phản hồi thành công sau khi xóa
        return res.json(
            JSend.success({
                message: `Service with id=${services_id} has been deleted`,
            })
        );
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, `Could not delete service with id=${services_id}`));
    }
}

// Hàm xóa tất cả dịch vụ trong controller
async function deleteAllServices(req, res, next) {
    try {
        // Xóa tất cả các dịch vụ
        await servicesService.deleteAllServices();

        // Trả về phản hồi thành công
        return res.json(
            JSend.success({
                message: 'All services have been deleted',
            })
        );
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, 'An error occurred while removing all services')
        );
    }
}

module.exports = {
    createService,
    getServicesByFilter,
    getService,
    updateService,
    deleteService,
    deleteAllServices
};