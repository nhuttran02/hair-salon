const express = require('express');
const staffController = require('../controllers/staff.controller');
const { methodNotAllowed } = require('../controllers/errors.controller');

const router = express.Router();

module.exports.setup = (app) => {
  app.use('/api/v1/staff', router);

  /**
   * @swagger
   * /api/v1/staff:
   *  get:
   *    summary: Get staff by filter
   *    description: Get staff by filter
   *    parameters:
   *      - in: query
   *        name: staff_name
   *        schema:
   *          type: string
   *        description: Filter by staff name
   *      - in: query
   *        name: staff_gender
   *        schema:
   *          type: string
   *          enum: [male, female, other]
   *        description: Filter by gender
   *      - in: query
   *        name: staff_phone
   *        schema:
   *          type: string
   *        description: Filter by phone number
   *      - in: query
   *        name: staff_role
   *        schema:
   *          type: string
   *        description: Filter by staff role
   *      - in: query
   *        name: staff_hire_date
   *        schema:
   *          type: string
   *          format: date-time
   *        description: Filter by hire date
   *      - $ref: '#/components/parameters/limitParam'
   *      - $ref: '#/components/parameters/pageParam'
   *    tags:
   *      - staff
   *    responses:
   *      200:
   *        description: A list of staff
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
   *                    staff:
   *                      type: array
   *                      items:
   *                        $ref: '#/components/schemas/Staff'
   *                    metadata:
   *                      $ref: '#/components/schemas/PaginationMetadata'
   */
  router.get('/', staffController.getStaffByFilter);

  /**
   * @swagger
   * /api/v1/staff:
   *  post:
   *    summary: Create a new staff member
   *    description: Create a new staff member
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              staff_name:
   *                type: string
   *                description: Staff name
   *              staff_phone:
   *                type: string
   *                description: Staff phone number
   *              staff_email:
   *                type: string
   *                description: Staff email
   *              staff_role:
   *                type: string
   *                description: Staff role
   *              staff_gender:
   *                type: string
   *                enum: [male, female, other]
   *                description: Staff gender
   *              staff_dob:
   *                type: string
   *                format: date
   *                description: Staff date of birth
   *              staff_address:
   *                type: string
   *                description: Staff address
   *              staff_hire_date:
   *                type: string
   *                format: date
   *                description: Staff hire date
   *              staff_salary:
   *                type: number
   *                format: double
   *                description: Staff salary
   *    tags:
   *      - staff
   *    responses:
   *      201:
   *        description: A new staff member has been created
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
   *                    staff:
   *                      $ref: '#/components/schemas/Staff'
   */
  router.post('/', staffController.createStaff);

  /**
   * @swagger
   * /api/v1/staff:
   *  delete:
   *    summary: Delete all staff members
   *    description: Delete all staff members
   *    tags:
   *      - staff
   *    responses:
   *      200:
   *        description: All staff members have been deleted
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                status:
   *                  type: string
   *                  description: The response status
   *                  enum: [success]
   *                message:
   *                  type: string
   *                  description: Confirmation message
   *                  example: All staff members have been deleted
   */
  router.delete('/', staffController.deleteAllStaff);
  router.all('/', methodNotAllowed);

  /**
   * @swagger
   *  /api/v1/staff/{staff_id}:
   *    get:
   *      summary: Get staff member by staff_id
   *      description: Get staff member by staff_id
   *      parameters:
   *        - name: staff_id
   *          in: path
   *          required: true
   *          schema:
   *            type: integer
   *          description: The ID of the staff member
   *      tags:
   *        - staff
   *      responses:
   *        200:
   *          description: A staff member
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
   *                      staff:
   *                        $ref: '#/components/schemas/Staff'
   */
  router.get('/:staff_id', staffController.getStaff);

  /**
   * @swagger
   * /api/v1/staff/{staff_id}:
   *   put:
   *     summary: Update staff member by ID
   *     description: Update a staff member by ID
   *     parameters:
   *       - in: path
   *         name: staff_id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID of the staff member to update
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               staff_name:
   *                 type: string
   *                 description: Name of the staff member
   *               staff_gender:
   *                 type: string
   *                 enum: [male, female, other]
   *                 description: Gender of the staff member
   *               staff_phone:
   *                 type: string
   *                 description: Phone number of the staff member
   *               staff_email:
   *                 type: string
   *                 description: Email of the staff member
   *               staff_role:
   *                 type: string
   *                 description: Role of the staff member
   *               staff_dob:
   *                 type: string
   *                 format: date
   *                 description: Date of birth of the staff member
   *               staff_address:
   *                 type: string
   *                 description: Address of the staff member
   *               staff_hire_date:
   *                 type: string
   *                 format: date-time
   *                 description: Hire date of the staff member
   *               staff_salary:
   *                 type: number
   *                 format: double
   *                 description: Salary of the staff member
   *     tags:
   *       - staff
   *     responses:
   *       200:
   *         description: The updated staff member
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
   *                     staff:
   *                       $ref: '#/components/schemas/Staff'
   */
  router.put('/:staff_id', staffController.updateStaff);

  // /**
  //  * @swagger
  //  *   /api/v1/appointments/{apm_id}:
  //  *     delete:
  //  *       summary: Delete appointment by ID
  //  *       description: Delete appointment by ID
  //  *       parameters:
  //  *         - in: path
  //  *           name: apm_id
  //  *           required: true
  //  *           schema:
  //  *             type: integer
  //  *           description: The ID of the appointment to delete
  //  *       tags:
  //  *         - appointments
  //  *       responses:
  //  *         200:
  //  *           description: Appointment deleted
  //  *           content:
  //  *             application/json:
  //  *               schema:
  //  *                 type: object
  //  *                 properties:
  //  *                   status:
  //  *                     type: string
  //  *                     description: The response status
  //  *                     enum: [success]
  //  *                   message:
  //  *                     type: string
  //  *                     description: Confirmation message
  //  *                     example: Appointment has been deleted
  //  */
  // router.delete('/:apm_id', appointmentsController.deleteAppointment);
  // router.all('/:apm_id', methodNotAllowed);

  /**
   * @swagger
   *   /api/v1/staff/{staff_id}:
   *     delete:
   *       summary: Delete staff member by ID
   *       description: Delete staff member by ID
   *       parameters:
   *         - in: path
   *           name: staff_id
   *           required: true
   *           schema:
   *             type: integer
   *           description: The ID of the staff member to delete
   *       tags:
   *         - staff
   *       responses:
   *         200:
   *           description: Staff member deleted
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
   *                     example: Staff member has been deleted
   */
  router.delete('/:staff_id', staffController.deleteStaff);
  router.all('/:staff_id', methodNotAllowed);
};
