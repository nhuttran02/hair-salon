// const express = require('express');
// const appointmentsController = require('../controllers/appointments.controller');
// const { methodNotAllowed } = require('../controllers/errors.controller');

// const router = express.Router();

// module.exports.setup = (app) => {
//   app.use('/api/v1/appointments', router);

//   /**
//    * @swagger
//    * /api/v1/appointments:
//    *  get:
//    *    summary: Get appointments by filter
//    *    description: Get appointments by filter
//    *    parameters:
//    *      - in: query
//    *        name: apm_customer_name
//    *        schema:
//    *          type: string
//    *        description: Filter by customer name
//    *      - in: query
//    *        name: apm_gender
//    *        schema:
//    *          type: string
//    *          enum: [male, female, other]
//    *        description: Filter by gender
//    *      - in: query
//    *        name: apm_phone
//    *        schema:
//    *          type: string
//    *        description: Filter by phone number
//    *      - in: query
//    *        name: apm_service_id
//    *        schema:
//    *          type: integer
//    *        description: Filter by service ID
//    *      - in: query
//    *        name: apm_time
//    *        schema:
//    *          type: string
//    *          format: date-time
//    *        description: Filter by appointment time
//    *      - $ref: '#/components/parameters/limitParam'
//    *      - $ref: '#/components/parameters/pageParam'
//    *    tags:
//    *      - appointments
//    *    responses:
//    *      200:
//    *        description: A list of appointments
//    *        content:
//    *          application/json:
//    *            schema:
//    *              type: object
//    *              properties:
//    *                status:
//    *                  type: string
//    *                  description: The response status
//    *                  enum: [success]
//    *                data:
//    *                  type: object
//    *                  properties:
//    *                    appointments:
//    *                      type: array
//    *                      items:
//    *                        $ref: '#/components/schemas/Appointment'
//    *                    metadata:
//    *                      $ref: '#/components/schemas/PaginationMetadata'
//    */
//   router.get('/', appointmentsController.getAppointmentsByFilter);

//   /**
//    * @swagger
//    * /api/v1/appointments:
//    *  post:
//    *    summary: Create a new appointment
//    *    description: Create a new appointment
//    *    requestBody:
//    *      required: true
//    *      content:
//    *        application/json:
//    *          schema:
//    *            type: object
//    *            properties:
//    *              apm_customer_name:
//    *                type: string
//    *                description: Customer name
//    *              apm_gender:
//    *                type: string
//    *                enum: [male, female, other]
//    *                description: Customer gender
//    *              apm_phone:
//    *                type: string
//    *                description: Customer phone number
//    *              apm_service_id:
//    *                type: integer
//    *                description: Service ID
//    *              apm_time:
//    *                type: string
//    *                format: date-time
//    *                description: Appointment time
//    *    tags:
//    *      - appointments
//    *    responses:
//    *      201:
//    *        description: A new appointment has been created
//    *        content:
//    *          application/json:
//    *            schema:
//    *              type: object
//    *              properties:
//    *                status:
//    *                  type: string
//    *                  description: The response status
//    *                  enum: [success]
//    *                data:
//    *                  type: object
//    *                  properties:
//    *                    appointment:
//    *                      $ref: '#/components/schemas/Appointment'
//    */
//   router.post('/', appointmentsController.createAppointment);

//   /**
//    * @swagger
//    *  /api/v1/appointments:
//    *    delete:
//    *      summary: Delete all appointments
//    *      description: Delete all appointments
//    *      tags:
//    *        - appointments
//    *      responses:
//    *        200:
//    *          description: All appointments deleted
//    *          content:
//    *            application/json:
//    *              schema:
//    *                type: object
//    *                properties:
//    *                  status:
//    *                    type: string
//    *                    description: The response status
//    *                    enum: [success]
//    *                  message:
//    *                    type: string
//    *                    description: Confirmation message
//    *                    example: All appointments have been deleted
//    */
//   router.delete('/', appointmentsController.deleteAllAppointments);
//   router.all('/', methodNotAllowed);

