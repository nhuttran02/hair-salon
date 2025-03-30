const express = require('express');
const servicesController = require('../controllers/services.controller');
const { methodNotAllowed } = require('../controllers/errors.controller');

const router = express.Router();

module.exports.setup = (app) => {
  app.use('/api/v1/services', router);

  /**
   * @swagger
   * /api/v1/services:
   *  get:
   *    summary: Get services by filter
   *    description: Get services by filter
   *    parameters:
   *      - in: query
   *        name: services_price
   *        schema:
   *          type: number
   *        description: Filter by service price
   *      - in: query
   *        name: services_name
   *        schema:
   *          type: string
   *        description: Filter by service name
   *      - $ref: '#/components/parameters/limitParam'
   *      - $ref: '#/components/parameters/pageParam'
   *    tags:
   *      - services
   *    responses:
   *      200:
   *        description: A list of services
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
   *                    services:
   *                      type: array
   *                      items:
   *                        $ref: '#/components/schemas/Service'
   *                    metadata:
   *                      $ref: '#/components/schemas/PaginationMetadata'
   */
  router.get('/', servicesController.getServicesByFilter);

  /**
   * @swagger
   * /api/v1/services:
   *  post:
   *    summary: Create a new service
   *    description: Create a new service
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              services_name:
   *                type: string
   *                description: Service name
   *              services_des:
   *                type: string
   *                description: Service description
   *              services_price:
   *                type: number
   *                format: double
   *                description: Service price
   *              services_duration:
   *                type: integer
   *                description: Service duration (minutes)
   *    tags:
   *      - services
   *    responses:
   *      201:
   *        description: A new service has been created
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
   *                    service:
   *                      $ref: '#/components/schemas/Service'  # Schema for service response
   */
  router.post('/', servicesController.createService);

  /**
   * @swagger
   *  /api/v1/services:
   *    delete:
   *      summary: Delete all services
   *      description: Delete all services
   *      tags:
   *        - services
   *      responses:
   *        200:
   *          description: All services deleted
   *          $ref: '#/components/responses/200NoData'
   */
  router.delete('/', servicesController.deleteAllServices);
  router.all('/', methodNotAllowed);

  /**
   * @swagger
   *  /api/v1/services/{services_id}:
   *    get:
   *      summary: Get service by services_id
   *      description: Get service by services_id
   *      parameters:
   *        - name: services_id
   *          in: path
   *          required: true
   *          schema:
   *            type: integer
   *          description: The ID of the service
   *      tags:
   *        - services
   *      responses:
   *        200:
   *          description: A service
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
   *                      service:
   *                        $ref: '#/components/schemas/Service'
   */
  router.get('/:services_id', servicesController.getService);

  /**
   * @swagger
   * /api/v1/services/{services_id}:
   *   put:
   *     summary: Update service by ID
   *     description: Update a service by ID
   *     parameters:
   *       - in: path
   *         name: services_id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID of the service to update
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               services_name:
   *                 type: string
   *                 description: Name of the service
   *               services_des:
   *                 type: string
   *                 description: Description of the service
   *               services_price:
   *                 type: number
   *                 format: double
   *                 description: Price of the service
   *               services_duration:
   *                 type: integer
   *                 description: Duration of the service in minutes
   *     tags:
   *       - services
   *     responses:
   *       200:
   *         description: The updated service
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Service'
   */

  router.put('/:services_id', servicesController.updateService);

  /**
   * @swagger
   *   /api/v1/services/{services_id}:
   *     delete:
   *       summary: Delete service by ID
   *       description: Delete service by ID
   *       parameters:
   *         - in: path
   *           name: services_id
   *           required: true
   *           schema:
   *             type: integer
   *           description: The ID of the service to delete
   *       tags:
   *         - services
   *       responses:
   *         200:
   *           description: Service deleted
   *           $ref: '#/components/responses/200NoData'
   */
  router.delete('/:services_id', servicesController.deleteService);
  router.all('/:services_id', methodNotAllowed);
};
