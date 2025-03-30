const express = require('express');
const customersController = require('../controllers/customers.controller');
const { methodNotAllowed } = require('../controllers/errors.controller');

const router = express.Router();

module.exports.setup = (app) => {
  app.use('/api/v1/customers', router);

  /**
   * @swagger
   * /api/v1/customers:
   *  get:
   *    summary: Get customers by filter
   *    description: Get customers by filter
   *    parameters:
   *      - in: query
   *        name: customer_name
   *        schema:
   *          type: string
   *        description: Filter by customer name
   *      - in: query
   *        name: customer_gender
   *        schema:
   *          type: string
   *          enum: [male, female, other]
   *        description: Filter by gender
   *      - in: query
   *        name: customer_phone
   *        schema:
   *          type: string
   *        description: Filter by phone number
   *      - in: query
   *        name: customer_email
   *        schema:
   *          type: string
   *        description: Filter by customer email
   *      - $ref: '#/components/parameters/limitParam'
   *      - $ref: '#/components/parameters/pageParam'
   *    tags:
   *      - customers
   *    responses:
   *      200:
   *        description: A list of customers
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                status:
   *                  type: string
   *                  description: The response status
   *                  enum: [success]
   *                data:
   *                  type: object
   *                  properties:
   *                    customers:
   *                      type: array
   *                      items:
   *                        $ref: '#/components/schemas/Customer'
   *                    metadata:
   *                      $ref: '#/components/schemas/PaginationMetadata'
   */
  router.get('/', customersController.getCustomersByFilter);

  /**
   * @swagger
   * /api/v1/customers:
   *  post:
   *    summary: Create a new customer
   *    description: Create a new customer
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              customer_name:
   *                type: string
   *                description: Customer name
   *              customer_gender:
   *                type: string
   *                enum: [male, female, other]
   *                description: Customer gender
   *              customer_phone:
   *                type: string
   *                description: Customer phone number
   *              customer_email:
   *                type: string
   *                description: Customer email
   *    tags:
   *      - customers
   *    responses:
   *      201:
   *        description: A new customer has been created
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                status:
   *                  type: string
   *                  description: The response status
   *                  enum: [success]
   *                data:
   *                  type: object
   *                  properties:
   *                    customer:
   *                      $ref: '#/components/schemas/Customer'
   */
  router.post('/', customersController.createCustomer);

  /**
   * @swagger
   *  /api/v1/customers:
   *    delete:
   *      summary: Delete all customers
   *      description: Delete all customers
   *      tags:
   *        - customers
   *      responses:
   *        200:
   *          description: All customers deleted
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  status:
   *                    type: string
   *                    description: The response status
   *                    enum: [success]
   *                  message:
   *                    type: string
   *                    description: Confirmation message
   *                    example: All customers have been deleted
   */
  router.delete('/', customersController.deleteAllCustomers);
  router.all('/', methodNotAllowed);

  /**
   * @swagger
   *  /api/v1/customers/{customer_id}:
   *    get:
   *      summary: Get customer by customer_id
   *      description: Get customer by customer_id
   *      parameters:
   *        - name: customer_id
   *          in: path
   *          required: true
   *          schema:
   *            type: integer
   *          description: The ID of the customer
   *      tags:
   *        - customers
   *      responses:
   *        200:
   *          description: A customer
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  status:
   *                    type: string
   *                    description: The response status
   *                    enum: [success]
   *                  data:
   *                    type: object
   *                    properties:
   *                      customer:
   *                        $ref: '#/components/schemas/Customer'
   */
  router.get('/:customer_id', customersController.getCustomer);

  /**
   * @swagger
   * /api/v1/customers/{customer_id}:
   *   put:
   *     summary: Update customer by customer_id
   *     description: Update a customer by customer_id
   *     parameters:
   *       - in: path
   *         name: customer_id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID of the customer to update
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               customer_name:
   *                 type: string
   *                 description: Name of the customer
   *               customer_gender:
   *                 type: string
   *                 enum: [male, female, other]
   *                 description: Gender of the customer
   *               customer_phone:
   *                 type: string
   *                 description: Phone number of the customer
   *               customer_email:
   *                 type: string
   *                 description: Email of the customer
   *     tags:
   *       - customers
   *     responses:
   *       200:
   *         description: The updated customer
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [success]
   *                 data:
   *                   type: object
   *                   properties:
   *                     customer:
   *                       $ref: '#/components/schemas/Customer'
   */
  router.put('/:customer_id', customersController.updateCustomer);

  /**
   * @swagger
   *   /api/v1/customers/{customer_id}:
   *     delete:
   *       summary: Delete customer by ID
   *       description: Delete customer by ID
   *       parameters:
   *         - in: path
   *           name: customer_id
   *           required: true
   *           schema:
   *             type: integer
   *           description: The ID of the customer to delete
   *       tags:
   *         - customers
   *       responses:
   *         200:
   *           description: Customer deleted
   *           content:
   *             application/json:
   *               schema:
   *                 type: object
   *                 properties:
   *                   status:
   *                     type: string
   *                     description: The response status
   *                     enum: [success]
   *                   message:
   *                     type: string
   *                     description: Confirmation message
   *                     example: Customer has been deleted
   */
  router.delete('/:customer_id', customersController.deleteCustomer);
  router.all('/:customer_id', methodNotAllowed);
};