//   /**
//    * @swagger
//    *  /api/v1/appointments/{apm_id}:
//    *    get:
//    *      summary: Get appointment by apm_id
//    *      description: Get appointment by apm_id
//    *      parameters:
//    *        - name: apm_id
//    *          in: path
//    *          required: true
//    *          schema:
//    *            type: integer
//    *          description: The ID of the appointment
//    *      tags:
//    *        - appointments
//    *      responses:
//    *        200:
//    *          description: An appointment
//    *          content:
//    *            application/json:
//    *              schema:
//    *                type: object
//    *                properties:
//    *                  status:
//    *                    type: string
//    *                    description: The response status
//    *                    enum: [success]
//    *                  data:
//    *                    type: object
//    *                    properties:
//    *                      appointment:
//    *                        $ref: '#/components/schemas/Appointment'
//    */
//   router.get('/:apm_id', appointmentsController.getAppointment);

//   /**
//    * @swagger
//    * /api/v1/appointments/{apm_id}:
//    *   put:
//    *     summary: Update appointment by ID
//    *     description: Update an appointment by ID
//    *     parameters:
//    *       - in: path
//    *         name: apm_id
//    *         required: true
//    *         schema:
//    *           type: integer
//    *         description: ID of the appointment to update
//    *     requestBody:
//    *       required: true
//    *       content:
//    *         application/json:
//    *           schema:
//    *             type: object
//    *             properties:
//    *               apm_customer_name:
//    *                 type: string
//    *                 description: Name of the customer
//    *               apm_gender:
//    *                 type: string
//    *                 enum: [male, female, other]
//    *                 description: Gender of the customer
//    *               apm_phone:
//    *                 type: string
//    *                 description: Phone number of the customer
//    *               apm_service_id:
//    *                 type: integer
//    *                 description: ID of the service
//    *               apm_time:
//    *                 type: string
//    *                 format: date-time
//    *                 description: Appointment time
//    *               apm_status:
//    *                 type: string
//    *                 enum: [pending, confirmed, cancelled]
//    *                 description: Status of the appointment
//    *     tags:
//    *       - appointments
//    *     responses:
//    *       200:
//    *         description: The updated appointment
//    *         content:
//    *           application/json:
//    *             schema:
//    *               type: object
//    *               properties:
//    *                 status:
//    *                   type: string
//    *                   description: The response status
//    *                   enum: [success]
//    *                 data:
//    *                   type: object
//    *                   properties:
//    *                     appointment:
//    *                       $ref: '#/components/schemas/Appointment'
//    */
//   router.put('/:apm_id', appointmentsController.updateAppointment);

//   /**
//    * @swagger
//    *   /api/v1/appointments/{apm_id}:
//    *     delete:
//    *       summary: Delete appointment by ID
//    *       description: Delete appointment by ID
//    *       parameters:
//    *         - in: path
//    *           name: apm_id
//    *           required: true
//    *           schema:
//    *             type: integer
//    *           description: The ID of the appointment to delete
//    *       tags:
//    *         - appointments
//    *       responses:
//    *         200:
//    *           description: Appointment deleted
//    *           content:
//    *             application/json:
//    *               schema:
//    *                 type: object
//    *                 properties:
//    *                   status:
//    *                     type: string
//    *                     description: The response status
//    *                     enum: [success]
//    *                   message:
//    *                     type: string
//    *                     description: Confirmation message
//    *                     example: Appointment has been deleted
//    */
//   router.delete('/:apm_id', appointmentsController.deleteAppointment);
//   router.all('/:apm_id', methodNotAllowed);
// };

const express = require("express");
const appointmentsController = require("../controllers/appointments.controller");
const { methodNotAllowed } = require("../controllers/errors.controller");

const router = express.Router();

