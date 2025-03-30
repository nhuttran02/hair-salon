const customersService = require('../services/customers.service');
const ApiError = require('../api-error');
const JSend = require('../jsend');
const { as } = require('../database/knex');

//Tạo customer mới
async function createCustomer(req, res, next){
    if (
      !req.body?.customer_name ||
      typeof req.body.customer_name !== 'string' ||
      req.body.customer_name.trim() === ''
    ) {
      return next(
        new ApiError(400, 'Customer name should be a non-empty string')
      );
    }

    try{
        const customer = await customersService.createCustomer({
          ...req.body,
        });
        return res
          .status(201)
          .set({
            Location: `${req.baseUrl}/${customer.customer_id}`,
          })
          .json(
            JSend.success({
              customer,
            })
          );
    }catch (error){
        console.log(error);
        return next(
          new ApiError(500, 'An error occurred while creating the customer')
        );
    }
}

//Loc dich vu theo dieu kien
async function getCustomersByFilter(req, res, next){
    // let customers = [];
    let result = {
        customers: [],
        metadata: {
            totalRecords: 0,
            firstPage: 1,
            lastPage: 1,
            page: 1,
            limit: 5,
        },
    };

    try{
        // customers = await customersService.getManyCustomers(req.query);
        result = await customersService.getManyCustomers(req.query);
    }catch (error){
        console.log(error);
        return next(
            new ApiError(500, 'An error occurred while retrieving customers')
        );
    }

    // return res.json(JSend.success({ customers }));
    return res.json(
        JSend.success({
            customers: result.customers,
            metadata: result.metadata,
        })
    )
}

async function getCustomer(req, res, next) {
  const { customer_id } = req.params;
  //console.log('Received customer_id:', customer_id); // Kiểm tra giá trị customer_id từ request
  try {
    const customer = await customersService.getCustomerById(customer_id);
    if (!customer) {
      return next(new ApiError(404, 'Resource not found'));
    }
    return res.json(JSend.success({ customer }));
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Error retrieving customer with id=${customer_id}`)
    );
  }
}




// Cập nhật thông tin khach hang
async function updateCustomer(req, res, next) {
    // Kiểm tra nếu dữ liệu trong body rỗng
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, 'Data to update cannot be empty'));
    }

    const { customer_id } = req.params;  // Lấy customer_id từ URL

    try {
        // Cập nhật khach hang với các dữ liệu từ body
        const updated = await customersService.updateCustomer(customer_id, {
          ...req.body,
        });

        // Kiểm tra nếu không tìm thấy khach hang
        if (!updated) {
            return next(new ApiError(404, 'Customer not found'));
        }

        // Trả về phản hồi thành công với thông tin khach hang đã cập nhật
        return res.json(
            JSend.success({
                customer: updated,
            })
        );
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, `Error updating customer with id=${customer_id}`));
    }
}

// Hàm xóa customer theo customer_id trong controller

async function deleteCustomer(req, res, next) {
  const { customer_id } = req.params; // Lấy customer_id từ URL

  try {
    // Thực hiện xóa khach hang từ customer layer
    const deletedCustomer =
      await customersService.deleteCustomer(customer_id);

    // Kiểm tra nếu không tìm thấy khach hang
    if (!deletedCustomer) {
      return next(new ApiError(404, `Customer with id=${customer_id} not found`));
    }

    // Trả về phản hồi thành công sau khi xóa
    return res.json(
      JSend.success({
        message: `Customer with id=${customer_id} has been deleted`,
      })
    );
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Could not delete customer with id=${customer_id}`)
    );
  }
}

// Hàm xóa tất cả customer trong controller
async function deleteAllCustomers(req, res, next) {
    try {
        // Xóa tất cả các khach hang
        await customersService.deleteAllCustomers();

        const deletedCount = await customersService.deleteAllCustomers();
        return res.json(
          JSend.success({
            message: `${deletedCount} customers have been deleted`,
          })
        );
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, 'An error occurred while removing all customers')
        );
    }
}

module.exports = {
    createCustomer,
    getCustomersByFilter,
    getCustomer,
    updateCustomer,
    deleteCustomer,
    deleteAllCustomers
};