module.exports.setup = (app) => {
  app.use("/api/v1/appointments", router);

  /**
   * @swagger
   * /api/v1/appointments:
   *  get:
   *    summary: Get appointments by filter
   *    description: Get appointments by filter
   *    parameters:
   *      - in: query
   *        name: apm_customer_name
   *        schema:
   *          type: string
   *        description: Filter by customer name
   *      - in: query
   *        name: apm_gender
   *        schema:
   *          type: string
   *          enum: [male, female]
   *        description: Filter by gender
   *      - in: query
   *        name: apm_phone
   *        schema:
   *          type: string
   *        description: Filter by phone number
   *      - in: query
   *        name: apm_service_id
   *        schema:
   *          type: integer
   *        description: Filter by service ID
   *      - in: query
   *        name: apm_branch
   *        schema:
   *          type: integer
   *        description: Filter by branch ID
   *      - in: query
   *        name: apm_time
   *        schema:
   *          type: string
   *          format: date-time
   *        description: Filter by appointment time
   *      - $ref: '#/components/parameters/limitParam'
   *      - $ref: '#/components/parameters/pageParam'
   *    tags:
   *      - appointments
   *    responses:
   *      200:
   *        description: A list of appointments
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
   *                    appointments:
   *                      type: array
   *                      items:
   *                        $ref: '#/components/schemas/Appointment'
   *                    metadata:
   *                      $ref: '#/components/schemas/PaginationMetadata'
   */
  router.get("/", appointmentsController.getAppointmentsByFilter);

  /**
   * @swagger
   * /api/v1/appointments:
   *  post:
   *    summary: Create a new appointment
   *    description: Create a new appointment
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              apm_customer_name:
   *                type: string
   *                description: Customer name
   *              apm_gender:
   *                type: string
   *                enum: [male, female]
   *                description: Customer gender
   *              apm_phone:
   *                type: string
   *                description: Customer phone number
   *              apm_service_id:
   *                type: integer
   *                description: Service ID
   *              apm_branch:
   *                type: integer
   *                description: Branch ID
   *              apm_time:
   *                type: string
   *                format: date-time
   *                description: Appointment time
   *    tags:
   *      - appointments
   *    responses:
   *      201:
   *        description: A new appointment has been created
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
   *                    appointment:
   *                      $ref: '#/components/schemas/Appointment'
   */
  router.post("/", appointmentsController.createAppointment);

  /**
   * @swagger
   *  /api/v1/appointments:
   *    delete:
   *      summary: Delete all appointments      
   *      description: Delete all appointments
   *      tags:
   *        - appointments
   *      responses:
   *        200:
   *          description: All appointments deleted
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
   *                    example: All appointments have been deleted
   */
  router.delete("/", appointmentsController.deleteAllAppointments);
  router.all("/", methodNotAllowed);

  /**
   * @swagger
   *  /api/v1/appointments/{apm_id}:
   *    get:
   *      summary: Get appointment by apm_id
   *      description: Get appointment by apm_id
   *      parameters:
   *        - name: apm_id
   *          in: path
   *          required: true
   *          schema:
   *            type: integer
   *          description: The ID of the appointment
   *      tags:
   *        - appointments
   *      responses:
   *        200:
   *          description: An appointment
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
   *                      appointment:
   *                        $ref: '#/components/schemas/Appointment'
   */
  router.get("/:apm_id", appointmentsController.getAppointment);

  /**
   * @swagger
   * /api/v1/appointments/{apm_id}:
   *   put:
   *     summary: Update appointment by ID
   *     description: Update an appointment by ID
   *     parameters:
   *       - in: path
   *         name: apm_id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID of the appointment to update
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               apm_customer_name:
   *                 type: string
   *                 description: Name of the customer
   *               apm_gender:
   *                 type: string
   *                 enum: [male, female]
   *                 description: Gender of the customer
   *               apm_phone:
   *                 type: string
   *                 description: Phone number of the customer
   *               apm_service_id:
   *                 type: integer
   *                 description: ID of the service
   *               apm_branch:
   *                 type: integer
   *                 description: ID of the branch
   *               apm_time:
   *                 type: string
   *                 format: date-time
   *                 description: Appointment time
   *               apm_status:
   *                 type: string
   *                 enum: [pending, confirmed, cancelled]
   *                 description: Status of the appointment
   *     tags:
   *       - appointments
   *     responses:
   *       200:
   *         description: The updated appointment
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
   *                     appointment:
   *                       $ref: '#/components/schemas/Appointment'
   */
  router.put("/:apm_id", appointmentsController.updateAppointment);

  /**
   * @swagger
   *   /api/v1/appointments/{apm_id}:
   *     delete:
   *       summary: Delete appointment by ID
   *       description: Delete appointment by ID
   *       parameters:
   *         - in: path
   *           name: apm_id
   *           required: true
   *           schema:
   *             type: integer
   *           description: The ID of the appointment to delete
   *       tags:
   *         - appointments
   *       responses:
   *         200:
   *           description: Appointment deleted
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
   *                     example: Appointment has been deleted
   */
  router.delete("/:apm_id", appointmentsController.deleteAppointment);
  router.all("/:apm_id", methodNotAllowed);
};